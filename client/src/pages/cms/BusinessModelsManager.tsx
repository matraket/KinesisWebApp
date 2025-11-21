import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, EyeOff, Loader2, AlertCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBusinessModelSchema, type SelectBusinessModel, type InsertBusinessModel } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function BusinessModelsManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<SelectBusinessModel | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [advantages, setAdvantages] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [newAdvantage, setNewAdvantage] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  const { toast } = useToast();

  const { data: allModels, isLoading, error, refetch } = useQuery<SelectBusinessModel[]>({
    queryKey: ["/api/business-models"],
    queryFn: async () => {
      const res = await fetch("/api/business-models?includeUnpublished=true", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch business models");
      }
      return res.json();
    },
  });

  const form = useForm<InsertBusinessModel>({
    resolver: zodResolver(insertBusinessModelSchema),
    defaultValues: {
      slug: "",
      name: "",
      tagline: "",
      description: "",
      features: [],
      advantages: [],
      benefits: [],
      imageUrl: "",
      iconName: "",
      cta: "",
      ctaLink: "",
      pricingSession: undefined,
      pricingBono5: undefined,
      pricingBono10: undefined,
      order: 0,
      published: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertBusinessModel) => apiRequest("POST", "/api/business-models", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/business-models"] });
      toast({ title: "Modelo creado", description: "El modelo de negocio se ha creado correctamente" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo crear el modelo de negocio", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertBusinessModel> }) =>
      apiRequest("PUT", `/api/business-models/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/business-models"] });
      toast({ title: "Modelo actualizado", description: "El modelo de negocio se ha actualizado correctamente" });
      setIsDialogOpen(false);
      setEditingModel(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo actualizar el modelo de negocio", variant: "destructive" });
    },
  });

  const resetForm = () => {
    form.reset({
      slug: "",
      name: "",
      tagline: "",
      description: "",
      features: [],
      advantages: [],
      benefits: [],
      imageUrl: "",
      iconName: "",
      cta: "",
      ctaLink: "",
      pricingSession: undefined,
      pricingBono5: undefined,
      pricingBono10: undefined,
      order: 0,
      published: true,
    });
    setFeatures([]);
    setAdvantages([]);
    setBenefits([]);
    setNewFeature("");
    setNewAdvantage("");
    setNewBenefit("");
  };

  const onSubmit = (data: InsertBusinessModel) => {
    const submitData = {
      ...data,
      features,
      advantages,
      benefits,
    };

    if (editingModel) {
      updateMutation.mutate({ id: editingModel.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (model: SelectBusinessModel) => {
    setEditingModel(model);
    form.reset({
      slug: model.slug,
      name: model.name,
      tagline: model.tagline || "",
      description: model.description,
      features: model.features || [],
      advantages: model.advantages || [],
      benefits: model.benefits || [],
      imageUrl: model.imageUrl || "",
      iconName: model.iconName || "",
      cta: model.cta,
      ctaLink: model.ctaLink,
      pricingSession: model.pricingSession || undefined,
      pricingBono5: model.pricingBono5 || undefined,
      pricingBono10: model.pricingBono10 || undefined,
      order: model.order,
      published: model.published,
    });
    setFeatures(model.features || []);
    setAdvantages(model.advantages || []);
    setBenefits(model.benefits || []);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingModel(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addAdvantage = () => {
    if (newAdvantage.trim()) {
      setAdvantages([...advantages, newAdvantage.trim()]);
      setNewAdvantage("");
    }
  };

  const removeAdvantage = (index: number) => {
    setAdvantages(advantages.filter((_, i) => i !== index));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
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
        <p className="text-muted-foreground text-center">Error al cargar los modelos de negocio</p>
        <Button onClick={() => refetch()} variant="outline" data-testid="button-retry">
          Reintentar
        </Button>
      </div>
    );
  }

  const models = allModels || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Gestión de Modelos de Negocio</h1>
          <p className="font-body text-muted-foreground">
            Administra los 4 pilares de negocio de Kinesis
          </p>
        </div>
        <Button onClick={handleAddNew} data-testid="button-add-model">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Modelo
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {models.map((model) => (
          <Card key={model.id} className="hover-elevate transition-all" data-testid={`model-card-${model.id}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold">{model.name}</h3>
                      {model.tagline && (
                        <p className="font-body text-sm text-muted-foreground mt-1">{model.tagline}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {model.iconName && (
                          <Badge variant="outline" className="text-xs">
                            {model.iconName}
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          Orden: {model.order}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="font-body text-sm text-muted-foreground line-clamp-2">
                    {model.description}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {model.features && model.features.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {model.features.length} características
                      </Badge>
                    )}
                    {model.advantages && model.advantages.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {model.advantages.length} ventajas
                      </Badge>
                    )}
                    {model.benefits && model.benefits.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {model.benefits.length} beneficios
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {model.published ? (
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
                    onClick={() => handleEdit(model)}
                    data-testid={`button-edit-${model.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {models.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="font-body text-lg text-muted-foreground">
                No hay modelos de negocio disponibles
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingModel ? "Editar Modelo de Negocio" : "Nuevo Modelo de Negocio"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Clases Regulares" data-testid="input-model-name" />
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
                      <FormLabel>Slug (URL) *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="clases-regulares" data-testid="input-model-slug" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} placeholder="Formación semanal estructurada" data-testid="input-model-tagline" />
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
                    <FormLabel>Descripción *</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} data-testid="input-model-description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="iconName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icono</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger data-testid="select-model-icon">
                            <SelectValue placeholder="Selecciona un icono" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sparkles">Sparkles</SelectItem>
                          <SelectItem value="TrendingUp">TrendingUp</SelectItem>
                          <SelectItem value="Heart">Heart</SelectItem>
                          <SelectItem value="Users">Users</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de Imagen</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} placeholder="https://..." data-testid="input-model-image-url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CTA (Texto del botón) *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Reservar Clase" data-testid="input-model-cta" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ctaLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CTA Link *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="/contacto" data-testid="input-model-cta-link" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormLabel>Características</FormLabel>
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Nueva característica"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    data-testid="input-new-feature"
                  />
                  <Button type="button" onClick={addFeature} variant="outline" data-testid="button-add-feature">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs" data-testid={`feature-${index}`}>
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-1"
                        data-testid={`button-remove-feature-${index}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel>Ventajas</FormLabel>
                <div className="flex gap-2">
                  <Input
                    value={newAdvantage}
                    onChange={(e) => setNewAdvantage(e.target.value)}
                    placeholder="Nueva ventaja"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addAdvantage();
                      }
                    }}
                    data-testid="input-new-advantage"
                  />
                  <Button type="button" onClick={addAdvantage} variant="outline" data-testid="button-add-advantage">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {advantages.map((advantage, index) => (
                    <Badge key={index} variant="secondary" className="text-xs" data-testid={`advantage-${index}`}>
                      {advantage}
                      <button
                        type="button"
                        onClick={() => removeAdvantage(index)}
                        className="ml-1"
                        data-testid={`button-remove-advantage-${index}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <FormLabel>Beneficios</FormLabel>
                <div className="flex gap-2">
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Nuevo beneficio"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addBenefit();
                      }
                    }}
                    data-testid="input-new-benefit"
                  />
                  <Button type="button" onClick={addBenefit} variant="outline" data-testid="button-add-benefit">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="text-xs" data-testid={`benefit-${index}`}>
                      {benefit}
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="ml-1"
                        data-testid={`button-remove-benefit-${index}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-display font-semibold">Precios (Opcional)</h4>
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="pricingSession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio Sesión (€)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            data-testid="input-pricing-session"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pricingBono5"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bono 5 Clases (€)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            data-testid="input-pricing-bono5"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pricingBono10"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bono 10 Clases (€)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                            data-testid="input-pricing-bono10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                          data-testid="input-model-order"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-8">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-published"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Publicado</FormLabel>
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
                    setEditingModel(null);
                    resetForm();
                  }}
                  data-testid="button-cancel"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {editingModel ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
