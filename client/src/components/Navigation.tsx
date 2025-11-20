import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link href="/contacto">
              <Button size="sm" className="ml-2" data-testid="button-nav-cta">
                Pide Información
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2"
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
