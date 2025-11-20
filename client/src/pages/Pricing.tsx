import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "wouter";
import { Check, Clock, Euro, Loader2, AlertCircle } from "lucide-react";
import type { SelectPricingTier, ScheduleSlotWithProgram, SelectBusinessModel } from "@shared/schema";

export default function Pricing() {
  const { data: scheduleSlots, isLoading: slotsLoading, error: slotsError } = useQuery<ScheduleSlotWithProgram[]>({
    queryKey: ["/api/schedule-slots"],
  });

  const { data: pricingTiers, isLoading: pricingLoading, error: pricingError } = useQuery<SelectPricingTier[]>({
    queryKey: ["/api/pricing-tiers"],
  });

  const { data: businessModels, isLoading: modelsLoading, error: modelsError } = useQuery<SelectBusinessModel[]>({
    queryKey: ["/api/business-models"],
  });

  const isLoading = slotsLoading || pricingLoading || modelsLoading;
  const hasError = slotsError || pricingError || modelsError;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Group pricing tiers by business model with proper guards
  const groupedPricing = (businessModels || []).map((model) => ({
    model: model.name,
    color: model.slug.includes('elite') || model.slug.includes('boda') ? 'primary' : 'accent',
    tiers: (pricingTiers || []).filter((tier) => tier.businessModelId === model.id),
  })).filter((group) => group.tiers.length > 0);

  // API already filters by published=true for both slots and programs
  const publishedSlots = scheduleSlots || [];

  // Map database enum values to Spanish day names
  const dayMapping: Record<string, string> = {
    'monday': 'Lunes',
    'tuesday': 'Martes',
    'wednesday': 'Miércoles',
    'thursday': 'Jueves',
    'friday': 'Viernes',
    'saturday': 'Sábado',
    'sunday': 'Domingo',
  };

  const reverseDayMapping: Record<string, string> = {
    'Lunes': 'monday',
    'Martes': 'tuesday',
    'Miércoles': 'wednesday',
    'Jueves': 'thursday',
    'Viernes': 'friday',
    'Sábado': 'saturday',
    'Domingo': 'sunday',
  };

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

          {hasError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No pudimos cargar algunos horarios o tarifas. Por favor, inténtalo de nuevo más tarde.
              </AlertDescription>
            </Alert>
          )}

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day) => {
                const daySlots = publishedSlots.filter((slot) => slot.dayOfWeek === reverseDayMapping[day]);
                
                return (
                <div key={day} className="mb-6">
                  <h3 className="font-display text-lg font-bold mb-3 px-4">{day}</h3>
                  <div className="space-y-2">
                    {daySlots.length > 0 ? (
                      daySlots.map((slot, index) => (
                        <Card
                          key={index}
                          className="hover-elevate transition-all duration-200"
                          data-testid={`schedule-slot-${index}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                              <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                                <Badge variant="outline" className="text-sm font-mono whitespace-nowrap">
                                  {slot.startTime} - {slot.endTime}
                                </Badge>
                                <span className="font-body font-semibold">{slot.programName}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {slot.room}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card className="p-4">
                        <p className="text-sm text-muted-foreground text-center">
                          No hay clases programadas este día
                        </p>
                      </Card>
                    )}
                  </div>
                </div>
                );
              })}
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
            {groupedPricing.map((modelGroup, groupIndex) => (
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
                          <span className="font-display text-4xl font-bold">{(tier.priceAmount / 100).toFixed(0)}€</span>
                          <span className="font-body text-sm text-muted-foreground">/ {tier.billingPeriod}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="pb-8">
                        <ul className="space-y-3 mb-6">
                          {(tier.features || []).map((feature, i) => (
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
