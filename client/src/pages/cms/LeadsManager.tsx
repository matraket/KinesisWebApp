import { useState } from "react";
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
import { MessageSquare, Calendar, Heart, Mail, Eye } from "lucide-react";

export default function LeadsManager() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const leads = [
    {
      id: 1,
      name: "María García Pérez",
      email: "maria@example.com",
      phone: "+34 666 111 222",
      type: "pre_registration",
      status: "new",
      program: "Ballet Infantil (5-8 años)",
      date: "2024-01-15",
      message: "Interesada en apuntar a mi hija de 6 años. ¿Cuándo empiezan las clases?",
    },
    {
      id: 2,
      name: "Carlos Ruiz Sánchez",
      email: "carlos@example.com",
      phone: "+34 666 222 333",
      type: "elite_booking",
      status: "contacted",
      program: "Contemporáneo",
      date: "2024-01-14",
      message: "Necesito preparar una audición en febrero. ¿Disponibilidad?",
    },
    {
      id: 3,
      name: "Ana López Martín",
      email: "ana@example.com",
      phone: "+34 666 333 444",
      type: "contact",
      status: "new",
      date: "2024-01-13",
      message: "¿Ofrecen clases de Sevillanas para principiantes?",
    },
    {
      id: 4,
      name: "Pedro Martín González",
      email: "pedro@example.com",
      phone: "+34 666 444 555",
      type: "wedding",
      status: "contacted",
      date: "2024-01-12",
      message: "Boda en junio. Queremos hacer un vals y una sorpresa con amigos.",
    },
    {
      id: 5,
      name: "Laura Fernández",
      email: "laura@example.com",
      phone: "+34 666 555 666",
      type: "pre_registration",
      status: "closed",
      program: "Hip Hop Kids (9-12 años)",
      date: "2024-01-10",
      message: "Mi hijo quiere aprender Hip Hop. Info por favor.",
    },
  ];

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

      {/* Filters */}
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

      {/* Leads List */}
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
                      <p className="text-muted-foreground">
                        <span className="font-medium">Teléfono:</span> {lead.phone}
                      </p>
                      {lead.program && (
                        <p className="text-muted-foreground">
                          <span className="font-medium">Programa:</span> {lead.program}
                        </p>
                      )}
                      <p className="text-muted-foreground">
                        <span className="font-medium">Fecha:</span> {new Date(lead.date).toLocaleDateString('es-ES')}
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
                    <Button size="sm" variant="outline" data-testid={`button-view-${lead.id}`}>
                      <Eye className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">Ver</span>
                    </Button>
                    <Select defaultValue={lead.status}>
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
