import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SelectProgram } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, Filter, Loader2 } from "lucide-react";
import balletImage from "@assets/generated_images/classical_ballet_technique_showcase.png";
import hipHopImage from "@assets/generated_images/hip_hop_dance_energy.png";

const imageMap: Record<string, string> = {
  "ballet-clasico": balletImage,
  "contemporaneo": balletImage,
  "street-flow": hipHopImage,
  "raices-vivas": balletImage,
  "pasos-de-salon": balletImage,
  "jota-aragonesa": balletImage,
  "ballet-infantil-5-8": balletImage,
  "hip-hop-kids": hipHopImage,
  "jazz-infantil": balletImage,
  "zumba-kids": hipHopImage,
};

export default function Programs() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedAge, setSelectedAge] = useState<string>("all");

  const { data: programs, isLoading, isError, error } = useQuery<SelectProgram[]>({
    queryKey: ["/api/programs"],
  });

  const displayPrograms = programs?.filter(p => p.published) || [];

  if (isError) {
    console.error("Error loading programs:", error);
  }

  const programs_backup = [
    {
      id: 1,
      name: "Ballet Clásico Profesional",
      level: "professional",
      ageGroup: "adult",
      description:
        "Formación rigurosa en técnica clásica para bailarines avanzados. Incluye barra, centro, diagonal y variaciones.",
      weeklyHours: 4,
      businessModel: "Ritmo Constante PRO",
      image: balletImage,
    },
    {
      id: 2,
      name: "Contemporáneo Avanzado",
      level: "advanced",
      ageGroup: "adult",
      description:
        "Exploración del movimiento contemporáneo con énfasis en técnicas de release, floor work y composición coreográfica.",
      weeklyHours: 4,
      businessModel: "Ritmo Constante PRO",
      image: balletImage,
    },
    {
      id: 3,
      name: "Street Flow (Hip Hop y Urbano)",
      level: "beginner",
      ageGroup: "all_ages",
      description:
        "Hip Hop, Popping, Locking y estilos urbanos actuales. Para todos los niveles, desde iniciación hasta avanzado.",
      weeklyHours: 2,
      businessModel: "Ritmo Constante Amateur",
      image: hipHopImage,
    },
    {
      id: 4,
      name: "Raíces Vivas (Folclore)",
      level: "beginner",
      ageGroup: "adult",
      description:
        "Sevillanas, Muñeira, Fandango y otras danzas tradicionales. Recuperación y celebración de nuestras raíces.",
      weeklyHours: 2,
      businessModel: "Ritmo Constante Amateur",
      image: balletImage,
    },
    {
      id: 5,
      name: "Pasos de Salón",
      level: "beginner",
      ageGroup: "adult",
      description:
        "Salsa, Bachata, Tango y otros bailes de salón. Perfecto para eventos sociales y diversión en pareja.",
      weeklyHours: 2,
      businessModel: "Ritmo Constante Amateur",
      image: balletImage,
    },
    {
      id: 6,
      name: "Jota Aragonesa",
      level: "intermediate",
      ageGroup: "all_ages",
      description:
        "Jota de competición y tradicional. Impartida por maestros galardonados del Certamen Oficial de Jota.",
      weeklyHours: 2,
      businessModel: "Ritmo Constante Amateur",
      image: balletImage,
    },
    {
      id: 7,
      name: "Ballet Infantil (5-8 años)",
      level: "beginner",
      ageGroup: "children",
      description:
        "Introducción lúdica al ballet para los más pequeños. Desarrollo de coordinación, postura y expresión.",
      weeklyHours: 2,
      businessModel: "Generación Dance",
      image: balletImage,
    },
    {
      id: 8,
      name: "Hip Hop Kids (5-12 años)",
      level: "beginner",
      ageGroup: "children",
      description:
        "Hip Hop adaptado a niños y niñas. Diversión, ritmo y autoconfianza en un ambiente seguro.",
      weeklyHours: 2,
      businessModel: "Generación Dance",
      image: hipHopImage,
    },
    {
      id: 9,
      name: "Jazz Infantil (9-12 años)",
      level: "beginner",
      ageGroup: "children",
      description:
        "Jazz dinámico con coreografías enérgicas. Técnica, saltos, giros y mucha energía.",
      weeklyHours: 2,
      businessModel: "Generación Dance",
      image: balletImage,
    },
    {
      id: 10,
      name: "Zumba Kids (5-12 años)",
      level: "beginner",
      ageGroup: "children",
      description:
        "Fitness y diversión con música actual. Ideal para liberar energía y mejorar la coordinación.",
      weeklyHours: 2,
      businessModel: "Generación Dance",
      image: hipHopImage,
    },
  ];

  const levelLabels: Record<string, string> = {
    beginner: "Iniciación",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    professional: "Profesional",
  };

  const ageLabels: Record<string, string> = {
    children: "Infantil",
    youth: "Juvenil",
    adult: "Adultos",
    all_ages: "Todas las edades",
  };

  const filteredPrograms = displayPrograms.filter((program) => {
    const levelMatch = selectedLevel === "all" || program.level === selectedLevel;
    const ageMatch = selectedAge === "all" || program.ageGroup === selectedAge;
    return levelMatch && ageMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Programas y Servicios
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestro catálogo completo de disciplinas. Desde formación profesional hasta clases recreativas.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-display font-semibold">
              <Filter className="h-4 w-4" />
              Filtrar por:
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground font-body">Nivel:</span>
              <Button
                size="sm"
                variant={selectedLevel === "all" ? "default" : "outline"}
                onClick={() => setSelectedLevel("all")}
                data-testid="button-filter-level-all"
              >
                Todos
              </Button>
              {Object.entries(levelLabels).map(([key, label]) => (
                <Button
                  key={key}
                  size="sm"
                  variant={selectedLevel === key ? "default" : "outline"}
                  onClick={() => setSelectedLevel(key)}
                  data-testid={`button-filter-level-${key}`}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground font-body">Edad:</span>
              <Button
                size="sm"
                variant={selectedAge === "all" ? "default" : "outline"}
                onClick={() => setSelectedAge("all")}
                data-testid="button-filter-age-all"
              >
                Todos
              </Button>
              {Object.entries(ageLabels).map(([key, label]) => (
                <Button
                  key={key}
                  size="sm"
                  variant={selectedAge === key ? "default" : "outline"}
                  onClick={() => setSelectedAge(key)}
                  data-testid={`button-filter-age-${key}`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-8 flex items-center justify-between">
            <p className="font-body text-muted-foreground">
              {filteredPrograms.length} programa{filteredPrograms.length !== 1 ? "s" : ""} disponible{filteredPrograms.length !== 1 ? "s" : ""}
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-body text-lg text-muted-foreground mb-4">
                No pudimos cargar los programas. Por favor, intenta de nuevo más tarde.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => {
                const image = imageMap[program.slug] || balletImage;

                return (
                  <Card
                    key={program.id}
                    className="overflow-hidden hover-elevate transition-all duration-300"
                    data-testid={`card-program-${program.id}`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={image}
                        alt={program.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                        {levelLabels[program.level]}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-sm">
                        {ageLabels[program.ageGroup]}
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold mb-2">{program.name}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    {program.description}
                  </p>
                  {program.weeklyHours && (
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="font-body text-muted-foreground">
                        {program.weeklyHours}h/semana
                      </span>
                    </div>
                  )}
                  <Link href="/contacto?tipo=pre_registration">
                    <Button size="sm" variant="outline" className="w-full">
                      Solicitar información
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
                );
              })}
            </div>
          )}

          {!isLoading && filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-lg text-muted-foreground">
                No se encontraron programas con los filtros seleccionados
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8">
            Contáctanos y te ayudaremos a encontrar el programa perfecto para ti
          </p>
          <Link href="/contacto">
            <Button size="lg" data-testid="button-programs-cta">
              Contacta con nosotros
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
