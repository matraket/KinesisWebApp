export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="font-display text-4xl font-bold mb-8">Página Legal</h1>
          <p className="font-body text-muted-foreground">
            El contenido legal se cargará dinámicamente desde la base de datos.
          </p>
        </div>
      </div>
    </div>
  );
}
