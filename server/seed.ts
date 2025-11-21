import { db } from "./db";
import {
  businessModels,
  programs,
  instructors,
  pricingTiers,
  scheduleSlots,
  faqs,
  legalPages,
} from "@shared/schema";

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Seed Business Models
    console.log("📦 Seeding business models...");
    const [eliteModel, ritmoModel, generacionModel, bodaModel] = await db
      .insert(businessModels)
      .values([
        {
          name: "Élite On Demand",
          slug: "elite-on-demand",
          tagline: "Tecnificación a tu medida",
          description:
            "Clases privadas o semi-privadas diseñadas para bailarines que buscan perfeccionar su técnica con profesionales de élite. Máxima flexibilidad: reserva cuando lo necesites.",
          features: [
            "Clases 100% personalizadas",
            "Profesores especializados de élite",
            "Horario flexible (L-V, 10-13h)",
            "Válido para parejas de baile",
            "Sin compromisos de permanencia",
          ],
          advantages: [
            "Progreso técnico acelerado",
            "Feedback personalizado inmediato",
            "Preparación para audiciones",
            "Corrección de vicios técnicos",
          ],
          benefits: [
            "Alcanza tu máximo potencial como bailarín",
            "Confianza y seguridad escénica",
            "Resultados visibles en pocas sesiones",
          ],
          imageUrl: "/assets/elite_private_coaching_session.png",
          iconName: "Sparkles",
          order: 1,
          published: true,
        },
        {
          name: "Ritmo Constante",
          slug: "ritmo-constante",
          tagline: "Constancia que transforma",
          description:
            "Suscripciones mensuales a clases grupales regulares. La constancia es clave para el progreso. Encuentra tu estilo, crece con tu grupo y convierte la danza en tu rutina semanal.",
          features: [
            "Clases grupales regulares",
            "2 o 4 horas semanales",
            "Niveles diferenciados (PRO/Amateur)",
            "Grupo estable, progreso colectivo",
            "Matrícula anual de 30€",
          ],
          advantages: [
            "Comunidad de aprendizaje",
            "Compromiso de largo plazo",
            "Evolución técnica progresiva",
            "Flexibilidad en estilos (Clásico, Contemporáneo, Folclore...)",
          ],
          benefits: [
            "Convierte la danza en tu estilo de vida",
            "Red social alrededor de la danza",
            "Alcanza objetivos sostenidos",
          ],
          imageUrl: "/assets/group_dance_class_energy.png",
          iconName: "TrendingUp",
          order: 2,
          published: true,
        },
        {
          name: "Generación Dance",
          slug: "generacion-dance",
          tagline: "La cantera del futuro",
          description:
            "Programas infantiles y juveniles enfocados en formación técnica y diversión. La combinación perfecta para desarrollar habilidades motoras, creatividad y disciplina desde edades tempranas.",
          features: [
            "Clases extraescolares (conciliación familiar)",
            "Ballet, Jazz, Hip Hop, Zumba Kids",
            "Grupos por edades (5-8, 9-12, 13-17)",
            "Preparación para exámenes y certámenes",
            "Shows y actuaciones escolares",
          ],
          advantages: [
            "Desarrollo integral del niño/adolescente",
            "Fomenta disciplina y trabajo en equipo",
            "Ambiente seguro y lúdico",
            "Opción de federarse (deportivo)",
          ],
          benefits: [
            "Forma la próxima generación de bailarines",
            "Potencia la autoestima y expresión",
            "Conciliación familiar",
          ],
          imageUrl: "/assets/children's_dance_class_joy.png",
          iconName: "Heart",
          order: 3,
          published: true,
        },
        {
          name: "Sí, Quiero Bailar",
          slug: "si-quiero-bailar",
          tagline: "Tu momento WOW",
          description:
            "Coreografía personalizada para bodas y eventos especiales. Desde el vals nupcial hasta sorpresas grupales con amigos. Haz brillar tu momento especial con una coreografía única.",
          features: [
            "Vals nupcial personalizado",
            "Sorpresas coreográficas (flash mob, baile de amigos)",
            "Profesores especializados en eventos",
            "Clases privadas o grupales",
            "Ensayos flexibles según tu agenda",
          ],
          advantages: [
            "Momento único e inolvidable",
            "Personalizado a tu estilo y canción",
            "Profesionalidad y discreción",
            "Estrés zero, solo diversión",
          ],
          benefits: [
            "Memorias que duran para siempre",
            "Confianza para brillar en el gran día",
            "Sorprende a tu pareja e invitados",
          ],
          imageUrl: "/assets/wedding_couple_first_dance.png",
          iconName: "Users",
          order: 4,
          published: true,
        },
      ])
      .returning();

    console.log(`✅ Created ${[eliteModel, ritmoModel, generacionModel, bodaModel].length} business models`);

    // Seed Programs
    console.log("📚 Seeding programs...");
    await db.insert(programs).values([
      {
        name: "Ballet Clásico Profesional",
        slug: "ballet-clasico-pro",
        level: "professional",
        ageGroup: "adult",
        description:
          "Formación rigurosa en técnica clásica para bailarines avanzados. Incluye barra, centro, diagonal y variaciones.",
        weeklyHours: 4,
        businessModelId: ritmoModel.id,
        imageUrl: "/assets/generated_images/ballet_dancer_graceful_pose.png",
        published: true,
      },
      {
        name: "Contemporáneo Avanzado",
        slug: "contemporaneo-avanzado",
        level: "advanced",
        ageGroup: "adult",
        description:
          "Exploración del movimiento contemporáneo con énfasis en técnicas de release, floor work y composición coreográfica.",
        weeklyHours: 4,
        businessModelId: ritmoModel.id,
        imageUrl: "/assets/generated_images/ballet_dancer_graceful_pose.png",
        published: true,
      },
      {
        name: "Street Flow (Hip Hop y Urbano)",
        slug: "street-flow",
        level: "beginner",
        ageGroup: "all_ages",
        description:
          "Hip Hop, Popping, Locking y estilos urbanos actuales. Para todos los niveles, desde iniciación hasta avanzado.",
        weeklyHours: 2,
        businessModelId: ritmoModel.id,
        imageUrl: "/assets/generated_images/hip_hop_dancer_street_style.png",
        published: true,
      },
      {
        name: "Ballet Infantil (5-8 años)",
        slug: "ballet-infantil-5-8",
        level: "beginner",
        ageGroup: "children",
        description:
          "Introducción lúdica al ballet para los más pequeños. Desarrollo de coordinación, postura y expresión.",
        weeklyHours: 2,
        businessModelId: generacionModel.id,
        imageUrl: "/assets/generated_images/children's_dance_class_joy.png",
        published: true,
      },
      {
        name: "Hip Hop Kids (9-12 años)",
        slug: "hip-hop-kids-9-12",
        level: "beginner",
        ageGroup: "children",
        description:
          "Energía, actitud y diversión. Hip Hop adaptado a niños de primaria con coreografías actuales.",
        weeklyHours: 2,
        businessModelId: generacionModel.id,
        imageUrl: "/assets/generated_images/hip_hop_dancer_street_style.png",
        published: true,
      },
      {
        name: "Raíces Vivas (Folclore)",
        slug: "raices-vivas-folclore",
        level: "beginner",
        ageGroup: "adult",
        description:
          "Sevillanas, Muñeira, Fandango y otras danzas tradicionales. Recuperación y celebración de nuestras raíces.",
        weeklyHours: 2,
        businessModelId: ritmoModel.id,
        imageUrl: "/assets/generated_images/ballet_dancer_graceful_pose.png",
        published: true,
      },
      {
        name: "Jota Aragonesa",
        slug: "jota-aragonesa",
        level: "intermediate",
        ageGroup: "all_ages",
        description:
          "Jota de competición y tradicional. Impartida por maestros galardonados del Certamen Oficial de Jota.",
        weeklyHours: 2,
        businessModelId: ritmoModel.id,
        imageUrl: "/assets/generated_images/ballet_dancer_graceful_pose.png",
        published: true,
      },
    ]);

    console.log("✅ Created programs");

    // Seed Instructors
    console.log("👥 Seeding instructors...");
    await db.insert(instructors).values([
      {
        name: "Elena Herrero",
        role: "Directora Artística y Profesora de Clásico",
        quote: "La técnica es la base, pero la pasión es el alma.",
        bio: "Bailarina profesional formada en la RCPD de Madrid. Solista del Ballet Nacional durante 15 años. Profesora de Ballet Clásico en Kinesis, especializada en técnica de puntas y variaciones.",
        photoUrl: "/assets/generated_images/female_instructor_professional_portrait.png",
        featured: true,
        order: 1,
        published: true,
      },
      {
        name: "Pablo Rivas",
        role: "Profesor de Contemporáneo",
        quote: "El movimiento es un lenguaje. Yo te enseño a hablarlo con fluidez.",
        bio: "Bailarín contemporáneo formado en Amsterdam y Londres. Ha trabajado con compañías de prestigio internacional. Experto en técnicas Cunningham, Release y Floor Work.",
        photoUrl: "/assets/generated_images/male_instructor_contemporary_portrait.png",
        featured: true,
        order: 2,
        published: true,
      },
      {
        name: "Diego Montes",
        role: "Profesor de Hip Hop y Urbano",
        quote: "El Hip Hop es actitud, es cultura, es libertad. Ven y descúbrela.",
        bio: "B-boy con más de 20 años de experiencia en la escena urbana. Campeón regional de Breaking. Especialista en Popping, Locking y House.",
        photoUrl: "/assets/generated_images/male_instructor_contemporary_portrait.png",
        featured: false,
        order: 3,
        published: true,
      },
      {
        name: "Lucía Sanz",
        role: "Instructora de Extraescolares",
        quote: "Los niños son pura energía y creatividad. Mi misión es canalizarla.",
        bio: "Especialista en pedagogía infantil aplicada a la danza. Monitora de Zumba Kids certificada. Responsable de todos los programas de Generación Dance.",
        photoUrl: "/assets/generated_images/female_instructor_professional_portrait.png",
        featured: false,
        order: 4,
        published: true,
      },
    ]);

    console.log("✅ Created instructors");

    // Seed Pricing Tiers
    console.log("💰 Seeding pricing tiers...");
    await db.insert(pricingTiers).values([
      {
        businessModelId: eliteModel.id,
        name: "Sesión Única",
        priceAmount: 45,
        billingPeriod: "sesión",
        features: ["1 hora de clase privada", "Feedback personalizado", "Sin compromiso"],
        order: 1,
        published: true,
      },
      {
        businessModelId: eliteModel.id,
        name: "Bono 5 Sesiones",
        priceAmount: 200,
        billingPeriod: "bono",
        features: ["5 horas de clases", "Ahorro de 25€", "Válido 3 meses"],
        highlighted: true,
        order: 2,
        published: true,
      },
      {
        businessModelId: eliteModel.id,
        name: "Bono 10 Sesiones",
        priceAmount: 380,
        billingPeriod: "bono",
        features: ["10 horas de clases", "Ahorro de 70€", "Válido 6 meses"],
        order: 3,
        published: true,
      },
      {
        businessModelId: ritmoModel.id,
        name: "Suscripción PRO",
        priceAmount: 95,
        billingPeriod: "mes",
        features: ["4 horas/semana", "Clásico + Contemporáneo", "Matrícula 30€/año"],
        highlighted: true,
        order: 1,
        published: true,
      },
      {
        businessModelId: ritmoModel.id,
        name: "Suscripción Amateur",
        priceAmount: 65,
        billingPeriod: "mes",
        features: ["2 horas/semana", "Folclore, Urbano o Salón", "Matrícula 30€/año"],
        order: 2,
        published: true,
      },
      {
        businessModelId: generacionModel.id,
        name: "Mensualidad Infantil",
        priceAmount: 45,
        billingPeriod: "mes",
        features: ["2 horas/semana", "1 disciplina a elegir", "Matrícula 25€/año"],
        order: 1,
        published: true,
      },
      {
        businessModelId: bodaModel.id,
        name: "Pack Vals Nupcial",
        priceAmount: 250,
        billingPeriod: "pack",
        features: ["5 sesiones privadas", "Coreografía personalizada", "Ensayo final en sala"],
        highlighted: true,
        order: 1,
        published: true,
      },
    ]);

    console.log("✅ Created pricing tiers");

    // Seed Schedule Slots
    console.log("📅 Seeding schedule slots...");
    await db.insert(scheduleSlots).values([
      { dayOfWeek: "monday", startTime: "17:00", endTime: "18:00", room: "Sala A", published: true },
      { dayOfWeek: "monday", startTime: "18:00", endTime: "19:00", room: "Sala A", published: true },
      { dayOfWeek: "monday", startTime: "19:00", endTime: "20:00", room: "Sala A", published: true },
      { dayOfWeek: "monday", startTime: "20:00", endTime: "21:00", room: "Sala A", published: true },
      { dayOfWeek: "tuesday", startTime: "17:00", endTime: "18:00", room: "Sala A", published: true },
      { dayOfWeek: "tuesday", startTime: "19:00", endTime: "20:00", room: "Sala A", published: true },
      { dayOfWeek: "tuesday", startTime: "20:00", endTime: "21:00", room: "Sala A", published: true },
      { dayOfWeek: "wednesday", startTime: "10:00", endTime: "13:00", room: "Todas", published: true },
      { dayOfWeek: "wednesday", startTime: "19:00", endTime: "20:00", room: "Sala A", published: true },
      { dayOfWeek: "wednesday", startTime: "20:00", endTime: "21:00", room: "Sala A", published: true },
      { dayOfWeek: "thursday", startTime: "17:00", endTime: "18:00", room: "Sala A", published: true },
      { dayOfWeek: "thursday", startTime: "19:00", endTime: "20:00", room: "Sala A", published: true },
      { dayOfWeek: "thursday", startTime: "20:00", endTime: "21:00", room: "Sala A", published: true },
      { dayOfWeek: "friday", startTime: "10:00", endTime: "13:00", room: "Todas", published: true },
      { dayOfWeek: "friday", startTime: "19:00", endTime: "20:00", room: "Sala A", published: true },
      { dayOfWeek: "friday", startTime: "20:00", endTime: "21:00", room: "Sala A", published: true },
    ]);

    console.log("✅ Created schedule slots");

    // Seed FAQs
    console.log("❓ Seeding FAQs...");
    await db.insert(faqs).values([
      {
        category: "general",
        question: "¿Necesito experiencia previa para apuntarme?",
        answer:
          "Depende del programa. Tenemos opciones para todos los niveles: desde principiantes absolutos (Generación Dance, Street Flow, Raíces Vivas) hasta bailarines profesionales (Élite On Demand, Ritmo Constante PRO). En cada programa indicamos el nivel recomendado.",
        order: 1,
        published: true,
      },
      {
        category: "general",
        question: "¿Cuánto cuesta la matrícula?",
        answer:
          "La matrícula anual es de 30€ para adultos (Ritmo Constante) y 25€ para niños (Generación Dance). Élite On Demand y Sí Quiero Bailar no requieren matrícula, solo pagas por las sesiones que contratas.",
        order: 2,
        published: true,
      },
      {
        category: "elite",
        question: "¿Cómo reservo una sesión de Élite On Demand?",
        answer:
          "Contacta con nosotros a través del formulario de reserva, llama al teléfono de la escuela, o escribe a nuestro email. Te asignaremos el profesor más adecuado según tu disciplina y coordinaremos horarios según tu disponibilidad.",
        order: 3,
        published: true,
      },
      {
        category: "ritmo_constante",
        question: "¿Puedo cambiar de programa dentro de Ritmo Constante?",
        answer:
          "Sí, puedes cambiar de programa al finalizar cada mes. Simplemente avísanos con antelación y te reubicaremos en el grupo que prefieras (si hay plazas disponibles).",
        order: 4,
        published: true,
      },
      {
        category: "generacion",
        question: "¿Los niños necesitan ropa especial?",
        answer:
          "Para las primeras clases, ropa cómoda y deportiva es suficiente (mallas, camiseta, zapatillas limpias). Una vez el niño decida continuar, te indicaremos el vestuario específico de cada disciplina (zapatillas de ballet, ropa de hip hop, etc.).",
        order: 5,
        published: true,
      },
    ]);

    console.log("✅ Created FAQs");

    // Seed Legal Pages
    console.log("📄 Seeding legal pages...");
    await db.insert(legalPages).values([
      {
        slug: "privacidad",
        title: "Política de Privacidad",
        content: `
          <h2>1. Información General</h2>
          <p>En Kinesis, nos comprometemos a proteger la privacidad de nuestros usuarios. Esta política describe cómo recopilamos, usamos y protegemos su información personal.</p>
          
          <h2>2. Datos que Recopilamos</h2>
          <p>Recopilamos información que usted nos proporciona directamente, como:</p>
          <ul>
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Información de inscripción a programas</li>
          </ul>
          
          <h2>3. Uso de la Información</h2>
          <p>Utilizamos su información para:</p>
          <ul>
            <li>Gestionar su inscripción en nuestros programas</li>
            <li>Comunicarnos con usted sobre clases y eventos</li>
            <li>Mejorar nuestros servicios</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>
          
          <h2>4. Protección de Datos</h2>
          <p>Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, pérdida o alteración.</p>
          
          <h2>5. Sus Derechos</h2>
          <p>Tiene derecho a acceder, rectificar, cancelar y oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contáctenos en info@kinesis.com.</p>
          
          <h2>6. Contacto</h2>
          <p>Para cualquier consulta sobre esta política de privacidad, puede contactarnos en info@kinesis.com o en nuestra dirección: Calle Ejemplo, 123, 50001 Zaragoza.</p>
        `,
        published: true,
      },
      {
        slug: "cookies",
        title: "Política de Cookies",
        content: `
          <h2>1. ¿Qué son las Cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a mejorar su experiencia de navegación.</p>
          
          <h2>2. Tipos de Cookies que Utilizamos</h2>
          <h3>Cookies Esenciales</h3>
          <p>Necesarias para el funcionamiento básico del sitio web. No se pueden desactivar.</p>
          
          <h3>Cookies de Rendimiento</h3>
          <p>Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.</p>
          
          <h3>Cookies de Funcionalidad</h3>
          <p>Permiten que el sitio web recuerde sus preferencias (como idioma o región).</p>
          
          <h2>3. Gestión de Cookies</h2>
          <p>Puede controlar y/o eliminar las cookies según desee. Puede eliminar todas las cookies que ya están en su dispositivo y configurar la mayoría de los navegadores para evitar que se instalen.</p>
          
          <h2>4. Más Información</h2>
          <p>Para más información sobre cómo gestionamos las cookies, contáctenos en info@kinesis.com.</p>
        `,
        published: true,
      },
      {
        slug: "terminos",
        title: "Términos y Condiciones",
        content: `
          <h2>1. Aceptación de los Términos</h2>
          <p>Al acceder y utilizar este sitio web, acepta estar sujeto a estos términos y condiciones de uso.</p>
          
          <h2>2. Servicios Ofrecidos</h2>
          <p>Kinesis ofrece clases de danza y servicios relacionados según los diferentes modelos de negocio descritos en nuestro sitio web.</p>
          
          <h2>3. Inscripción y Pago</h2>
          <p>La inscripción en nuestros programas requiere el pago de una matrícula anual (según corresponda) y las cuotas mensuales correspondientes. Los pagos deben realizarse según las condiciones especificadas para cada programa.</p>
          
          <h2>4. Cancelaciones y Reembolsos</h2>
          <p>Las cancelaciones deben notificarse con al menos 7 días de antelación. Las matrículas no son reembolsables. Las cuotas mensuales pueden ser reembolsadas parcialmente según las condiciones específicas de cada programa.</p>
          
          <h2>5. Código de Conducta</h2>
          <p>Los participantes deben mantener un comportamiento respetuoso hacia instructores, personal y otros estudiantes. Nos reservamos el derecho de expulsar a cualquier persona que no cumpla con nuestro código de conducta.</p>
          
          <h2>6. Responsabilidad</h2>
          <p>Los participantes asisten a las clases bajo su propia responsabilidad. Kinesis no se hace responsable de lesiones que puedan ocurrir durante las clases, salvo en casos de negligencia demostrable.</p>
          
          <h2>7. Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.</p>
          
          <h2>8. Contacto</h2>
          <p>Para cualquier consulta sobre estos términos, contáctenos en info@kinesis.com.</p>
        `,
        published: true,
      },
    ]);

    console.log("✅ Created legal pages");

    console.log("🎉 Database seed completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("✨ Seed script finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
