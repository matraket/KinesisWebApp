import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Edit, Eye, EyeOff, Star, Loader2, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInstructorSchema, type InstructorWithSpecialties, type SelectProgram, type InsertInstructor } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import femaleImage from "@assets/generated_images/female_ballet_instructor_portrait.png";
import maleImage from "@assets/generated_images/male_contemporary_instructor_portrait.png";

export default function InstructorsManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<InstructorWithSpecialties | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const { toast } = useToast();

  const { data: allInstructors, isLoading, error, refetch } = useQuery<InstructorWithSpecialties[]>({
    queryKey: ["/api/instructors"],
  });

  const { data: programs } = useQuery<SelectProgram[]>({
    queryKey: ["/api/programs"],
  });

  const form = useForm<InsertInstructor>({
    resolver: zodResolver(insertInstructorSchema),
    defaultValues: {
      name: "",
      role: "",
      quote: "",
      bio: "",
      photoUrl: "",
      featured: false,
      order: 0,
      published: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertInstructor) => apiRequest("POST", "/api/instructors", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instructors"] });
      toast({ title: "Instructor creado", description: "El instructor se ha creado correctamente" });
      setIsDialogOpen(false);
      setSelectedSpecialties([]);
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo crear el instructor", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertInstructor> }) =>
      apiRequest("PUT", `/api/instructors/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/instructors"] });
      toast({ title: "Instructor actualizado", description: "El instructor se ha actualizado correctamente" });
      setIsDialogOpen(false);
      setEditingInstructor(null);
      setSelectedSpecialties([]);
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo actualizar el instructor", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertInstructor) => {
    if (editingInstructor) {
      updateMutation.mutate({ id: editingInstructor.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (instructor: InstructorWithSpecialties) => {
    setEditingInstructor(instructor);
    form.reset({
      name: instructor.name,
      role: instructor.role,
      quote: instructor.quote || "",
      bio: instructor.bio,
      photoUrl: instructor.photoUrl || "",
      featured: instructor.featured,
      order: instructor.order,
      published: instructor.published,
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingInstructor(null);
    setSelectedSpecialties([]);
    form.reset({
      name: "",
      role: "",
      quote: "",
      bio: "",
      photoUrl: "",
      featured: false,
      order: 0,
      published: true,
    });
    setIsDialogOpen(true);
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
        <p className="text-muted-foreground text-center">Error al cargar los instructores</p>
        <Button onClick={() => refetch()} variant="outline">
          Reintentar
        </Button>
      </div>
    );
  }

  const instructors = allInstructors || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Gestión de Instructores</h1>
          <p className="font-body text-muted-foreground">
            Administra el equipo docente y sus especialidades
          </p>
        </div>
        <Button onClick={handleAddNew} data-testid="button-add-instructor">
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
                  <AvatarImage 
                    src={instructor.photoUrl || (
                      instructor.name.includes('Elena') || instructor.name.includes('Sofía') || 
                      instructor.name.includes('Isabel') || instructor.name.includes('Begoña') || 
                      instructor.name.includes('Lucía')
                        ? femaleImage
                        : maleImage
                    )} 
                    alt={instructor.name} 
                  />
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
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEdit(instructor)}
                        data-testid={`button-edit-${instructor.id}`}
                      >
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

        {instructors.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="font-body text-lg text-muted-foreground">
                No hay instructores disponibles
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingInstructor ? "Editar Instructor" : "Nuevo Instructor"}
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
                      <Input {...field} placeholder="Elena Herrero" data-testid="input-instructor-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Directora Artística y Profesora de Clásico" data-testid="input-instructor-role" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cita (Opcional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="La danza es expresión del alma" data-testid="input-instructor-quote" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biografía</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} data-testid="input-instructor-bio" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de Foto (Opcional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://..." data-testid="input-instructor-photo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-instructor-featured"
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Destacado</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Orden</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-instructor-order"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingInstructor(null);
                    setSelectedSpecialties([]);
                    form.reset();
                  }}
                  data-testid="button-cancel-instructor"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-instructor"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {editingInstructor ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
