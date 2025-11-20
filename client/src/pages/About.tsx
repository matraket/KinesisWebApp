import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Lightbulb, Users } from "lucide-react";
import studioImage from "@assets/generated_images/professional_dance_studio_interior.png";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Excelencia Técnica",
      description: "Formación de alta calidad con profesionales reconocidos en el mundo de la danza.",
    },
    {
      icon: Lightbulb,
      title: "Innovación",
      description: "Metodologías actuales que combinan tradición y vanguardia.",
    },
    {
      icon: Heart,
      title: "Inclusión",
      description: "Danza para todos los niveles, edades y objetivos personales.",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Un ecosistema donde bailarines amateur y profesionales crecen juntos.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(5, 7, 20, 0.7), rgba(5, 7, 20, 0.8)), url(${studioImage})`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Quiénes Somos
          </h1>
          <p className="font-body text-lg md:text-xl text-gray-200">
            Más que una escuela de danza, somos una comunidad apasionada
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Nuestra Misión
            </h2>
            <p className="font-body text-lg text-foreground leading-relaxed mb-6">
              En Kinesis, democratizamos la excelencia en la danza. Creemos que el acceso a una formación de alta calidad no debe ser un privilegio, sino un derecho para cualquier persona apasionada por el movimiento.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Desde bailarines profesionales que buscan perfeccionar su técnica hasta familias que quieren introducir a sus hijos en el maravilloso mundo de la danza, todos tienen un lugar en nuestro centro.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Nuestros Valores
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Los pilares que guían cada clase, cada coreografía, cada paso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover-elevate transition-all duration-300"
                data-testid={`card-value-${index}`}
              >
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ecosistema 360º
            </h2>
            <p className="font-body text-lg text-foreground leading-relaxed mb-6">
              Kinesis no es solo un lugar donde tomar clases de danza. Es un ecosistema integral diseñado para que cada persona encuentre su propio camino en el mundo del movimiento.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Combinamos <span className="text-foreground font-semibold">formación profesional</span> de alto nivel para aquellos que buscan una carrera en la danza, <span className="text-foreground font-semibold">clases grupales</span> para quienes disfrutan del baile como hobby, y <span className="text-foreground font-semibold">programas infantiles</span> que fomentan el desarrollo creativo y físico de los más pequeños.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Además, ofrecemos experiencias únicas como nuestra preparación para bodas y eventos especiales, porque creemos que cada momento importante de tu vida merece una coreografía memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            En el corazón de Zaragoza
          </h2>
          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
            Nuestras instalaciones modernas y equipadas están estratégicamente ubicadas en Zaragoza, con fácil acceso y amplio espacio para que cada alumno desarrolle su máximo potencial.
          </p>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <img
              src={studioImage}
              alt="Estudio Kinesis"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
