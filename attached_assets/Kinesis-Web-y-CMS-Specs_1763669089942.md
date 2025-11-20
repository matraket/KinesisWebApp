---
bundle_id: "kinesis-web-cms-specs"
bundle_type: "kb-multi-file"
description: "Bundle de documentación técnica Web + CMS del proyecto Kinesis."

files:
  - id: "kinesis-alcance-web-cms"
    filename: "kinesis-alcance-web-cms.md"
    title: "Análisis de alcance Web corporativa + CMS"
    marker: "INICIO DE ARCHIVO: /context/kinesis-alcance-web-cms.md"

  - id: "kinesis-guia-implementacion"
    filename: "kinesis-guia-de-implementacion.md"
    title: "Sistema de diseño y guía de implementación"
    marker: "INICIO DE ARCHIVO: /context/kinesis-guia-de-implementacion.md"

  - id: "kinesis-secciones"
    filename: "kinesis-secciones.md"
    title: "Secciones de la Web y del CMS"
    marker: "INICIO DE ARCHIVO: /context/kinesis-secciones.md"

  - id: "kinesis-database-schema"
    filename: "kinesis-database-schema.sql"
    title: "Esquema de base de datos Kinesis (PostgreSQL)"
    marker: "INICIO DE ARCHIVO: /context/kinesis-database-schema.sql"

referencing_rules:
  - "Citar siempre por 'filename' (ej: kinesis-secciones.md), no por Kinesis-Web-y-CMS-Specs.md."
---


# Kinesis-Web-y-CMS-Specs.md

---

## DOCUMENTO 1/4

**Nombre de archivo:** `/context/kinesis-alcance-web-cms.md`

**Descripción:** Análisis completo del alcance funcional de la Web pública corporativa y del CMS interno de Kinesis. Define las secciones públicas (Inicio, Quiénes somos, Modelos de negocio, Programas, Equipo, Tarifas, Contacto) y las áreas de gestión del CMS (Dashboard, Contenido, Leads, Navegación, Textos legales, Ajustes).

### ╔═══════════════════════════════════════════════════════════════╗
### ║   INICIO DE ARCHIVO: /context/kinesis-alcance-web-cms.md    ║
### ╚═══════════════════════════════════════════════════════════════╝

# ANÁLISIS DE ALCANCE – WEB CORPORATIVA + CMS KINESIS

## 1. Objetivo y alcance

Este análisis se centra exclusivamente en dos piezas del ecosistema Kinesis:

* La **web pública corporativa**, orientada a captar, informar y acompañar al usuario desde el primer contacto hasta la solicitud de información o reserva.
* El **CMS interno**, como herramienta de gestión de contenidos y leads, que permite mantener la web viva y alineada con la realidad del centro sin depender de terceros.

Quedan fuera de este documento los módulos de gestión interna de la escuela (alumnos, inscripciones, pagos, asistencia, etc.) y los portales privados de alumno o instructor. Aquí sólo abordamos lo que se ve “de puertas hacia fuera” y la consola que lo mantiene actualizado.

---

## 2. Alcance de la Web Corporativa

La web de Kinesis actúa como escaparate y como embudo de captación. Su estructura debe permitir al visitante entender rápidamente quiénes sois, qué ofrecéis, qué modelo encaja con su situación y cómo dar el siguiente paso (contactar, preinscribirse o reservar).

### 2.1. Estructura general y navegación

La navegación principal estará siempre visible (cabecera), complementada con llamadas a la acción estratégicas (“Reserva tu sesión”, “Quiero información”, “Preinscribir a mi hijo/a”).

El menú principal incluirá, como mínimo, los siguientes apartados:

* **Inicio**
* **Quiénes somos**
* **Modelos de negocio**
* **Programas y servicios**
* **Equipo**
* **Horarios y tarifas**
* **Contacto / Preinscripción**
* Accesos directos a **“Élite On Demand”** y **“Generación Dance”** como programas clave de captación.

### 2.2. Página de Inicio

La página de inicio funciona como portada y resumen ejecutivo de Kinesis:

* Mensaje principal claro, que transmite el posicionamiento: centro de referencia en danza, combinación de alta tecnificación, formación amateur y programas infantiles.
* Bloques destacados para los **cuatro modelos de negocio**:
  Élite On Demand, Ritmo Constante, Generación Dance y Sí, Quiero Bailar, cada uno con un resumen de a quién va dirigido y el beneficio principal.
* Avances de las secciones internas: breve presentación de “Quiénes somos”, muestra de disciplinas, selección de profesores destacados y un resumen de las tarifas.
* Llamadas a la acción visibles:

  * “Reserva tu sesión Élite”
  * “Preinscribe a tu hijo/a”
  * “Pide información”

