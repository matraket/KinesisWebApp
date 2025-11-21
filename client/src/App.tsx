import { Switch, Route, useLocation, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import Home from "@/pages/Home";
import About from "@/pages/About";
import BusinessModels from "@/pages/BusinessModels";
import Programs from "@/pages/Programs";
import Team from "@/pages/Team";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import LegalPage from "@/pages/LegalPage";
import NotFound from "@/pages/not-found";

import Login from "@/pages/cms/Login";
import Dashboard from "@/pages/cms/Dashboard";
import ProgramsManager from "@/pages/cms/ProgramsManager";
import InstructorsManager from "@/pages/cms/InstructorsManager";
import LeadsManager from "@/pages/cms/LeadsManager";
import Settings from "@/pages/cms/Settings";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-display text-xl font-bold">Kinesis CMS</h1>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        <nav className="mb-8 flex gap-4 border-b border-border pb-4">
          <Link href="/cms/dashboard">
            <span className="font-body text-sm font-medium hover:text-primary transition-colors" data-testid="link-cms-dashboard">
              Dashboard
            </span>
          </Link>
          <Link href="/cms/programs">
            <span className="font-body text-sm font-medium hover:text-primary transition-colors" data-testid="link-cms-programs">
              Programas
            </span>
          </Link>
          <Link href="/cms/instructors">
            <span className="font-body text-sm font-medium hover:text-primary transition-colors" data-testid="link-cms-instructors">
              Instructores
            </span>
          </Link>
          <Link href="/cms/leads">
            <span className="font-body text-sm font-medium hover:text-primary transition-colors" data-testid="link-cms-leads">
              Leads
            </span>
          </Link>
          <Link href="/cms/settings">
            <span className="font-body text-sm font-medium hover:text-primary transition-colors" data-testid="link-cms-settings">
              Configuración
            </span>
          </Link>
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  const isCMS = location.startsWith("/cms");

  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/">
        <PublicLayout>
          <Home />
        </PublicLayout>
      </Route>
      <Route path="/quienes-somos">
        <PublicLayout>
          <About />
        </PublicLayout>
      </Route>
      <Route path="/modelos">
        <PublicLayout>
          <BusinessModels />
        </PublicLayout>
      </Route>
      <Route path="/programas">
        <PublicLayout>
          <Programs />
        </PublicLayout>
      </Route>
      <Route path="/equipo">
        <PublicLayout>
          <Team />
        </PublicLayout>
      </Route>
      <Route path="/tarifas">
        <PublicLayout>
          <Pricing />
        </PublicLayout>
      </Route>
      <Route path="/contacto">
        <PublicLayout>
          <Contact />
        </PublicLayout>
      </Route>
      <Route path="/faq">
        <PublicLayout>
          <FAQ />
        </PublicLayout>
      </Route>
      <Route path="/legal/:slug">
        <PublicLayout>
          <LegalPage />
        </PublicLayout>
      </Route>

      {/* CMS Login Route */}
      <Route path="/cms/login">
        <Login />
      </Route>

      {/* Protected CMS Routes */}
      <Route path="/cms/dashboard">
        <ProtectedRoute>
          <CMSLayout>
            <Dashboard />
          </CMSLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/cms/programs">
        <ProtectedRoute>
          <CMSLayout>
            <ProgramsManager />
          </CMSLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/cms/instructors">
        <ProtectedRoute>
          <CMSLayout>
            <InstructorsManager />
          </CMSLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/cms/leads">
        <ProtectedRoute>
          <CMSLayout>
            <LeadsManager />
          </CMSLayout>
        </ProtectedRoute>
      </Route>
      <Route path="/cms/settings">
        <ProtectedRoute>
          <CMSLayout>
            <Settings />
          </CMSLayout>
        </ProtectedRoute>
      </Route>

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
