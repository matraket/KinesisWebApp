import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold" data-testid="text-app-title">Kinesis</h1>
          </div>
          <Button asChild data-testid="button-login">
            <a href="/api/login">
              Sign In
            </a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight" data-testid="text-hero-title">
                Manage Your Sports Academy with Ease
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl" data-testid="text-hero-description">
                A comprehensive platform for managing programs, instructors, schedules, and leads for your sports academy.
              </p>
              <Button size="lg" asChild data-testid="button-get-started">
                <a href="/api/login" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <Card data-testid="card-feature-1">
                <CardHeader>
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure Authentication</CardTitle>
                  <CardDescription>
                    Sign in securely with multiple providers including Google, GitHub, and email.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card data-testid="card-feature-2">
                <CardHeader>
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Powerful CMS</CardTitle>
                  <CardDescription>
                    Manage programs, instructors, schedules, and content with an intuitive interface.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card data-testid="card-feature-3">
                <CardHeader>
                  <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Lead Management</CardTitle>
                  <CardDescription>
                    Track and manage inquiries, pre-registrations, and bookings in one place.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold" data-testid="text-cta-title">Ready to get started?</h3>
              <p className="text-lg text-muted-foreground" data-testid="text-cta-description">
                Sign in now to access your academy management dashboard.
              </p>
              <Button size="lg" asChild data-testid="button-cta">
                <a href="/api/login">
                  Sign In Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p data-testid="text-footer">© 2025 Kinesis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