El objetivo de esta página es que, en pocos segundos, el visitante entienda qué tipo de centro es Kinesis y encuentre un camino claro para profundizar en la información que le interesa.

### 2.3. Quiénes Somos

Sección orientada a transmitir identidad, misión y valores:

* Relato de Kinesis como centro de referencia en Zaragoza.
* Explicación de la misión (democratizar la excelencia en danza) y de los valores clave (excelencia técnica, innovación, inclusión, comunidad).
* Breve mención a la filosofía de “ecosistema 360º” y a la combinación de formación profesional, hobby y programas infantiles.
* Posibilidad de incluir imágenes del espacio e hitos relevantes.

Su función es respaldar, a nivel emocional y de credibilidad, la decisión de inscribirse o llevar a un menor al centro.

### 2.4. Modelos de Negocio

Sección que presenta, de forma clara y comparativa, los cuatro modelos:

* **Élite On Demand** (tecnificación a medida, pago por sesión).
* **Ritmo Constante** (clases grupales regulares para adultos).
* **Generación Dance** (programas infantiles y juveniles).
* **Sí, Quiero Bailar** (preparación específica para bodas y eventos).

Cada modelo tendrá su propia ficha o subpágina, donde se detallen:

* A quién va dirigido.
* Qué incluye (tipos de clases, formatos, intensidad).
* Beneficios concretos.
* Horarios de referencia y condiciones básicas.
* Enlaces a los programas/servicios asociados y a las tarifas correspondientes.
* Botones de acción: “Solicita información”, “Preinscripción”, “Reserva sesión”.

Esta sección es clave para orientar al usuario y que identifique rápidamente “su” modalidad.

### 2.5. Programas y Servicios

Catálogo de disciplinas y propuestas formativas, organizado por tipo de perfil:

* Formación profesional (ej. Clásico avanzado, Contemporáneo avanzado).
* Formación amateur/hobby (ej. Raíces Vivas, Pasos de salón, Street, etc.).
* Programas infantiles y juveniles.

Cada programa dispondrá de una ficha con:

* Descripción clara de objetivos y enfoque pedagógico.
* Nivel al que se dirige (iniciación, intermedio, avanzado).
* Edades o perfil de alumno.
* Frecuencia semanal y duración de las clases.
* Posibles requisitos de acceso (casting, prueba de nivel, etc.).
* Relación con los modelos de negocio (a qué plan pertenece).
* Profesorado habitual vinculado (enlace a sus fichas).
* Horarios de referencia y relación con las tarifas.

El objetivo es que el usuario comprenda no sólo “qué se hace”, sino también el recorrido posible dentro de Kinesis.

### 2.6. Equipo

Página dedicada al equipo docente y de dirección:

* Listado de profesores con foto, nombre y disciplina principal (vista de tarjeta).
* Ficha ampliada por profesional: trayectoria, formación, especialidad, programas que imparte y un breve texto que transmita su estilo.
* Destacar la dirección artística y las figuras clave del proyecto.

Esta sección refuerza la propuesta de valor basada en la excelencia del profesorado.

### 2.7. Horarios y Tarifas

Sección que combina, de forma comprensible, la información de tiempos y precios:

* Cuadrante de horarios por día, franja y sala, con filtros por edad, nivel y estilo.
* Explicación de las **tarifas por modelo de negocio** (Élite, Ritmo, Generación, Sí, Quiero Bailar), indicando:

  * Qué incluye cada cuota.
  * Condiciones generales (matrícula, permanencias, bonos, etc.).
* Posible desglose de precios por programa o paquete cuando sea relevante.

El objetivo es minimizar dudas y reducir el volumen de consultas básicas, dejando al equipo libre para resolver casos más específicos.

### 2.8. Novedades / Blog (opcional)

Espacio para publicar artículos, noticias, crónicas de actuaciones, logros del alumnado y novedades de la escuela.

Esta sección aporta frescura, mejora la percepción de actividad y sirve como refuerzo a la captación y fidelización.

### 2.9. Contacto, Preinscripción y Reservas

Bloque final que concentra los canales de contacto y los formularios clave:

* Formulario de contacto general (dudas, visitas al centro).
* Formulario de preinscripción a programas regulares (especialmente útil para Generación Dance).
* Formulario de solicitud de sesión o cita para Élite On Demand.
* Información de localización, mapas, teléfonos, horarios de atención y redes sociales.

Aquí se cierra el embudo: el visitante pasa de interesado a lead con datos estructurados.

---

## 3. Alcance del CMS Web

El CMS es la herramienta interna que permite al equipo de Kinesis controlar todo lo anterior sin necesidad de conocimientos técnicos. Su alcance se concreta en dos grandes bloques: gestión de contenidos y gestión de leads.

### 3.1. Objetivo del CMS

