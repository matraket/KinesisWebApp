import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SelectLegalPage } from "@shared/schema";

export default function LegalPage() {
  const [, params] = useRoute("/legal/:slug");
  const slug = params?.slug;

  const { data: legalPage, isLoading, error, refetch } = useQuery<SelectLegalPage>({
    queryKey: [`/api/legal/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" data-testid="loader-legal-page" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <p className="text-muted-foreground text-center" data-testid="text-error-legal">
          Error al cargar la página legal. Por favor, inténtalo más tarde.
        </p>
        <Button onClick={() => refetch()} variant="outline" data-testid="button-retry-legal">
          Reintentar
        </Button>
      </div>
    );
  }

  if (!legalPage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <p className="text-muted-foreground text-center" data-testid="text-not-found-legal">
          Página legal no encontrada.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="font-display text-4xl font-bold mb-8" data-testid="heading-legal-title">
            {legalPage.title}
          </h1>
          <div 
            className="font-body text-foreground leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: legalPage.content }}
            data-testid="content-legal"
          />
        </div>
      </div>
    </div>
  );
}
