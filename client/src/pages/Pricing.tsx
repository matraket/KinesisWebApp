import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Clock, Euro, Star } from "lucide-react";

export default function Pricing() {
  const scheduleSlots = [
    { day: "Lunes", time: "17:00-18:00", program: "Ballet Infantil (5-8)", room: "Sala A" },
    { day: "Lunes", time: "18:00-19:00", program: "Hip Hop Kids (9-12)", room: "Sala A" },
    { day: "Lunes", time: "19:00-20:00", program: "Contemporáneo PRO", room: "Sala A" },
    { day: "Lunes", time: "20:00-21:00", program: "Clásico PRO", room: "Sala A" },
    { day: "Martes", time: "17:00-18:00", program: "Jazz Infantil (9-12)", room: "Sala A" },
    { day: "Martes", time: "18:00-19:00", program: "Zumba Kids (5-12)", room: "Sala A" },
    { day: "Martes", time: "19:00-20:00", program: "Street Flow", room: "Sala A" },
    { day: "Martes", time: "20:00-21:00", program: "Pasos de Salón", room: "Sala A" },
    { day: "Miércoles", time: "10:00-13:00", program: "Élite On Demand", room: "Todas" },
    { day: "Miércoles", time: "19:00-20:00", program: "Contemporáneo PRO", room: "Sala A" },
    { day: "Miércoles", time: "20:00-21:00", program: "Clásico PRO", room: "Sala A" },
    { day: "Jueves", time: "17:00-18:00", program: "Ballet Infantil (5-8)", room: "Sala A" },
    { day: "Jueves", time: "18:00-19:00", program: "Hip Hop Kids (9-12)", room: "Sala A" },
    { day: "Jueves", time: "19:00-20:00", program: "Raíces Vivas", room: "Sala A" },
    { day: "Jueves", time: "20:00-21:00", program: "Jota Aragonesa", room: "Sala A" },
    { day: "Viernes", time: "10:00-13:00", program: "Élite On Demand", room: "Todas" },
    { day: "Viernes", time: "19:00-20:00", program: "Street Flow", room: "Sala A" },
    { day: "Viernes", time: "20:00-21:00", program: "Pasos de Salón", room: "Sala A" },
  ];

  const pricingTiers = [
    {
      model: "Élite On Demand",
      color: "primary",
      tiers: [
        { name: "Sesión Única", price: 45, unit: "sesión", features: ["1 hora de clase privada", "Feedback personalizado", "Sin compromiso"] },
        { name: "Bono 5 Sesiones", price: 200, unit: "bono", features: ["5 horas de clases", "Ahorro de 25€", "Válido 3 meses"], highlighted: true },
        { name: "Bono 10 Sesiones", price: 380, unit: "bono", features: ["10 horas de clases", "Ahorro de 70€", "Válido 6 meses"] },
      ],
    },
    {
      model: "Ritmo Constante",
      color: "accent",
      tiers: [
        { name: "Suscripción PRO", price: 95, unit: "mes", features: ["4 horas/semana", "Clásico + Contemporáneo", "Matrícula 30€/año"], highlighted: true },
        { name: "Suscripción Amateur", price: 65, unit: "mes", features: ["2 horas/semana", "Folclore, Urbano o Salón", "Matrícula 30€/año"] },
      ],
    },
    {
      model: "Generación Dance",
      color: "accent",
      tiers: [
        { name: "Cuota Mensual", price: 60, unit: "mes", features: ["2 horas/semana", "Todos los estilos infantiles", "Matrícula 30€/año", "10% descuento 2º hermano"], highlighted: true },
      ],
    },
    {
      model: "Sí, Quiero Bailar",
      color: "primary",
      tiers: [
        { name: "Pack Básico", price: 135, unit: "pack", features: ["3 sesiones", "Vals o baile sencillo", "Edición musical básica"] },
        { name: "Pack Estelar", price: 210, unit: "pack", features: ["5 sesiones", "Coreografía original", "Edición musical completa"], highlighted: true },
        { name: "Pack Premium", price: 350, unit: "pack", features: ["8 sesiones", "Hasta 4 personas extra", "Coreografías complejas"] },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Horarios y Tarifas
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparencia total. Descubre nuestros horarios y precios diseñados para adaptarse a ti.
          </p>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 p-3 rounded-lg bg-primary/10 mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Horarios Semanales
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Clases regulares de lunes a viernes
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day) => (
                <div key={day} className="mb-6">
                  <h3 className="font-display text-lg font-bold mb-3 px-4">{day}</h3>
                  <div className="space-y-2">
                    {scheduleSlots
                      .filter((slot) => slot.day === day)
                      .map((slot, index) => (
                        <Card
                          key={index}
                          className="hover-elevate transition-all duration-200"
                          data-testid={`schedule-slot-${index}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                              <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                                <Badge variant="outline" className="text-sm font-mono whitespace-nowrap">
                                  {slot.time}
                                </Badge>
                                <span className="font-body font-semibold">{slot.program}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {slot.room}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-6 bg-card rounded-xl border border-card-border">
            <p className="font-body text-sm text-muted-foreground text-center">
              <strong>Nota:</strong> Élite On Demand disponible de lunes a viernes de 10:00 a 13:00 (reserva previa). Los horarios pueden variar según disponibilidad y demanda.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 p-3 rounded-lg bg-primary/10 mb-4">
              <Euro className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Tarifas por Modelo
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Invierte en ti, elige tu plan
            </p>
          </div>

          <div className="space-y-16">
            {pricingTiers.map((modelGroup, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="font-display text-2xl font-bold mb-6 text-center">
                  {modelGroup.model}
                </h3>
                <div className={`grid grid-cols-1 ${modelGroup.tiers.length === 2 ? 'md:grid-cols-2 max-w-4xl' : modelGroup.tiers.length === 3 ? 'md:grid-cols-3' : ''} mx-auto gap-6`}>
                  {modelGroup.tiers.map((tier, index) => (
                    <Card
                      key={index}
                      className={`relative overflow-hidden hover-elevate transition-all duration-300 ${
                        tier.highlighted ? "border-2 border-primary" : ""
                      }`}
                      data-testid={`pricing-card-${groupIndex}-${index}`}
                    >
                      {tier.highlighted && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
                          POPULAR
                        </div>
                      )}

                      <CardHeader className="text-center pt-8 pb-6">
                        <h4 className="font-display text-xl font-bold mb-4">{tier.name}</h4>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="font-display text-4xl font-bold">{tier.price}€</span>
                          <span className="font-body text-sm text-muted-foreground">/ {tier.unit}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="pb-8">
                        <ul className="space-y-3 mb-6">
                          {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 font-body text-sm">
                              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href="/contacto">
                          <Button
                            variant={tier.highlighted ? "default" : "outline"}
                            className="w-full"
                            data-testid={`button-pricing-${groupIndex}-${index}`}
                          >
                            Solicitar información
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-none">
              <CardContent className="p-8 text-center">
                <h3 className="font-display text-2xl font-bold mb-4">
                  ¿Necesitas un plan personalizado?
                </h3>
                <p className="font-body text-muted-foreground mb-6">
                  Contáctanos y diseñaremos una solución a medida para tus objetivos
                </p>
                <Link href="/contacto">
                  <Button size="lg" data-testid="button-custom-plan">
                    Habla con nosotros
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