* Mantener actualizada la web corporativa (textos, imágenes, estructura).
* Centralizar la información sobre modelos de negocio, programas, equipo, tarifas y horarios.
* Gestionar de forma ordenada las solicitudes que llegan desde los formularios (contacto, preinscripción, reservas Élite, etc.).
* Reducir la dependencia de terceros para cambios habituales, permitiendo iterar la oferta con agilidad.

### 3.2. Estructura general del menú del CMS

A nivel ejecutivo, el CMS se organizará en un menú principal con, al menos, estas áreas:

1. **Panel de Inicio**
   Vista resumen con indicadores básicos: número de leads recientes, formularios recibidos por tipo, páginas más visitadas, etc.

2. **Contenido Web**
   Gestión de las secciones visibles de la web:

   * Páginas estáticas (“Quiénes somos”, “Instalaciones”, etc.).
   * Modelos de negocio (listado de los cuatro pilares, con su contenido).
   * Programas y servicios (catálogo de disciplinas y fichas de programa).
   * Equipo (fichas de los profesores y roles).
   * Horarios (cuadrante, franjas y asignación a programas).
   * Tarifas (planes, importes y condiciones).
   * Novedades/Blog (si se habilita esta sección).

3. **Formularios y Leads**

   * Entradas del formulario de contacto general.
   * Preinscripciones a programas.
   * Solicitudes de reserva de sesiones Élite On Demand.
   * Otros formularios específicos que se definan (por ejemplo, “Sí, Quiero Bailar”).
   * Estado de cada lead (nuevo, en contacto, cerrado, etc.) y notas internas.

4. **Estructura y Navegación**

   * Configuración del menú principal de la web y sus subapartados.
   * Definición de qué secciones se muestran destacadas en la home.
   * Gestión de elementos destacados (banners, llamadas a la acción, bloques de portada).

5. **Textos Legales y Políticas**

   * Edición y versionado de Aviso legal, Condiciones de uso, Política de privacidad y Política de cookies.
   * Control de vigencia de cada texto legal.

6. **Ajustes del Sitio**

   * Datos generales del centro (nombre comercial, dirección, teléfonos, horarios de atención).
   * Enlaces a redes sociales.
   * Elementos de identidad visual (logotipos, imágenes principales).

### 3.3. Gestión de contenidos: qué puede hacer cada menú

* Desde **Contenido Web**, el equipo puede crear, editar, despublicar y reordenar bloques de información. Por ejemplo, actualizar la descripción de un programa, cambiar la bio de un profesor o modificar la explicación de un modelo de negocio sin tocar código.
* La sección de **Programas y servicios** actúa como fuente central de verdad: lo que se actualice aquí se reflejará automáticamente en las páginas de servicios de la web.
* En **Equipo**, cualquier cambio en un profesor (nueva disciplina, incorporación o baja) se verá reflejado en la página de equipo y en las fichas de programas donde participa.
* **Horarios y tarifas** se gestionan de forma coherente: la actualización de un horario o de un precio se replica en todas las páginas que consumen esa información.

### 3.4. Gestión de leads y formularios

* En el área de **Formularios y Leads**, el personal puede visualizar, filtrar y gestionar todas las solicitudes recibidas.
* Cada lead conserva la información clave capturada en la web (datos de contacto, interés, modelo/programa seleccionado, comentarios) y su estado interno.
* Esta zona sirve de puente natural entre el mundo online (web) y los procesos internos de matriculación y organización de grupos, aunque la parte operativa de matrícula pertenezca a otros módulos.

---

## 4. Límites del alcance

Dentro de este análisis, la Web + CMS cubren:

* Toda la **presencia pública online** de Kinesis.
* La **gestión interna de contenidos** que alimentan esa presencia.
* La **captación estructurada de leads** necesarios para los procesos comerciales y de matriculación.

Quedan fuera del alcance:

* La gestión operativa de alumnos, inscripciones, pagos, asistencia y portales privados, que se abordan en otros módulos del sistema integral.

Con este marco, la Web y el CMS se definen como el “escaparate inteligente” de Kinesis: una pieza capaz de comunicar con solvencia la propuesta de valor, acompañar al usuario en su decisión y entregar al equipo interno datos estructurados y accionables para convertir interés en alumnos.


### ╔═══════════════════════════════════════════════════════════════╗
### ║    FIN DE ARCHIVO: /context/kinesis-alcance-web-cms.md      ║
### ╚═══════════════════════════════════════════════════════════════╝

---

---

## DOCUMENTO 2/4

**Nombre de archivo:** `/context/kinesis-guia-de-implementacion.md`

**Descripción:** Sistema de diseño y guía de implementación técnica para Web y CMS. Incluye paleta de colores (Web: Kinesis Pink/Night; CMS: Admin Navy/Surface), tipografía (Montserrat + Inter), sistema de temas (Light/Dark), espaciado, componentes reutilizables, animaciones y plan de desarrollo por fases.

