import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Info, Settings } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/quienes-somos", label: "Quiénes Somos" },
    { href: "/modelos", label: "Modelos de Negocio" },
    { href: "/programas", label: "Programas" },
    { href: "/equipo", label: "Equipo" },
    { href: "/tarifas", label: "Horarios y Tarifas" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-foreground">
              Kinesis
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`font-body text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {isAuthenticated && (
                <Link href="/cms/dashboard">
                  <Button variant="outline" size="icon" data-testid="button-nav-cms">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">CMS</span>
                  </Button>
                </Link>
              )}
              <Link href="/contacto">
                <Button size="icon" data-testid="button-nav-cta">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Pide Información</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden flex flex-wrap items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu-toggle"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md font-body text-sm font-medium transition-colors ${
                    location === item.href
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover-elevate"
                  }`}
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            {isAuthenticated && (
              <Link href="/cms/dashboard">
                <Button variant="outline" className="w-full mt-4" data-testid="button-mobile-cms">
                  <Settings className="h-4 w-4 mr-2" />
                  CMS
                </Button>
              </Link>
            )}
            <Link href="/contacto">
              <Button className="w-full mt-4" data-testid="button-mobile-cta">
                Pide Información
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
