import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Configuración del Sitio</h1>
        <p className="font-body text-muted-foreground">
          Administra la información general y redes sociales
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <h2 className="font-display text-xl font-bold">Información de Contacto</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Nombre del Centro</Label>
              <Input
                id="business-name"
                defaultValue="Kinesis - Centro de Danza"
                data-testid="input-business-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Textarea
                id="address"
                defaultValue="Calle Ejemplo, 123&#10;50001 Zaragoza"
                rows={3}
                data-testid="textarea-address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="+34 976 000 000"
                data-testid="input-phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="info@kinesis.com"
                data-testid="input-email"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <h2 className="font-display text-xl font-bold">Redes Sociales</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                placeholder="https://facebook.com/kinesis"
                data-testid="input-facebook"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="https://instagram.com/kinesis"
                data-testid="input-instagram"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input
                id="youtube"
                placeholder="https://youtube.com/@kinesis"
                data-testid="input-youtube"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiktok">TikTok</Label>
              <Input
                id="tiktok"
                placeholder="https://tiktok.com/@kinesis"
                data-testid="input-tiktok"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <h2 className="font-display text-xl font-bold">Horarios de Atención</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hours">Horarios</Label>
              <Textarea
                id="hours"
                defaultValue="Lunes a Viernes: 10:00 - 21:00&#10;Sábado: 10:00 - 14:00&#10;Domingo: Cerrado"
                rows={4}
                data-testid="textarea-hours"
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Settings */}
        <Card>
          <CardHeader>
            <h2 className="font-display text-xl font-bold">Otros Ajustes</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta descripción</Label>
              <Textarea
                id="meta-description"
                defaultValue="Kinesis, centro de referencia en danza en Zaragoza. Ofrecemos formación profesional, clases grupales, programas infantiles y preparación para bodas."
                rows={4}
                data-testid="textarea-meta"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button size="lg" data-testid="button-save-settings">
          <Save className="h-5 w-5 mr-2" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
