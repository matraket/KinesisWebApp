-- Add new columns to business_models table
ALTER TABLE business_models 
ADD COLUMN IF NOT EXISTS cta VARCHAR(100),
ADD COLUMN IF NOT EXISTS cta_link VARCHAR(255),
ADD COLUMN IF NOT EXISTS pricing_session INTEGER,
ADD COLUMN IF NOT EXISTS pricing_bono5 INTEGER,
ADD COLUMN IF NOT EXISTS pricing_bono10 INTEGER;

-- Delete existing data to avoid duplicates
DELETE FROM business_models;

-- Insert the 4 business models with complete data
INSERT INTO business_models (
  slug, 
  name, 
  tagline, 
  description, 
  features, 
  advantages, 
  benefits, 
  image_url, 
  icon_name, 
  cta, 
  cta_link, 
  pricing_session, 
  pricing_bono5, 
  pricing_bono10, 
  "order", 
  published
) VALUES 
-- Élite On Demand
(
  'elite-on-demand',
  'Élite On Demand',
  'Tecnificación a tu medida',
  'Clases privadas o semi-privadas diseñadas para bailarines que buscan perfeccionar su técnica con profesionales de élite. Máxima flexibilidad: reserva cuando lo necesites.',
  '["Clases 100% personalizadas", "Profesores especializados de élite", "Horario flexible (L-V, 10-13h)", "Válido para parejas de baile", "Sin compromisos de permanencia"]'::json,
  '["Progreso técnico acelerado", "Feedback personalizado inmediato", "Preparación para audiciones", "Corrección de vicios técnicos"]'::json,
  '["Alcanza tu máximo potencial como bailarín", "Confianza y seguridad escénica", "Resultados visibles en pocas sesiones"]'::json,
  '/assets/generated_images/elite_private_coaching_session.png',
  'Sparkles',
  'Reserva tu sesión Élite',
  '/contacto?tipo=elite_booking',
  45,
  200,
  380,
  0,
  true
),
-- Ritmo Constante
(
  'ritmo-constante',
  'Ritmo Constante',
  'Constancia que transforma',
  'Suscripciones mensuales a clases grupales de estilos específicos. La constancia es la clave del dominio. Encuentra tu estilo, únete a un grupo y crece con personas como tú.',
  '["Grupos reducidos y estables", "Clases 2 o 4 horas/semana", "Clásico, Contemporáneo, Folclore, Urbano, Salón", "Progresión estructurada", "Acceso a eventos y workshops"]'::json,
  '["Comunidad de bailarines con tu misma pasión", "Motivación grupal constante", "Evolución técnica visible mes a mes", "Ambiente profesional pero relajado"]'::json,
  '["Domina tu estilo favorito", "Mejora física y mental", "Nuevas amistades con intereses afines"]'::json,
  '/assets/generated_images/group_dance_class_energy.png',
  'TrendingUp',
  'Ver horarios y suscribirse',
  '/tarifas',
  NULL,
  NULL,
  NULL,
  1,
  true
),
-- Generación Dance
(
  'generacion-dance',
  'Generación Dance',
  'La cantera del futuro',
  'Programas infantiles y juveniles (5-12 años) diseñados para combinar formación, diversión y conciliación familiar. Danza para el desarrollo integral de los más pequeños.',
  '["Grupos por edades (5-8 y 9-12 años)", "2 horas/semana de clases", "Estilos variados: Ballet, Hip Hop, Zumba Kids, Jazz", "Profesores especializados en pedagogía", "Clase abierta trimestral para familias"]'::json,
  '["Desarrollo de coordinación y expresión", "Autoconfianza y trabajo en equipo", "Ambiente seguro y positivo", "Conciliación familiar"]'::json,
  '["Niños más seguros y creativos", "Hábitos saludables desde pequeños", "Diversión garantizada"]'::json,
  '/assets/generated_images/children''s_dance_class_joy.png',
  'Heart',
  'Inscribe a tu hijo/a',
  '/contacto?tipo=pre_registration',
  NULL,
  NULL,
  NULL,
  2,
  true
),
-- Sí, Quiero Bailar
(
  'si-quiero-bailar',
  'Sí, Quiero Bailar',
  'Tu momento WOW',
  'Coreografía personalizada para tu boda o evento especial. Desde un vals elegante hasta un flashmob sorpresa. Hacemos que tu primer baile sea inolvidable.',
  '["Coreografía 100% personalizada", "Edición musical incluida", "Sin experiencia previa necesaria", "Packs de 3, 5 u 8 sesiones", "Opción para incluir amigos/familia"]'::json,
  '["Momento único y memorable", "Trabajo adaptado a vuestro nivel", "Sin estrés ni agobios", "Resultado espectacular garantizado"]'::json,
  '["El recuerdo más especial de vuestra boda", "Sorprende a tus invitados", "Confianza y disfrute en vuestro día"]'::json,
  '/assets/generated_images/wedding_couple_first_dance.png',
  'Users',
  'Consulta packs nupciales',
  '/contacto?tipo=wedding',
  NULL,
  NULL,
  NULL,
  3,
  true
);

-- Make cta and cta_link NOT NULL after inserting data
ALTER TABLE business_models 
ALTER COLUMN cta SET NOT NULL,
ALTER COLUMN cta_link SET NOT NULL;