### ╔═══════════════════════════════════════════════════════════════╗
### ║  INICIO DE ARCHIVO: /context/kinesis-guia-de-implementacion.md  ║
### ╚═══════════════════════════════════════════════════════════════╝

# Kinesis — Sistema de Diseño y Guía de Implementación (Web + CMS)

---

## 🎨 SISTEMA DE DISEÑO BASE

### Paleta de Colores Página WEB

Pensada para la página web que ya tienes maquetada

```
Primarios
- Kinesis Pink: #FF3366 (Color principal – CTAs, botones, links destacados)
- Kinesis Night: #050714 (Fondos principales oscuros, hero, footer)
- Kinesis White: #FFFFFF (Fondos claros, texto sobre fondos oscuros)


Secundarios
- Night 800: #0B1020 (Fondos de secciones, header fijo)
- Night 700: #151A2F (Cards oscuras, overlays de imagen)
- Gray 100: #F5F5F5 (Fondos sutiles, secciones claras)
- Gray 200: #E5E7EB (Bordes, divisores, inputs)
- Gray 600: #4B5563 (Texto secundario)
- Gray 900: #111827 (Texto principal sobre fondos claros)


Acentos
- Accent Purple: #8B5CF6 (Badges, pequeños detalles de marca)
- Success Green: #10B981 (Estados correctos, confirmaciones)
- Warning Amber: #F59E0B (Avisos, advertencias suaves)
- Error Red: #EF4444 (Errores, mensajes críticos)
- Info Blue: #3B82F6 (Mensajes informativos, enlaces secundarios)
```
### Paleta de Colores CMS Admin

Variación pensada para el panel de administración: sidebar oscuro, contenido claro y acentos coherentes con la marca.

```text
Primarios
- Admin Navy:         #020617  (Sidebar principal, fondo app)
- Admin Surface:      #0F172A  (Fondos de tarjetas y módulos)
- Admin Accent Pink:  #FB2F72  (Botones primarios, elementos activos)

Secundarios
- Admin Border:       #1E293B  (Bordes, separadores, contornos de inputs)
- Admin Muted:        #64748B  (Texto secundario, iconos desactivados)
- Admin Surface Light:#111827  (Headers de tablas, barras superiores)
- Admin White:        #FFFFFF  (Fondos de tablas, tarjetas claras, texto sobre fondos muy oscuros)

Acentos
- Admin Success:      #10B981  (Estados OK, chips de "Publicado")
- Admin Warning:      #F59E0B  (Avisos, etiquetas de "Pendiente")
- Admin Error:        #EF4444  (Errores de validación, estados críticos)
- Admin Info:         #38BDF8  (Badges de información, tooltips)
```

### Notas de uso

