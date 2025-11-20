import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, FileText, MessageSquare, Calendar, Loader2, AlertCircle } from "lucide-react";
import type { SelectLead, SelectProgram } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function Dashboard() {
  const { data: leads, isLoading: leadsLoading, error: leadsError } = useQuery<SelectLead[]>({
    queryKey: ["/api/leads"],
  });

  const { data: programs, isLoading: programsLoading, error: programsError } = useQuery<SelectProgram[]>({
    queryKey: ["/api/programs"],
  });

  const isLoading = leadsLoading || programsLoading;
  const hasError = leadsError || programsError;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const newLeadsCount = (leads || []).filter(l => l.status === 'new').length;
  const eliteBookingsCount = (leads || []).filter(l => l.type === 'elite_booking').length;
  const preRegistrationsCount = (leads || []).filter(l => l.type === 'pre_registration').length;
  const activePrograms = (programs || []).filter(p => p.published).length;

  const stats = [
    {
      icon: MessageSquare,
      label: "Leads Nuevos",
      value: newLeadsCount.toString(),
      change: "Sin contactar",
      color: "text-primary",
    },
    {
      icon: Calendar,
      label: "Reservas Élite",
      value: eliteBookingsCount.toString(),
      change: "Total",
      color: "text-accent",
    },
    {
      icon: Users,
      label: "Preinscripciones",
      value: preRegistrationsCount.toString(),
      change: "Total",
      color: "text-primary",
    },
    {
      icon: FileText,
      label: "Programas Activos",
      value: activePrograms.toString(),
      change: "Publicados",
      color: "text-accent",
    },
  ];

  const recentLeads = (leads || [])
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const statusLabels: Record<string, string> = {
    new: "Nuevo",
    contacted: "Contactado",
    closed: "Cerrado",
  };

  const typeLabels: Record<string, string> = {
    contact: "Contacto",
    pre_registration: "Preinscripción",
    elite_booking: "Élite",
    wedding: "Boda",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Panel de Control</h1>
        <p className="font-body text-muted-foreground">
          Resumen de actividad de Kinesis
        </p>
      </div>

      {hasError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Algunos datos no pudieron cargarse. Los estadísticas mostradas pueden estar incompletas.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-elevate transition-all" data-testid={`stat-card-${index}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-primary/10 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
                <p className="font-display text-3xl font-bold">{stat.value}</p>
                <p className="font-body text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <h2 className="font-display text-xl font-bold">Leads Recientes</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover-elevate transition-all"
                data-testid={`lead-item-${lead.id}`}
              >
                <div className="flex-1">
                  <p className="font-body font-semibold">{lead.name}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {typeLabels[lead.type]}
                    </Badge>
                    <Badge
                      variant={lead.status === "new" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {statusLabels[lead.status]}
                    </Badge>
                  </div>
                </div>
                <p className="font-body text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true, locale: es })}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
