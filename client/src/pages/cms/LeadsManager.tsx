import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Calendar, Heart, Mail, Eye, Loader2, AlertCircle } from "lucide-react";
import type { SelectLead } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function LeadsManager() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { toast } = useToast();

  const { data: allLeads, isLoading, error, refetch } = useQuery<SelectLead[]>({
    queryKey: ["/api/leads"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PUT", `/api/leads/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({ title: "Estado actualizado", description: "El estado del lead se ha actualizado correctamente" });
    },
    onError: () => {
      toast({ title: "Error", description: "No se pudo actualizar el estado", variant: "destructive" });
    },
  });

  const typeIcons: Record<string, any> = {
    contact: MessageSquare,
    pre_registration: Calendar,
    elite_booking: Mail,
    wedding: Heart,
  };

  const typeLabels: Record<string, string> = {
    contact: "Contacto General",
    pre_registration: "Preinscripción",
    elite_booking: "Élite On Demand",
    wedding: "Boda/Evento",
  };

  const statusLabels: Record<string, string> = {
    new: "Nuevo",
    contacted: "Contactado",
    closed: "Cerrado",
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
        <p className="text-muted-foreground text-center">Error al cargar los leads</p>
        <Button onClick={() => refetch()} variant="outline">
          Reintentar
        </Button>
      </div>
    );
  }

  const leads = allLeads || [];
  
  const filteredLeads = leads.filter((lead) => {
    const statusMatch = statusFilter === "all" || lead.status === statusFilter;
    const typeMatch = typeFilter === "all" || lead.type === typeFilter;
    return statusMatch && typeMatch;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Gestión de Leads</h1>
        <p className="font-body text-muted-foreground">
          Administra y responde a los formularios de contacto
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="font-body text-sm font-medium mb-2 block">Estado</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger data-testid="select-status-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="new">Nuevos</SelectItem>
                  <SelectItem value="contacted">Contactados</SelectItem>
                  <SelectItem value="closed">Cerrados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="font-body text-sm font-medium mb-2 block">Tipo</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger data-testid="select-type-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="contact">Contacto</SelectItem>
                  <SelectItem value="pre_registration">Preinscripción</SelectItem>
                  <SelectItem value="elite_booking">Élite</SelectItem>
                  <SelectItem value="wedding">Boda</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <p className="font-body text-sm text-muted-foreground">
          {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""} encontrado{filteredLeads.length !== 1 ? "s" : ""}
        </p>

        {filteredLeads.map((lead) => {
          const Icon = typeIcons[lead.type];
          return (
            <Card key={lead.id} className="hover-elevate transition-all" data-testid={`lead-card-${lead.id}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg font-bold">{lead.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[lead.type]}
                          </Badge>
                          <Badge
                            variant={lead.status === "new" ? "default" : lead.status === "contacted" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {statusLabels[lead.status]}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="pl-11 space-y-1 font-body text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">Email:</span> {lead.email}
                      </p>
                      {lead.phone && (
                        <p className="text-muted-foreground">
                          <span className="font-medium">Teléfono:</span> {lead.phone}
                        </p>
                      )}
                      <p className="text-muted-foreground">
                        <span className="font-medium">Fecha:</span> {new Date(lead.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>

                    {lead.message && (
                      <div className="pl-11 mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="font-body text-sm text-foreground leading-relaxed">
                          {lead.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-2 md:items-end">
                    <Select 
                      value={lead.status} 
                      onValueChange={(value) => updateStatusMutation.mutate({ id: lead.id, status: value })}
                    >
                      <SelectTrigger className="w-full md:w-[140px]" data-testid={`select-status-${lead.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Nuevo</SelectItem>
                        <SelectItem value="contacted">Contactado</SelectItem>
                        <SelectItem value="closed">Cerrado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredLeads.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="font-body text-lg text-muted-foreground">
                No se encontraron leads con los filtros seleccionados
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
