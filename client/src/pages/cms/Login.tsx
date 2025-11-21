import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

export default function Login() {
  const [secret, setSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/cms/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!secret.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa la contraseña",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(secret);
      
      if (success) {
        toast({
          title: "Acceso concedido",
          description: "Bienvenido al CMS de Kinesis",
        });
        setLocation("/cms/dashboard");
      } else {
        toast({
          title: "Acceso denegado",
          description: "Contraseña incorrecta",
          variant: "destructive",
        });
        setSecret("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al intentar iniciar sesión",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="font-display text-3xl">Kinesis CMS</CardTitle>
          <CardDescription className="font-body text-base">
            Ingresa la contraseña de administrador para acceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="secret" className="font-body font-medium">
                Contraseña
              </Label>
              <Input
                id="secret"
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Ingresa tu contraseña"
                disabled={isLoading}
                autoFocus
                data-testid="input-admin-secret"
                className="font-body"
              />
            </div>
            <Button
              type="submit"
              className="w-full font-body font-semibold"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? "Verificando..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
