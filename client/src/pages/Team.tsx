import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import femaleInstructorImage from "@assets/generated_images/female_ballet_instructor_portrait.png";
import maleInstructorImage from "@assets/generated_images/male_contemporary_instructor_portrait.png";

export default function Team() {
  const instructors = [
    {
      id: 1,
      name: "Elena Herrero",
      role: "Directora Artística y Profesora de Clásico",
      quote: "La técnica es la base, pero la pasión es el alma.",
      bio: "Bailarina profesional formada en la RCPD de Madrid. Solista del Ballet Nacional durante 15 años. Profesora de Ballet Clásico en Kinesis, especializada en técnica de puntas y variaciones.",
      photo: femaleInstructorImage,
      specialties: ["Ballet Clásico", "Élite On Demand"],
      featured: true,
    },
    {
      id: 2,
      name: "Pablo Rivas",
      role: "Profesor de Contemporáneo",
      quote: "El movimiento es un lenguaje. Yo te enseño a hablarlo con fluidez.",
      bio: "Bailarín contemporáneo formado en Amsterdam y Londres. Ha trabajado con compañías de prestigio internacional. Experto en técnicas Cunningham, Release y Floor Work.",
      photo: maleInstructorImage,
      specialties: ["Contemporáneo", "Élite On Demand"],
      featured: true,
    },
    {
      id: 3,
      name: "Sofía Martín",
      role: "Profesora de Clásico y Contemporáneo",
      quote: "Cada alumno tiene su propio ritmo. Mi trabajo es ayudarte a encontrarlo.",
      bio: "Formación en la Real Escuela Superior de Arte Dramático. Especialista en danza-teatro y fusión clásico-contemporáneo. Profesora en Ritmo Constante PRO.",
      photo: femaleInstructorImage,
      specialties: ["Clásico", "Contemporáneo", "Ritmo Constante PRO"],
      featured: false,
    },
    {
      id: 4,
      name: "Diego Montes",
      role: "Profesor de Hip Hop y Urbano",
      quote: "El Hip Hop es actitud, es cultura, es libertad. Ven y descúbrela.",
      bio: "B-boy con más de 20 años de experiencia en la escena urbana. Campeón regional de Breaking. Especialista en Popping, Locking y House. Titular de Street Flow.",
      photo: maleInstructorImage,
      specialties: ["Hip Hop", "Street Flow", "Élite On Demand"],
      featured: false,
    },
    {
      id: 5,
      name: "Miguel Artigas",
      role: "Profesor de Folclore",
      quote: "Para saber a dónde vas, tienes que saber de dónde vienes.",
      bio: "Miembro fundador del Grupo Folclórico Aires del Moncayo. Investigador y experto en danzas tradicionales de la península. Alma de Raíces Vivas.",
      photo: maleInstructorImage,
      specialties: ["Folclore", "Raíces Vivas"],
      featured: false,
    },
    {
      id: 6,
      name: "Isabel Gascón",
      role: "Profesora de Folclore",
      quote: "Cada paso de folclore es una historia que contamos con el cuerpo.",
      bio: "Instructora de danzas regionales con más de 25 años de experiencia. Especialista en castañuelas y pandereta. Profesora de Sevillanas y Aurresku.",
      photo: femaleInstructorImage,
      specialties: ["Folclore", "Raíces Vivas"],
      featured: false,
    },
    {
      id: 7,
      name: "Javier Alonso",
      role: "Maestro de Jota Aragonesa",
      quote: "La Jota no se baila, se siente. Es fuerza, es nobleza.",
      bio: "Ganador del Certamen Oficial de Jota Aragonesa (Premio Ordinario) en 1993 y 1995. Formador de campeones de Aragón. Especialista en Jota de competición.",
      photo: maleInstructorImage,
      specialties: ["Jota Aragonesa", "Élite On Demand"],
      featured: false,
    },
    {
      id: 8,
      name: "Begoña Ferrer",
      role: "Maestra de Jota Aragonesa",
      quote: "El brío de la Jota es la alegría de nuestra tierra.",
      bio: "Ganadora del Certamen Oficial de Jota Aragonesa (Premio Extraordinario) en 1996. Especialista en técnica de castañuela y estilo femenino de la Jota.",
      photo: femaleInstructorImage,
      specialties: ["Jota Aragonesa", "Élite On Demand"],
      featured: false,
    },
    {
      id: 9,
      name: "Lucía Sanz",
      role: "Instructora de Extraescolares",
      quote: "¡El baile es el superpoder que todos los niños tienen!",
      bio: "Antigua alumna de Elena Herrero. Cursando Grado en Educación Infantil. Especialista en Zumba Kids y Jazz Infantil. La cantera de Kinesis.",
      photo: femaleInstructorImage,
      specialties: ["Generación Dance", "Zumba Kids", "Jazz Infantil"],
      featured: false,
    },
  ];

  const featuredInstructors = instructors.filter((i) => i.featured);
  const regularInstructors = instructors.filter((i) => !i.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Nuestro Equipo
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Profesionales de élite apasionados por la enseñanza. Conoce a los maestros que te guiarán en tu viaje.
          </p>
        </div>
      </section>

      {/* Featured Instructors */}
      {featuredInstructors.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Dirección Artística
              </h2>
              <p className="font-body text-lg text-muted-foreground">
                Las figuras clave que lideran el proyecto Kinesis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {featuredInstructors.map((instructor) => (
                <Card
                  key={instructor.id}
                  className="overflow-hidden hover-elevate transition-all duration-300"
                  data-testid={`card-featured-instructor-${instructor.id}`}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={instructor.photo}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-display text-2xl font-bold text-white mb-1">
                        {instructor.name}
                      </h3>
                      <p className="font-body text-sm text-gray-200">{instructor.role}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {instructor.quote && (
                      <blockquote className="italic text-muted-foreground mb-4 font-body text-sm border-l-2 border-primary pl-4">
                        "{instructor.quote}"
                      </blockquote>
                    )}
                    <p className="font-body text-sm text-foreground leading-relaxed mb-4">
                      {instructor.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Instructors */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Equipo Docente
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Especialistas en cada disciplina con años de experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularInstructors.map((instructor) => (
              <Card
                key={instructor.id}
                className="overflow-hidden hover-elevate transition-all duration-300"
                data-testid={`card-instructor-${instructor.id}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={instructor.photo}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      {instructor.name}
                    </h3>
                    <p className="font-body text-xs text-gray-200">{instructor.role}</p>
                  </div>
                </div>

                <CardContent className="p-5">
                  {instructor.quote && (
                    <blockquote className="italic text-muted-foreground mb-3 font-body text-xs border-l-2 border-primary pl-3">
                      "{instructor.quote}"
                    </blockquote>
                  )}
                  <p className="font-body text-sm text-foreground leading-relaxed mb-4">
                    {instructor.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
