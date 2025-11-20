import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="font-display text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-display text-3xl font-bold mb-4">Página no encontrada</h2>
        <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link href="/">
          <Button size="lg" data-testid="button-home">
            <Home className="mr-2 h-5 w-5" />
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
