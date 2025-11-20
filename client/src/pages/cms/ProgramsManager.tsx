import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";

export default function ProgramsManager() {
  const programs = [
    {
      id: 1,
      name: "Ballet Clásico Profesional",
      level: "professional",
      ageGroup: "adult",
      weeklyHours: 4,
      businessModel: "Ritmo Constante PRO",
      published: true,
    },
    {
      id: 2,
      name: "Contemporáneo Avanzado",
      level: "advanced",
      ageGroup: "adult",
      weeklyHours: 4,
      businessModel: "Ritmo Constante PRO",
      published: true,
    },
    {
      id: 3,
      name: "Street Flow (Hip Hop)",
      level: "beginner",
      ageGroup: "all_ages",
      weeklyHours: 2,
      businessModel: "Ritmo Constante Amateur",
      published: true,
    },
    {
      id: 4,
      name: "Ballet Infantil (5-8 años)",
      level: "beginner",
      ageGroup: "children",
      weeklyHours: 2,
      businessModel: "Generación Dance",
      published: true,
    },
    {
      id: 5,
      name: "Jazz Infantil (9-12 años)",
      level: "beginner",
      ageGroup: "children",
      weeklyHours: 2,
      businessModel: "Generación Dance",
      published: false,
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Gestión de Programas</h1>
          <p className="font-body text-muted-foreground">
            Administra el catálogo de disciplinas y servicios
          </p>
        </div>
        <Button data-testid="button-add-program">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Programa
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {programs.map((program) => (
          <Card key={program.id} className="hover-elevate transition-all" data-testid={`program-card-${program.id}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold">{program.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {levelLabels[program.level]}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {ageLabels[program.ageGroup]}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {program.weeklyHours}h/semana
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="font-body text-sm text-muted-foreground">
                    <span className="font-medium">Modelo:</span> {program.businessModel}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {program.published ? (
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
                  <Button size="sm" variant="outline" data-testid={`button-edit-${program.id}`}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
