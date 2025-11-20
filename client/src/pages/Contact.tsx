import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, MessageSquare, Calendar, Heart, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function Contact() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const initialType = searchParams.get("tipo") || "contact";
  const { toast } = useToast();

  const [formType, setFormType] = useState(initialType);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    program: "",
    childName: "",
    childAge: "",
    weddingDate: "",
    eventType: "",
  });

  const submitLead = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        program: "",
        childName: "",
        childAge: "",
        weddingDate: "",
        eventType: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error al enviar",
        description: error.message || "No pudimos enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const leadData: any = {
      leadType: formType as any,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      message: formData.message || undefined,
      metadata: {},
    };

    // Add type-specific fields to metadata
    if (formType === "pre_registration") {
      if (formData.program) {
        leadData.programId = formData.program;
      }
      if (formData.childName || formData.childAge) {
        leadData.metadata.childName = formData.childName;
        leadData.metadata.childAge = formData.childAge;
      }
    }

    if (formType === "elite_booking" && formData.program) {
      leadData.metadata.danceStyle = formData.program;
    }

    if (formType === "wedding") {
      if (formData.weddingDate) {
        leadData.metadata.weddingDate = formData.weddingDate;
      }
      if (formData.eventType) {
        leadData.metadata.eventType = formData.eventType;
      }
    }

    submitLead.mutate(leadData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Contacto
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para resolver tus dudas y ayudarte a comenzar tu viaje en la danza
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-2xl bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold mb-1">Ubicación</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Calle Ejemplo, 123
                  <br />
                  50001 Zaragoza
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-2xl bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold mb-1">Teléfono</h3>
                <p className="font-body text-sm text-muted-foreground">
                  <a href="tel:+34976000000" className="hover:text-primary transition-colors">
                    +34 976 000 000
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-2xl bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold mb-1">Email</h3>
                <p className="font-body text-sm text-muted-foreground">
                  <a href="mailto:info@kinesis.com" className="hover:text-primary transition-colors">
                    info@kinesis.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <Card>
            <CardHeader className="text-center pb-8 pt-8">
              <h2 className="font-display text-3xl font-bold mb-4">Envíanos un mensaje</h2>
              <p className="font-body text-muted-foreground">
                Selecciona el tipo de consulta y completa el formulario
              </p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {/* Form Type Selector */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                <Button
                  variant={formType === "contact" ? "default" : "outline"}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                  onClick={() => setFormType("contact")}
                  data-testid="button-form-type-contact"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs">Contacto General</span>
                </Button>
                <Button
                  variant={formType === "pre_registration" ? "default" : "outline"}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                  onClick={() => setFormType("pre_registration")}
                  data-testid="button-form-type-preregistration"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Preinscripción</span>
                </Button>
                <Button
                  variant={formType === "elite_booking" ? "default" : "outline"}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                  onClick={() => setFormType("elite_booking")}
                  data-testid="button-form-type-elite"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Élite On Demand</span>
                </Button>
                <Button
                  variant={formType === "wedding" ? "default" : "outline"}
                  className="flex flex-col items-center gap-2 h-auto py-4"
                  onClick={() => setFormType("wedding")}
                  data-testid="button-form-type-wedding"
                >
                  <Heart className="h-5 w-5" />
                  <span className="text-xs">Boda/Evento</span>
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    data-testid="input-phone"
                  />
                </div>

                {/* Conditional Fields */}
                {formType === "pre_registration" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="program">Programa de interés *</Label>
                      <Select
                        value={formData.program}
                        onValueChange={(value) => handleChange("program", value)}
                        required
                      >
                        <SelectTrigger data-testid="select-program">
                          <SelectValue placeholder="Selecciona un programa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ballet-infantil">Ballet Infantil (5-8 años)</SelectItem>
                          <SelectItem value="hip-hop-kids">Hip Hop Kids (5-12 años)</SelectItem>
                          <SelectItem value="jazz-infantil">Jazz Infantil (9-12 años)</SelectItem>
                          <SelectItem value="zumba-kids">Zumba Kids (5-12 años)</SelectItem>
                          <SelectItem value="clasico-pro">Clásico PRO</SelectItem>
                          <SelectItem value="contemporaneo-pro">Contemporáneo PRO</SelectItem>
                          <SelectItem value="street-flow">Street Flow</SelectItem>
                          <SelectItem value="raices-vivas">Raíces Vivas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="childName">Nombre del alumno/a</Label>
                        <Input
                          id="childName"
                          value={formData.childName}
                          onChange={(e) => handleChange("childName", e.target.value)}
                          data-testid="input-child-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="childAge">Edad</Label>
                        <Input
                          id="childAge"
                          type="number"
                          value={formData.childAge}
                          onChange={(e) => handleChange("childAge", e.target.value)}
                          data-testid="input-child-age"
                        />
                      </div>
                    </div>
                  </>
                )}

                {formType === "elite_booking" && (
                  <div className="space-y-2">
                    <Label htmlFor="program">Estilo de danza *</Label>
                    <Select
                      value={formData.program}
                      onValueChange={(value) => handleChange("program", value)}
                      required
                    >
                      <SelectTrigger data-testid="select-elite-style">
                        <SelectValue placeholder="Selecciona un estilo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ballet">Ballet Clásico</SelectItem>
                        <SelectItem value="contemporaneo">Contemporáneo</SelectItem>
                        <SelectItem value="urbano">Urbano/Hip Hop</SelectItem>
                        <SelectItem value="salon">Bailes de Salón</SelectItem>
                        <SelectItem value="folclore">Folclore/Jota</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formType === "wedding" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="weddingDate">Fecha del evento</Label>
                      <Input
                        id="weddingDate"
                        type="date"
                        value={formData.weddingDate}
                        onChange={(e) => handleChange("weddingDate", e.target.value)}
                        data-testid="input-wedding-date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Tipo de evento</Label>
                      <Select
                        value={formData.eventType}
                        onValueChange={(value) => handleChange("eventType", value)}
                      >
                        <SelectTrigger data-testid="select-event-type">
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="boda">Boda</SelectItem>
                          <SelectItem value="aniversario">Aniversario</SelectItem>
                          <SelectItem value="fiesta">Fiesta/Evento especial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={5}
                    required
                    data-testid="textarea-message"
                    placeholder="Cuéntanos más sobre tu consulta..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" data-testid="button-submit-form">
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
