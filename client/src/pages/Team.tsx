import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import type { InstructorWithSpecialties } from "@shared/schema";
import femaleInstructorImage from "@assets/generated_images/female_ballet_instructor_portrait.png";
import maleInstructorImage from "@assets/generated_images/male_contemporary_instructor_portrait.png";

export default function Team() {
  const { data: instructors, isLoading, error, refetch } = useQuery<InstructorWithSpecialties[]>({
    queryKey: ["/api/instructors"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-muted-foreground text-center">
          Error al cargar el equipo. Por favor, inténtalo más tarde.
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Reintentar
        </Button>
      </div>
    );
  }

  if (!instructors || instructors.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">No hay instructores disponibles en este momento.</p>
      </div>
    );
  }

  const instructorsWithImages = instructors.map((instructor) => ({
    ...instructor,
    photo: instructor.photoUrl || (
      instructor.name.includes('Elena') || instructor.name.includes('Sofía') || 
      instructor.name.includes('Isabel') || instructor.name.includes('Begoña') || 
      instructor.name.includes('Lucía')
        ? femaleInstructorImage
        : maleInstructorImage
    ),
  }));

  const featuredInstructors = instructorsWithImages.filter((i) => i.featured);
  const regularInstructors = instructorsWithImages.filter((i) => !i.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Nuestro Equipo
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Profesionales de élite apasionados por la enseñanza. Conoce a los maestros que te guiarán en tu viaje.
          </p>
        </div>
      </section>

      {/* Featured Instructors */}
      {featuredInstructors.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Dirección Artística
              </h2>
              <p className="font-body text-lg text-muted-foreground">
                Las figuras clave que lideran el proyecto Kinesis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {featuredInstructors.map((instructor) => (
                <Card
                  key={instructor.id}
                  className="overflow-hidden hover-elevate transition-all duration-300"
                  data-testid={`card-featured-instructor-${instructor.id}`}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={instructor.photo}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-display text-2xl font-bold text-white mb-1">
                        {instructor.name}
                      </h3>
                      <p className="font-body text-sm text-gray-200">{instructor.role}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {instructor.quote && (
                      <blockquote className="italic text-muted-foreground mb-4 font-body text-sm border-l-2 border-primary pl-4">
                        "{instructor.quote}"
                      </blockquote>
                    )}
                    <p className="font-body text-sm text-foreground leading-relaxed mb-4">
                      {instructor.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Instructors */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Equipo Docente
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Especialistas en cada disciplina con años de experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularInstructors.map((instructor) => (
              <Card
                key={instructor.id}
                className="overflow-hidden hover-elevate transition-all duration-300"
                data-testid={`card-instructor-${instructor.id}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={instructor.photo}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      {instructor.name}
                    </h3>
                    <p className="font-body text-xs text-gray-200">{instructor.role}</p>
                  </div>
                </div>

                <CardContent className="p-5">
                  {instructor.quote && (
                    <blockquote className="italic text-muted-foreground mb-3 font-body text-xs border-l-2 border-primary pl-3">
                      "{instructor.quote}"
                    </blockquote>
                  )}
                  <p className="font-body text-sm text-foreground leading-relaxed mb-4">
                    {instructor.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
