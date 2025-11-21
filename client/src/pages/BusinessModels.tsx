import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { SelectBusinessModel, SelectPricingTier } from "@shared/schema";
import {
  Check,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Heart,
  Users,
  Euro,
  Star,
  Loader2,
  Lightbulb,
  TrendingUpIcon,
  LucideIcon,
} from "lucide-react";

const getIconComponent = (iconName: string | null): LucideIcon => {
  const icons: Record<string, LucideIcon> = {
    Sparkles,
    TrendingUp,
    Heart,
    Users,
  };
  return iconName && icons[iconName] ? icons[iconName] : Sparkles;
};

export default function BusinessModels() {
  const { data: businessModels, isLoading: loadingModels, isError: errorModels, error: errorModelsData } = useQuery<SelectBusinessModel[]>({
    queryKey: ["/api/business-models"],
  });

  const { data: pricingTiers, isLoading: loadingPricing, isError: errorPricing, error: errorPricingData } = useQuery<SelectPricingTier[]>({
    queryKey: ["/api/pricing-tiers"],
  });

  const isLoading = loadingModels || loadingPricing;
  const isError = errorModels || errorPricing;

  const displayModels = businessModels?.filter(m => m.published).sort((a, b) => a.order - b.order) || [];

  if (errorModels) console.error("Error loading business models:", errorModelsData);
  if (errorPricing) console.error("Error loading pricing tiers:", errorPricingData);

  const getPricingForModel = (modelId: string) => {
    return pricingTiers
      ?.filter(tier => tier.businessModelId === modelId && tier.published)
      .sort((a, b) => a.order - b.order) || [];
  };

  const renderPricingSection = (model: SelectBusinessModel) => {
    const modelPricing = getPricingForModel(model.id);
    const hasCustomPricing = model.pricingSession || model.pricingBono5 || model.pricingBono10;
    
    if (!hasCustomPricing && modelPricing.length === 0) {
      return null;
    }

    return (
      <div>
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
          <Euro className="h-4 w-4" />
          Tarifas
        </h3>
        <div className="space-y-1 font-body text-sm">
          {model.pricingSession && (
            <div className="text-foreground">
              • Sesión individual: {model.pricingSession}€
            </div>
          )}
          {model.pricingBono5 && (
            <div className="text-foreground">
              • Bono 5 sesiones: {model.pricingBono5}€
            </div>
          )}
          {model.pricingBono10 && (
            <div className="text-foreground">
              • Bono 10 sesiones: {model.pricingBono10}€
            </div>
          )}
          {modelPricing.map((tier) => (
            <div key={tier.id} className="text-foreground">
              • {tier.name}: {tier.priceAmount}€{tier.billingPeriod ? `/${tier.billingPeriod}` : ""}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Modelos de Negocio
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Cuatro caminos únicos para alcanzar tus objetivos en la danza. Elige el que mejor se adapta a ti.
          </p>
        </div>
      </section>

      {/* Models Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-24">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-body text-lg text-muted-foreground mb-4">
                No pudimos cargar la información. Por favor, intenta de nuevo más tarde.
              </p>
            </div>
          ) : (
            displayModels.map((model, index) => {
              const Icon = getIconComponent(model.iconName);

              return (
                <div
                  key={model.id}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-12 items-center`}
                  data-testid={`section-model-${index}`}
                >
                  {/* Image */}
                  <div className="flex-1 w-full">
                    <div className="relative rounded-2xl overflow-hidden h-[400px] hover-elevate transition-all duration-300">
                      {model.imageUrl && (
                        <img
                          src={model.imageUrl}
                          alt={model.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-6 left-6">
                        <div className="inline-flex p-3 rounded-xl bg-primary/90 backdrop-blur-sm">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                      {model.name}
                    </h2>
                    {model.tagline && (
                      <p className="font-display text-lg text-primary font-semibold mb-4">
                        {model.tagline}
                      </p>
                    )}
                    <p className="font-body text-muted-foreground leading-relaxed mb-6">
                      {model.description}
                    </p>

                    <div className="space-y-6 mb-8">
                      {/* Features */}
                      {model.features && model.features.length > 0 && (
                        <div>
                          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            Características
                          </h3>
                          <ul className="space-y-2">
                            {model.features.map((feature: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 font-body text-sm">
                                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Advantages */}
                      {model.advantages && model.advantages.length > 0 && (
                        <div>
                          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                            <TrendingUpIcon className="h-4 w-4" />
                            Ventajas
                          </h3>
                          <ul className="space-y-2">
                            {model.advantages.map((advantage: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 font-body text-sm">
                                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{advantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Benefits */}
                      {model.benefits && model.benefits.length > 0 && (
                        <div>
                          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            Beneficios
                          </h3>
                          <ul className="space-y-2">
                            {model.benefits.map((benefit: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 font-body text-sm">
                                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Pricing */}
                      {renderPricingSection(model)}
                    </div>

                    <Link href={model.ctaLink}>
                      <Button size="lg" className="w-full sm:w-auto" data-testid={`button-model-cta-${index}`}>
                        {model.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Comparison CTA */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ¿Necesitas ayuda para decidir?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8">
            Contáctanos y te ayudaremos a encontrar el modelo perfecto para ti
          </p>
          <Link href="/contacto">
            <Button size="lg" data-testid="button-help-decide">
              Habla con nosotros
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
