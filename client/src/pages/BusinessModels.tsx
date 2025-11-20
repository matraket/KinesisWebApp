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
} from "lucide-react";
import eliteImage from "@assets/generated_images/elite_private_coaching_session.png";
import groupImage from "@assets/generated_images/group_dance_class_energy.png";
import childrenImage from "@assets/generated_images/children's_dance_class_joy.png";
import weddingImage from "@assets/generated_images/wedding_couple_first_dance.png";

const iconMap: Record<string, any> = {
  "elite-on-demand": Sparkles,
  "ritmo-constante": TrendingUp,
  "generacion-dance": Heart,
  "si-quiero-bailar": Users,
};

const imageMap: Record<string, string> = {
  "elite-on-demand": eliteImage,
  "ritmo-constante": groupImage,
  "generacion-dance": childrenImage,
  "si-quiero-bailar": weddingImage,
};

const ctaMap: Record<string, string> = {
  "elite-on-demand": "Reserva tu sesión Élite",
  "ritmo-constante": "Ver horarios y suscribirse",
  "generacion-dance": "Inscribe a tu hijo/a",
  "si-quiero-bailar": "Consulta packs nupciales",
};

const ctaLinkMap: Record<string, string> = {
  "elite-on-demand": "/contacto?tipo=elite_booking",
  "ritmo-constante": "/tarifas",
  "generacion-dance": "/contacto?tipo=pre_registration",
  "si-quiero-bailar": "/contacto?tipo=wedding",
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

  const models_backup = [
    {
      icon: Sparkles,
      title: "Élite On Demand",
      tagline: "Tecnificación a tu medida",
      description:
        "Clases privadas o semi-privadas diseñadas para bailarines que buscan perfeccionar su técnica con profesionales de élite. Máxima flexibilidad: reserva cuando lo necesites.",
      image: eliteImage,
      features: [
        "Clases 100% personalizadas",
        "Profesores especializados de élite",
        "Horario flexible (L-V, 10-13h)",
        "Válido para parejas de baile",
        "Sin compromisos de permanencia",
      ],
      advantages: [
        "Progreso técnico acelerado",
        "Feedback personalizado inmediato",
        "Preparación para audiciones",
        "Corrección de vicios técnicos",
      ],
      benefits: [
        "Alcanza tu máximo potencial como bailarín",
        "Confianza y seguridad escénica",
        "Resultados visibles en pocas sesiones",
      ],
      pricing: {
        session: "45€/sesión",
        bono5: "200€ (5 sesiones)",
        bono10: "380€ (10 sesiones)",
      },
      cta: "Reserva tu sesión Élite",
      ctaLink: "/contacto?tipo=elite_booking",
    },
    {
      icon: TrendingUp,
      title: "Ritmo Constante",
      tagline: "Constancia que transforma",
      description:
        "Suscripciones mensuales a clases grupales de estilos específicos. La constancia es la clave del dominio. Encuentra tu estilo, únete a un grupo y crece con personas como tú.",
      image: groupImage,
      features: [
        "Grupos reducidos y estables",
        "Clases 2 o 4 horas/semana",
        "Clásico, Contemporáneo, Folclore, Urbano, Salón",
        "Progresión estructurada",
        "Acceso a eventos y workshops",
      ],
      advantages: [
        "Comunidad de bailarines con tu misma pasión",
        "Motivación grupal constante",
        "Evolución técnica visible mes a mes",
        "Ambiente profesional pero relajado",
      ],
      benefits: [
        "Domina tu estilo favorito",
        "Mejora física y mental",
        "Nuevas amistades con intereses afines",
      ],
      pricing: {
        pro: "95€/mes (PRO - 4h/semana)",
        amateur: "65€/mes (Amateur - 2h/semana)",
        matricula: "+ 30€ matrícula anual",
      },
      cta: "Ver horarios y suscribirse",
      ctaLink: "/tarifas",
    },
    {
      icon: Heart,
      title: "Generación Dance",
      tagline: "La cantera del futuro",
      description:
        "Programas infantiles y juveniles (5-12 años) diseñados para combinar formación, diversión y conciliación familiar. Danza para el desarrollo integral de los más pequeños.",
      image: childrenImage,
      features: [
        "Grupos por edades (5-8 y 9-12 años)",
        "2 horas/semana de clases",
        "Estilos variados: Ballet, Hip Hop, Zumba Kids, Jazz",
        "Profesores especializados en pedagogía",
        "Clase abierta trimestral para familias",
      ],
      advantages: [
        "Desarrollo de coordinación y expresión",
        "Autoconfianza y trabajo en equipo",
        "Ambiente seguro y positivo",
        "Conciliación familiar",
      ],
      benefits: [
        "Niños más seguros y creativos",
        "Hábitos saludables desde pequeños",
        "Diversión garantizada",
      ],
      pricing: {
        monthly: "60€/mes (2h/semana)",
        discount: "10% descuento 2º hermano",
        matricula: "+ 30€ matrícula anual",
      },
      cta: "Preinscribe a tu hijo/a",
      ctaLink: "/contacto?tipo=pre_registration",
    },
    {
      icon: Users,
      title: "Sí, Quiero Bailar",
      tagline: "Tu momento WOW",
      description:
        "Coreografía personalizada para tu boda o evento especial. Desde un vals elegante hasta un flashmob sorpresa. Hacemos que tu primer baile sea inolvidable.",
      image: weddingImage,
      features: [
        "Coreografía 100% personalizada",
        "Edición musical incluida",
        "Sin experiencia previa necesaria",
        "Packs de 3, 5 u 8 sesiones",
        "Opción para incluir amigos/familia",
      ],
      advantages: [
        "Momento único y memorable",
        "Trabajo adaptado a vuestro nivel",
        "Sin estrés ni agobios",
        "Resultado espectacular garantizado",
      ],
      benefits: [
        "El recuerdo más especial de vuestra boda",
        "Sorprende a tus invitados",
        "Confianza y disfrute en vuestro día",
      ],
      pricing: {
        basic: "135€ (Pack Básico - 3 sesiones)",
        stellar: "210€ (Pack Estelar - 5 sesiones)",
        premium: "350€ (Pack Premium - 8 sesiones)",
      },
      cta: "Consulta packs nupciales",
      ctaLink: "/contacto?tipo=wedding",
    },
  ];

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
              const Icon = iconMap[model.slug] || Sparkles;
              const image = imageMap[model.slug] || eliteImage;
              const cta = ctaMap[model.slug] || "Más información";
              const ctaLink = ctaLinkMap[model.slug] || "/contacto";
              const modelPricing = getPricingForModel(model.id);

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
                      <img
                        src={image}
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
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
                    <p className="font-display text-lg text-primary font-semibold mb-4">
                      {model.tagline}
                    </p>
                    <p className="font-body text-muted-foreground leading-relaxed mb-6">
                      {model.description}
                    </p>

                    <div className="space-y-6 mb-8">
                      {/* Features */}
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
                      {modelPricing.length > 0 && (
                        <div>
                          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                            <Euro className="h-4 w-4" />
                            Tarifas
                          </h3>
                          <div className="space-y-1 font-body text-sm">
                            {modelPricing.map((tier) => (
                              <div key={tier.id} className="text-foreground">
                                • {tier.name}: {tier.priceAmount}€{tier.billingPeriod ? `/${tier.billingPeriod}` : ""}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Link href={ctaLink}>
                      <Button size="lg" className="w-full sm:w-auto" data-testid={`button-model-cta-${index}`}>
                        {cta}
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
