import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProgramSchema, type SelectProgram, type SelectBusinessModel, type InsertProgram } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ProgramsManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<SelectProgram | null>(null);
  const { toast } = useToast();

  const { data: allPrograms, isLoading, error, refetch } = useQuery<SelectProgram[]>({
    queryKey: ["/api/programs"],
  });

  const { data: businessModels } = useQuery<SelectBusinessModel[]>({
    queryKey: ["/api/business-models"],
  });

  const form = useForm<InsertProgram>({
    resolver: zodResolver(insertProgramSchema),
    defaultValues: {
      slug: "",
      name: "",
      description: "",
      level: "beginner",
      ageGroup: "adult",
      businessModelId: null,
      weeklyHours: 2,
      published: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertProgram) => apiRequest("POST", "/api/programs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
      toast({ title: "Programa creado", description: "El programa se ha creado correctamente" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo crear el programa", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertProgram> }) =>
      apiRequest("PUT", `/api/programs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
      toast({ title: "Programa actualizado", description: "El programa se ha actualizado correctamente" });
      setIsDialogOpen(false);
      setEditingProgram(null);
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo actualizar el programa", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertProgram) => {
    if (editingProgram) {
      updateMutation.mutate({ id: editingProgram.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (program: SelectProgram) => {
    setEditingProgram(program);
    form.reset({
      slug: program.slug,
      name: program.name,
      description: program.description,
      level: program.level,
      ageGroup: program.ageGroup,
      businessModelId: program.businessModelId || null,
      weeklyHours: program.weeklyHours || 2,
      published: program.published,
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingProgram(null);
    form.reset({
      slug: "",
      name: "",
      description: "",
      level: "beginner",
      ageGroup: "adult",
      businessModelId: null,
      weeklyHours: 2,
      published: true,
    });
    setIsDialogOpen(true);
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-muted-foreground text-center">Error al cargar los programas</p>
        <Button onClick={() => refetch()} variant="outline">
          Reintentar
        </Button>
      </div>
    );
  }

  const programs = allPrograms || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Gestión de Programas</h1>
          <p className="font-body text-muted-foreground">
            Administra el catálogo de disciplinas y servicios
          </p>
        </div>
        <Button onClick={handleAddNew} data-testid="button-add-program">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Programa
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {programs.map((program) => {
          const businessModel = businessModels?.find(bm => bm.id === program.businessModelId);
          return (
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
                      <span className="font-medium">Modelo:</span> {businessModel?.name || "Sin modelo"}
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
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(program)}
                      data-testid={`button-edit-${program.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {programs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="font-body text-lg text-muted-foreground">
                No hay programas disponibles
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProgram ? "Editar Programa" : "Nuevo Programa"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ballet Clásico Profesional" data-testid="input-program-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (URL)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ballet-clasico-profesional" data-testid="input-program-slug" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} data-testid="input-program-description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nivel</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-program-level">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Iniciación</SelectItem>
                          <SelectItem value="intermediate">Intermedio</SelectItem>
                          <SelectItem value="advanced">Avanzado</SelectItem>
                          <SelectItem value="professional">Profesional</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ageGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grupo de Edad</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-program-age-group">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="children">Infantil</SelectItem>
                          <SelectItem value="youth">Juvenil</SelectItem>
                          <SelectItem value="adult">Adultos</SelectItem>
                          <SelectItem value="all_ages">Todas las edades</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="businessModelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo de Negocio (Opcional)</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(value === "none" ? null : value)} 
                      value={field.value || "none"}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-program-business-model">
                          <SelectValue placeholder="Selecciona un modelo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Sin modelo</SelectItem>
                        {businessModels?.map((bm) => (
                          <SelectItem key={bm.id} value={bm.id}>
                            {bm.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weeklyHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horas Semanales</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        data-testid="input-program-weekly-hours"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingProgram(null);
                    form.reset();
                  }}
                  data-testid="button-cancel-program"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-program"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {editingProgram ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
