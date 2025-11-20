import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Edit, Eye, EyeOff, Star } from "lucide-react";
import femaleImage from "@assets/generated_images/female_ballet_instructor_portrait.png";
import maleImage from "@assets/generated_images/male_contemporary_instructor_portrait.png";

export default function InstructorsManager() {
  const instructors = [
    {
      id: 1,
      name: "Elena Herrero",
      role: "Directora Artística y Profesora de Clásico",
      photo: femaleImage,
      specialties: ["Ballet Clásico", "Élite On Demand"],
      featured: true,
      published: true,
    },
    {
      id: 2,
      name: "Pablo Rivas",
      role: "Profesor de Contemporáneo",
      photo: maleImage,
      specialties: ["Contemporáneo", "Élite On Demand"],
      featured: true,
      published: true,
    },
    {
      id: 3,
      name: "Diego Montes",
      role: "Profesor de Hip Hop y Urbano",
      photo: maleImage,
      specialties: ["Hip Hop", "Street Flow"],
      featured: false,
      published: true,
    },
    {
      id: 4,
      name: "Lucía Sanz",
      role: "Instructora de Extraescolares",
      photo: femaleImage,
      specialties: ["Generación Dance", "Zumba Kids"],
      featured: false,
      published: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Gestión de Instructores</h1>
          <p className="font-body text-muted-foreground">
            Administra el equipo docente y sus especialidades
          </p>
        </div>
        <Button data-testid="button-add-instructor">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Instructor
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {instructors.map((instructor) => (
          <Card key={instructor.id} className="hover-elevate transition-all" data-testid={`instructor-card-${instructor.id}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarImage src={instructor.photo} alt={instructor.name} />
                  <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-bold">{instructor.name}</h3>
                        {instructor.featured && (
                          <Star className="h-4 w-4 text-primary fill-primary" />
                        )}
                      </div>
                      <p className="font-body text-sm text-muted-foreground mt-1">
                        {instructor.role}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {instructor.published ? (
                        <Badge variant="default" className="text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Publicado
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          <EyeOff className="h-3 w-3 mr-1" />
                          Borrador
                        </Badge>
                      )}
                      <Button size="sm" variant="outline" data-testid={`button-edit-${instructor.id}`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
