import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, MessageSquare, Calendar } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      icon: MessageSquare,
      label: "Leads Nuevos",
      value: "12",
      change: "+3 esta semana",
      color: "text-primary",
    },
    {
      icon: Calendar,
      label: "Reservas Élite",
      value: "8",
      change: "Esta semana",
      color: "text-accent",
    },
    {
      icon: Users,
      label: "Preinscripciones",
      value: "5",
      change: "+2 este mes",
      color: "text-primary",
    },
    {
      icon: FileText,
      label: "Programas Activos",
      value: "10",
      change: "Publicados",
      color: "text-accent",
    },
  ];

  const recentLeads = [
    { id: 1, name: "María García", type: "pre_registration", status: "new", date: "Hace 2 horas" },
    { id: 2, name: "Carlos Ruiz", type: "elite_booking", status: "contacted", date: "Hace 5 horas" },
    { id: 3, name: "Ana López", type: "contact", status: "new", date: "Hace 1 día" },
    { id: 4, name: "Pedro Martín", type: "wedding", status: "contacted", date: "Hace 2 días" },
  ];

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
                <p className="font-body text-sm text-muted-foreground">{lead.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
