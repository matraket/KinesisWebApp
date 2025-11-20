import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "wouter";

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faqs = [
    {
      category: "general",
      question: "¿Qué hace diferente a Kinesis de otras escuelas de danza?",
      answer:
        "Kinesis es un ecosistema 360º que combina formación profesional de alto nivel, clases grupales para todos los niveles y programas infantiles. Nuestra filosofía de democratizar la excelencia en la danza nos distingue: creemos que todos merecen acceso a instrucción de calidad, sin importar su nivel o objetivos.",
    },
    {
      category: "general",
      question: "¿Necesito experiencia previa para empezar?",
      answer:
        "¡No! Tenemos programas para todos los niveles. Los grupos de Ritmo Constante Amateur (Raíces Vivas, Street Flow, Pasos de Salón) están diseñados específicamente para personas sin experiencia. Solo los grupos PRO (Clásico y Contemporáneo) requieren una base técnica y prueba de nivel.",
    },
    {
      category: "elite",
      question: "¿Cómo funciona la reserva de clases Élite On Demand?",
      answer:
        "Compras un bono de sesiones (o una sesión suelta) y puedes reservar la hora que mejor te venga (de L-V, 10-13h) a través de nuestro sistema de reservas, sin atarte a un horario fijo. El instructor adapta la sesión 100% a tu nivel y objetivos específicos.",
    },
    {
      category: "elite",
      question: "¿Puedo ir con mi pareja de baile a Élite On Demand?",
      answer:
        "¡Sí! El precio de la sesión privada es por hora de sala e instructor, y es válido tanto para una persona (1 a 1) como para una pareja (semi-privada). Es la opción ideal para preparar competiciones en dúo.",
    },
    {
      category: "ritmo",
      question: "¿Qué pasa si un día no puedo ir a mi clase de Ritmo Constante?",
      answer:
        "Al tratarse de grupos cerrados con una suscripción mensual, las clases a las que no asistas no se pueden recuperar en otros horarios. Mantener los grupos estables es clave para la progresión de todos. Sin embargo, te daremos acceso a un resumen de los pasos clave para que puedas practicar en casa.",
    },
    {
      category: "ritmo",
      question: "¿Necesito pareja para apuntarme a Pasos de Salón?",
      answer:
        "¡Absolutamente no! La mayoría de la gente se apunta sola. Durante la clase, el instructor fomenta la rotación de parejas, así que bailarás con todos. Es la mejor forma de aprender a guiar y a seguir con diferentes personas.",
    },
    {
      category: "generacion",
      question: "¿A partir de qué edad pueden apuntarse los niños a Generación Dance?",
      answer:
        "Nuestro programa Generación Dance está diseñado para niños y niñas de 5 a 12 años. Las clases se dividen en franjas de edad (5-8 años y 9-12 años) para que la pedagogía, la música y el ritmo de la clase sean perfectos para su etapa de desarrollo.",
    },
    {
      category: "generacion",
      question: "Mi hijo/a es muy tímido/a. ¿El baile le ayudará?",
      answer:
        "Es una de las mejores herramientas. Nuestros instructores están especializados en pedagogía infantil. En Generación Dance no solo aprenden a bailar; aprenden a expresarse, a trabajar en equipo y a ganar confianza en sí mismos en un entorno seguro, positivo y, sobre todo, muy divertido.",
    },
    {
      category: "boda",
      question: "¡Socorro! Tenemos dos pies izquierdos. ¿Hay esperanza para nosotros?",
      answer:
        "¡Rotundamente sí! Esta es nuestra especialidad. No esperamos que seáis bailarines. Nuestro trabajo es crear una coreografía que os haga sentir cómodos, que podáis ejecutar con naturalidad y que, sobre todo, disfrutéis. Nos centramos en vuestra conexión, no en pasos imposibles.",
    },
    {
      category: "boda",
      question: "¿Con cuánta antelación deberíamos empezar la preparación de boda?",
      answer:
        "Lo ideal es empezar 2 o 3 meses antes de la boda. Esto nos permite trabajar sin agobios con el Pack Estelar (5 sesiones). Si tenéis menos tiempo, el Pack Básico (3 sesiones) es una solución intensiva para un baile más sencillo.",
    },
    {
      category: "precios",
      question: "¿Hay que pagar matrícula?",
      answer:
        "Sí, los modelos de suscripción (Ritmo Constante y Generación Dance) tienen una única matrícula anual de 30€. Esta matrícula te asegura tu plaza en el grupo, cubre el seguro de accidentes y te da acceso a descuentos especiales en workshops y eventos. Élite On Demand y Sí, Quiero Bailar no requieren matrícula.",
    },
    {
      category: "precios",
      question: "¿Puedo probar una clase antes de comprometerme?",
      answer:
        "Sí, ofrecemos una 'Semana de Puertas Abiertas' al inicio del curso (septiembre). Si te incorporas a mitad de año, puedes solicitar una clase de prueba única, que tendrá un coste de 10€ (que se descuentan de la primera mensualidad si te inscribes).",
    },
  ];

  const categories = [
    { id: "all", label: "Todas" },
    { id: "general", label: "General" },
    { id: "elite", label: "Élite On Demand" },
    { id: "ritmo", label: "Ritmo Constante" },
    { id: "generacion", label: "Generación Dance" },
    { id: "boda", label: "Bodas" },
    { id: "precios", label: "Precios y Pagos" },
  ];

  const filteredFaqs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Preguntas Frecuentes
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Encuentra respuestas a las dudas más comunes sobre nuestros programas y servicios
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                size="sm"
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                data-testid={`button-category-${category.id}`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 hover-elevate transition-all"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="font-display font-semibold text-left hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-lg text-muted-foreground">
                No se encontraron preguntas en esta categoría
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8">
            Contáctanos directamente y resolveremos todas tus dudas
          </p>
          <Link href="/contacto">
            <Button size="lg" data-testid="button-faq-contact">
              Contacta con nosotros
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
