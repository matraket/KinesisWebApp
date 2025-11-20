import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Users, Heart, TrendingUp, Loader2 } from "lucide-react";
import type { SelectBusinessModel } from "@shared/schema";
import heroImage from "@assets/generated_images/hero_dancer_dramatic_leap.png";
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
  "elite-on-demand": "Reserva tu sesión",
  "ritmo-constante": "Ver horarios",
  "generacion-dance": "Preinscribe a tu hijo/a",
  "si-quiero-bailar": "Consulta packs",
};

export default function Home() {
  const { data: businessModels, isLoading, isError, error } = useQuery<SelectBusinessModel[]>({
    queryKey: ["/api/business-models"],
  });

  const displayModels = businessModels?.filter(m => m.published).sort((a, b) => a.order - b.order) || [];

  if (isError) {
    console.error("Error loading business models:", error);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(5, 7, 20, 0.75), rgba(5, 7, 20, 0.85)), url(${heroImage})`,
          }}
        />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Democratizamos la Excelencia en la Danza
          </h1>
          <p className="font-body text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Centro de referencia en Zaragoza. Combinamos alta tecnificación, formación amateur y programas infantiles en un ecosistema 360º.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button size="lg" className="text-base" data-testid="button-hero-cta-primary">
                Pide Información
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/programas">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-hero-cta-secondary"
              >
                Ver Programas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Business Models Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Cuatro Modelos, Una Pasión
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Elige el camino que mejor se adapta a tus objetivos y estilo de vida
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-body text-lg text-muted-foreground mb-4">
                No pudimos cargar los modelos de negocio. Por favor, intenta de nuevo más tarde.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayModels.map((model, index) => {
                const Icon = iconMap[model.slug] || Sparkles;
                const image = imageMap[model.slug] || eliteImage;
                const cta = ctaMap[model.slug] || "Más información";

                return (
                  <Card
                    key={model.id}
                    className="overflow-hidden hover-elevate transition-all duration-300"
                    data-testid={`card-business-model-${index}`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={image}
                        alt={model.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                      <div className="absolute bottom-4 left-6 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/20 backdrop-blur-sm">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold">{model.name}</h3>
                          <p className="font-body text-sm text-muted-foreground">{model.tagline}</p>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                        {model.description}
                      </p>
                      <Link href="/modelos">
                        <Button variant="default" className="w-full" data-testid={`button-model-cta-${index}`}>
                          {cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "15+", label: "Años de experiencia" },
              { number: "30+", label: "Profesores expertos" },
              { number: "500+", label: "Alumnos activos" },
              { number: "20+", label: "Disciplinas de danza" },
            ].map((stat, index) => (
              <div key={index} data-testid={`stat-item-${index}`}>
                <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="font-body text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para comenzar tu viaje en la danza?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8">
            Contáctanos y descubre cómo Kinesis puede ayudarte a alcanzar tus objetivos
          </p>
          <Link href="/contacto">
            <Button size="lg" data-testid="button-cta-footer">
              Contáctanos ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
