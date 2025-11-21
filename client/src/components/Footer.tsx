import { Link } from "wouter";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-display font-bold text-lg mb-4"><a href="/cms/login">Kinesis</a></h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Centro de danza de referencia en Zaragoza. Democratizamos la excelencia en la danza.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Enlaces</h4>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <Link href="/quienes-somos">
                  <span className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">
                    Quiénes Somos
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/modelos">
                  <span className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-models">
                    Modelos de Negocio
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/programas">
                  <span className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-programs">
                    Programas
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/equipo">
                  <span className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-team">
                    Equipo
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Contacto</h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Calle Ejemplo, 123<br />50001 Zaragoza</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+34976000000" className="hover:text-primary transition-colors">
                  +34 976 000 000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="mailto:info@kinesis.com" className="hover:text-primary transition-colors">
                  info@kinesis.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Síguenos</h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-secondary hover-elevate transition-colors"
                data-testid="link-social-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-secondary hover-elevate transition-colors"
                data-testid="link-social-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-body text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/cms/login">
                <span className="text-muted-foreground" data-testid="link-cms-hidden">
                  Kinesis
                </span>
              </Link>
              . Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="/legal/privacidad">
                <span className="hover:text-primary transition-colors" data-testid="link-footer-privacy">
                  Privacidad
                </span>
              </Link>
              <Link href="/legal/cookies">
                <span className="hover:text-primary transition-colors" data-testid="link-footer-cookies">
                  Cookies
                </span>
              </Link>
              <Link href="/legal/terminos">
                <span className="hover:text-primary transition-colors" data-testid="link-footer-terms">
                  Términos
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