* Mantén **Kinesis Pink** y **Admin Accent Pink** como hilo conductor entre web y CMS.
* Usa los tonos **Night** para crear el contraste fuerte que ya se ve en los mockups (hero y footer muy oscuros, tarjetas claras).
* El púrpura (#8B5CF6) queda como acento secundario para detalles finos de marca y elementos de UI donde quieras un toque más "tech" (badges, iconos, pequeños subrayados).

### Tipografía
```
Display: Montserrat (700, 800)
- H1: 48px móvil / 72px desktop
- H2: 36px móvil / 48px desktop

Body: Inter (400, 500, 600)
- H3: 24px / 32px
- H4: 20px / 24px
- Body: 16px / 18px
- Small: 14px
```

### Espaciado (múltiplos de 8px)
```
xs: 8px
sm: 16px
md: 24px
lg: 32px
xl: 48px
2xl: 64px
3xl: 96px
```

### Componentes Base
- **Botones**: Rounded-lg (8px), altura 48px, padding horizontal 24px
- **Cards**: Rounded-xl (12px), shadow-md, padding 24px
- **Inputs**: Height 48px, rounded-lg, border gray-200
- **Modales**: Rounded-xl, overlay negro 50% opacidad

---


## 📱 CONSIDERACIONES RESPONSIVE

### Mobile First Approach

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Adaptaciones Mobile:**
- Navigation: Hamburger menu con drawer lateral
- Grid columns: Colapsar a stack vertical
- Cards: Full width con padding reducido
- Tablas: Convertir a cards apiladas
- Modales: Full screen en móvil
- Formularios: Inputs full width
- Imágenes: Aspect ratio adaptativo

**Touch Targets:**
- Mínimo 44x44px para elementos clickables
- Spacing aumentado entre elementos
- Swipe gestures para carousels
- Pull to refresh en listados

---

## 🎯 COMPONENTES REUTILIZABLES

### Para crear en el sistema:

1. **ProgramCard**
   - Imagen, título, precio, badges
   - Variantes: horizontal, vertical, minimal

2. **InstructorCard**
   - Foto circular/cuadrada, nombre, bio
   - Tamaños: small, medium, large

3. **PricingTable**
   - Comparativa de planes
   - Highlight del recomendado

4. **ContactForm**
   - Validación en tiempo real
   - Mensajes de error/éxito

5. **StatsCounter**
   - Números animados
   - Icono y label

6. **TestimonialCard**
   - Quote, autor, rating
   - Con/sin imagen

7. **ScheduleGrid**
   - Vista semanal de horarios
   - Códigos de color por programa

8. **FAQAccordion**
   - Expandible/colapsable
   - Iconos +/-

9. **FilterSidebar**
   - Checkboxes, radios, sliders
   - Botón reset

10. **DataTable**
    - Sortable, filtrable
    - Acciones por fila
    - Selección múltiple

---

## 🚀 FLUJOS DE INTERACCIÓN PRINCIPALES

### Flujo de Inscripción:
1. Usuario navega servicios → 
2. Click en programa → 
3. Ver detalles → 
4. Click "Inscribirse" → 
5. Formulario pre-inscripción → 
6. Confirmación → 
7. Lead guardado en CMS

### Flujo de Gestión CMS:
1. Admin login → 
2. Dashboard → 
3. Seleccionar sección → 
4. CRUD operations → 
5. Preview cambios → 
6. Publicar → 
7. Ver en web pública

### Flujo de Contacto:
1. Usuario tiene duda → 
2. Click en "Contacto" → 
3. Rellena formulario → 
4. Envío con validación → 
5. Mensaje de éxito → 
6. Lead aparece en CMS → 
7. Admin gestiona lead

---

## 🎨 EFECTOS Y MICROINTERACCIONES

### Animaciones:
- **Fade in** en scroll para secciones
- **Slide up** para cards al aparecer
- **Hover scale** en botones y cards
- **Skeleton loading** mientras carga contenido
- **Progress bars** animadas
- **Smooth scroll** entre secciones
- **Parallax** suave en heroes

### Estados:
- **Hover**: Elevación, cambio de color
- **Active**: Pressed effect
- **Focus**: Outline púrpura
- **Disabled**: Opacidad 50%
- **Loading**: Spinner púrpura
- **Success**: Check verde animado
- **Error**: Shake animation

### Feedback:
- **Toasts** para notificaciones
- **Modales** de confirmación
- **Tooltips** en iconos
- **Progress indicators** en forms
- **Validación** en tiempo real
- **Autocomplete** en búsquedas

---

## 📋 NOTAS PARA IMPLEMENTACIÓN

### Prioridades de Desarrollo:
1. **FASE 1 - MVP Web**
   - Homepage
   - Páginas estáticas (Quiénes somos)
   - Catálogo de servicios
   - Formulario de contacto
   - Responsive design

2. **FASE 2 - CMS Básico**
   - Login admin
   - Dashboard
   - CRUD programas
   - CRUD instructores
   - Gestión de contenido

3. **FASE 3 - Avanzado**
   - Gestión de leads
   - Analytics
   - Optimizaciones SEO
   - Integraciones
   - PWA features

### SEO Checklist:
- Meta tags dinámicos
- Schema.org markup
- Sitemap.xml
- Robots.txt
- Open Graph tags
- Twitter Cards
- Alt text en imágenes
- URLs amigables
- Contenido indexable

---

## 🎯 RESULTADO ESPERADO

Al implementar estos diseños en Replit, obtendrás:

1. **Web pública** moderna y atractiva que convierte visitantes en leads
2. **CMS intuitivo** para gestión sin conocimientos técnicos
3. **Sistema escalable** preparado para crecer
4. **Experiencia móvil** optimizada
5. **SEO-friendly** para posicionamiento
6. **Performance** optimizada (Core Web Vitals)
7. **Accesible** cumpliendo WCAG 2.1 AA


### ╔═══════════════════════════════════════════════════════════════╗
### ║   FIN DE ARCHIVO: /context/kinesis-guia-de-implementacion.md   ║
### ╚═══════════════════════════════════════════════════════════════╝

---

---

## DOCUMENTO 3/4

**Nombre de archivo:** `/context/kinesis-secciones.md`

**Descripción:** Especificación detallada de cada sección de la Web corporativa y del CMS. Define la estructura de navegación, contenido de cada página (Inicio, Quiénes somos, Modelos, Programas, Equipo, Tarifas, FAQs, Legales), y funcionalidades de gestión del CMS por módulo.

### ╔═══════════════════════════════════════════════════════════════╗
### ║      INICIO DE ARCHIVO: /context/kinesis-secciones.md       ║
### ╚═══════════════════════════════════════════════════════════════╝

# Secciones Kinesis Web + CMS

## 1. Secciones de la Web Corporativa

### 1.2. Página de Inicio

La página de inicio funciona como portada y resumen ejecutivo de Kinesis:

* Mensaje principal claro, que transmite el posicionamiento: centro de referencia en danza, combinación de alta tecnificación, formación amateur y programas infantiles.
* Bloques destacados para los **cuatro modelos de negocio**:
  Élite On Demand, Ritmo Constante, Generación Dance y Sí, Quiero Bailar, cada uno con un resumen de a quién va dirigido y el beneficio principal.
* Avances de las secciones internas: breve presentación de “Quiénes somos”, muestra de disciplinas, selección de profesores destacados y un resumen de las tarifas.
* Llamadas a la acción visibles:

  * “Reserva tu sesión Élite”
  * “Preinscribe a tu hijo/a”
  * “Pide información”

El objetivo de esta página es que, en pocos segundos, el visitante entienda qué tipo de centro es Kinesis y encuentre un camino claro para profundizar en la información que le interesa.

### 1.3. Quiénes Somos

Sección orientada a transmitir identidad, misión y valores:

* Relato de Kinesis como centro de referencia en Zaragoza.
* Explicación de la misión (democratizar la excelencia en danza) y de los valores clave (excelencia técnica, innovación, inclusión, comunidad).
* Breve mención a la filosofía de “ecosistema 360º” y a la combinación de formación profesional, hobby y programas infantiles.
* Posibilidad de incluir imágenes del espacio e hitos relevantes.

Su función es respaldar, a nivel emocional y de credibilidad, la decisión de inscribirse o llevar a un menor al centro.

### 1.4. Modelos de Negocio

Sección que presenta, de forma clara y comparativa, los cuatro modelos:

* **Élite On Demand** (tecnificación a medida, pago por sesión).
* **Ritmo Constante** (clases grupales regulares para adultos).
* **Generación Dance** (programas infantiles y juveniles).
* **Sí, Quiero Bailar** (preparación específica para bodas y eventos).

Cada modelo tendrá su propia ficha o subpágina, donde se detallen:

* A quién va dirigido.
* Qué incluye (tipos de clases, formatos, intensidad).
* Beneficios concretos.
* Horarios de referencia y condiciones básicas.
* Enlaces a los programas/servicios asociados y a las tarifas correspondientes.
* Botones de acción: “Solicita información”, “Preinscripción”, “Reserva sesión”.

Esta sección es clave para orientar al usuario y que identifique rápidamente “su” modalidad.

### 1.5. Programas y Servicios

Catálogo de disciplinas y propuestas formativas, organizado por tipo de perfil:

* Formación profesional (ej. Clásico avanzado, Contemporáneo avanzado).
* Formación amateur/hobby (ej. Raíces Vivas, Pasos de salón, Street, etc.).
* Programas infantiles y juveniles.

Cada programa dispondrá de una ficha con:

* Descripción clara de objetivos y enfoque pedagógico.
* Nivel al que se dirige (iniciación, intermedio, avanzado).
* Edades o perfil de alumno.
* Frecuencia semanal y duración de las clases.
* Posibles requisitos de acceso (casting, prueba de nivel, etc.).
* Relación con los modelos de negocio (a qué plan pertenece).
* Profesorado habitual vinculado (enlace a sus fichas).
* Horarios de referencia y relación con las tarifas.

El objetivo es que el usuario comprenda no sólo “qué se hace”, sino también el recorrido posible dentro de Kinesis.

### 1.6. Equipo

Página dedicada al equipo docente y de dirección:

* Listado de profesores con foto, nombre y disciplina principal (vista de tarjeta).
* Ficha ampliada por profesional: trayectoria, formación, especialidad, programas que imparte y un breve texto que transmita su estilo.
* Destacar la dirección artística y las figuras clave del proyecto.

Esta sección refuerza la propuesta de valor basada en la excelencia del profesorado.

### 1.7. Horarios y Tarifas

Sección que combina, de forma comprensible, la información de tiempos y precios:

* Cuadrante de horarios por día, franja y sala, con filtros por edad, nivel y estilo.
* Explicación de las **tarifas por modelo de negocio** (Élite, Ritmo, Generación, Sí, Quiero Bailar), indicando:

  * Qué incluye cada cuota.
  * Condiciones generales (matrícula, permanencias, bonos, etc.).
* Posible desglose de precios por programa o paquete cuando sea relevante.

El objetivo es minimizar dudas y reducir el volumen de consultas básicas, dejando al equipo libre para resolver casos más específicos.

## 2. Secciones del CMS Web

A nivel ejecutivo, el CMS se organizará en un menú principal con, al menos, estas áreas:

### 1. **Panel de Inicio**
   Vista resumen con indicadores básicos: número de leads recientes, formularios recibidos por tipo, páginas más visitadas, etc.

### 2. **Contenido Web**
   Gestión de las secciones visibles de la web:

   * Páginas estáticas (“Quiénes somos”, “Instalaciones”, etc.).
   * Modelos de negocio (listado de los cuatro pilares, con su contenido).
   * Programas y servicios (catálogo de disciplinas y fichas de programa).
   * Equipo (fichas de los profesores y roles).
   * Horarios (cuadrante, franjas y asignación a programas).
   * Tarifas (planes, importes y condiciones).
   * Novedades/Blog (si se habilita esta sección).

### 3. **Formularios y Leads**

   * Entradas del formulario de contacto general.
   * Preinscripciones a programas.
   * Solicitudes de reserva de sesiones Élite On Demand.
   * Otros formularios específicos que se definan (por ejemplo, “Sí, Quiero Bailar”).
   * Estado de cada lead (nuevo, en contacto, cerrado, etc.) y notas internas.

### 4. **Estructura y Navegación**

   * Configuración del menú principal de la web y sus subapartados.
   * Definición de qué secciones se muestran destacadas en la home.
   * Gestión de elementos destacados (banners, llamadas a la acción, bloques de portada).

### 5. **Textos Legales y Políticas**

   * Edición y versionado de Aviso legal, Condiciones de uso, Política de privacidad y Política de cookies.
   * Control de vigencia de cada texto legal.

### 6. **Ajustes del Sitio**

   * Datos generales del centro (nombre comercial, dirección, teléfonos, horarios de atención).
   * Enlaces a redes sociales.
   * Elementos de identidad visual (logotipos, imágenes principales).

### ╔═══════════════════════════════════════════════════════════════╗
### ║       FIN DE ARCHIVO: /context/kinesis-secciones.md         ║
### ╚═══════════════════════════════════════════════════════════════╝

---

---

## DOCUMENTO 4/4

**Nombre de archivo:** `/context/kinesis-database-schema.sql`

**Descripción:** Esquema completo de base de datos PostgreSQL para Kinesis Web + CMS. Define todas las tablas (specialties, instructors, programs, pricing_tiers, business_models, page_content, faqs, legal_pages, leads, settings), relaciones, tipos personalizados (enums), políticas RLS (Row Level Security), triggers, funciones auxiliares y vistas optimizadas.

### ╔═══════════════════════════════════════════════════════════════╗
### ║   INICIO DE ARCHIVO: /context/kinesis-database-schema.sql   ║
### ╚═══════════════════════════════════════════════════════════════╝

# Secciones Kinesis Web + CMS

## 1. Secciones de la Web Corporativa

### 1.2. Página de Inicio

La página de inicio funciona como portada y resumen ejecutivo de Kinesis:

* Mensaje principal claro, que transmite el posicionamiento: centro de referencia en danza, combinación de alta tecnificación, formación amateur y programas infantiles.
* Bloques destacados para los **cuatro modelos de negocio**:
  Élite On Demand, Ritmo Constante, Generación Dance y Sí, Quiero Bailar, cada uno con un resumen de a quién va dirigido y el beneficio principal.
* Avances de las secciones internas: breve presentación de “Quiénes somos”, muestra de disciplinas, selección de profesores destacados y un resumen de las tarifas.
* Llamadas a la acción visibles:

  * “Reserva tu sesión Élite”
  * “Preinscribe a tu hijo/a”
  * “Pide información”

El objetivo de esta página es que, en pocos segundos, el visitante entienda qué tipo de centro es Kinesis y encuentre un camino claro para profundizar en la información que le interesa.

### 1.3. Quiénes Somos

Sección orientada a transmitir identidad, misión y valores:

* Relato de Kinesis como centro de referencia en Zaragoza.
* Explicación de la misión (democratizar la excelencia en danza) y de los valores clave (excelencia técnica, innovación, inclusión, comunidad).
* Breve mención a la filosofía de “ecosistema 360º” y a la combinación de formación profesional, hobby y programas infantiles.
* Posibilidad de incluir imágenes del espacio e hitos relevantes.

Su función es respaldar, a nivel emocional y de credibilidad, la decisión de inscribirse o llevar a un menor al centro.

### 1.4. Modelos de Negocio

Sección que presenta, de forma clara y comparativa, los cuatro modelos:

* **Élite On Demand** (tecnificación a medida, pago por sesión).
* **Ritmo Constante** (clases grupales regulares para adultos).
* **Generación Dance** (programas infantiles y juveniles).
* **Sí, Quiero Bailar** (preparación específica para bodas y eventos).

Cada modelo tendrá su propia ficha o subpágina, donde se detallen:

* A quién va dirigido.
* Qué incluye (tipos de clases, formatos, intensidad).
* Beneficios concretos.
* Horarios de referencia y condiciones básicas.
* Enlaces a los programas/servicios asociados y a las tarifas correspondientes.
* Botones de acción: “Solicita información”, “Preinscripción”, “Reserva sesión”.

Esta sección es clave para orientar al usuario y que identifique rápidamente “su” modalidad.

### 1.5. Programas y Servicios

Catálogo de disciplinas y propuestas formativas, organizado por tipo de perfil:

* Formación profesional (ej. Clásico avanzado, Contemporáneo avanzado).
* Formación amateur/hobby (ej. Raíces Vivas, Pasos de salón, Street, etc.).
* Programas infantiles y juveniles.

Cada programa dispondrá de una ficha con:

* Descripción clara de objetivos y enfoque pedagógico.
* Nivel al que se dirige (iniciación, intermedio, avanzado).
* Edades o perfil de alumno.
* Frecuencia semanal y duración de las clases.
* Posibles requisitos de acceso (casting, prueba de nivel, etc.).
* Relación con los modelos de negocio (a qué plan pertenece).
* Profesorado habitual vinculado (enlace a sus fichas).
* Horarios de referencia y relación con las tarifas.

El objetivo es que el usuario comprenda no sólo “qué se hace”, sino también el recorrido posible dentro de Kinesis.

### 1.6. Equipo

Página dedicada al equipo docente y de dirección:

* Listado de profesores con foto, nombre y disciplina principal (vista de tarjeta).
* Ficha ampliada por profesional: trayectoria, formación, especialidad, programas que imparte y un breve texto que transmita su estilo.
* Destacar la dirección artística y las figuras clave del proyecto.

Esta sección refuerza la propuesta de valor basada en la excelencia del profesorado.

### 1.7. Horarios y Tarifas

Sección que combina, de forma comprensible, la información de tiempos y precios:

* Cuadrante de horarios por día, franja y sala, con filtros por edad, nivel y estilo.
* Explicación de las **tarifas por modelo de negocio** (Élite, Ritmo, Generación, Sí, Quiero Bailar), indicando:

  * Qué incluye cada cuota.
  * Condiciones generales (matrícula, permanencias, bonos, etc.).
* Posible desglose de precios por programa o paquete cuando sea relevante.

El objetivo es minimizar dudas y reducir el volumen de consultas básicas, dejando al equipo libre para resolver casos más específicos.

## 2. Secciones del CMS Web

A nivel ejecutivo, el CMS se organizará en un menú principal con, al menos, estas áreas:

### 1. **Panel de Inicio**
   Vista resumen con indicadores básicos: número de leads recientes, formularios recibidos por tipo, páginas más visitadas, etc.

### 2. **Contenido Web**
   Gestión de las secciones visibles de la web:

   * Páginas estáticas (“Quiénes somos”, “Instalaciones”, etc.).
   * Modelos de negocio (listado de los cuatro pilares, con su contenido).
   * Programas y servicios (catálogo de disciplinas y fichas de programa).
   * Equipo (fichas de los profesores y roles).
   * Horarios (cuadrante, franjas y asignación a programas).
   * Tarifas (planes, importes y condiciones).
   * Novedades/Blog (si se habilita esta sección).

### 3. **Formularios y Leads**

   * Entradas del formulario de contacto general.
   * Preinscripciones a programas.
   * Solicitudes de reserva de sesiones Élite On Demand.
   * Otros formularios específicos que se definan (por ejemplo, “Sí, Quiero Bailar”).
   * Estado de cada lead (nuevo, en contacto, cerrado, etc.) y notas internas.

### 4. **Estructura y Navegación**

   * Configuración del menú principal de la web y sus subapartados.
   * Definición de qué secciones se muestran destacadas en la home.
   * Gestión de elementos destacados (banners, llamadas a la acción, bloques de portada).

### 5. **Textos Legales y Políticas**

   * Edición y versionado de Aviso legal, Condiciones de uso, Política de privacidad y Política de cookies.
   * Control de vigencia de cada texto legal.

### 6. **Ajustes del Sitio**

   * Datos generales del centro (nombre comercial, dirección, teléfonos, horarios de atención).
   * Enlaces a redes sociales.
   * Elementos de identidad visual (logotipos, imágenes principales).

### ╔═══════════════════════════════════════════════════════════════╗
### ║    FIN DE ARCHIVO: /context/kinesis-database-schema.sql     ║
### ╚═══════════════════════════════════════════════════════════════╝

---

---

## FIN DEL ARCHIVO CONSOLIDADO

**Total de archivos incluidos:** 4  
**Recuerda:** Siempre cita el archivo fuente original, no este archivo contenedor.
