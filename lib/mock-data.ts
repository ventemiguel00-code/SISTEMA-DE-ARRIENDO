// Mock Data for Building Management Platform

export type EstadoUnidad = 'Disponible' | 'Ocupado' | 'Mantenimiento';
export type TipoUnidad = 'Apartamento' | 'Apartaestudio';
export type RolUsuario = 'Residente/Arrendador' | 'Administrador';
export type EstadoSolicitud = 'Pendiente' | 'En Proceso' | 'Resuelta';
export type TipoSolicitud = 'Reclamo' | 'Mantenimiento' | 'Sugerencia';

export interface Apartamento {
  ID_Unidad: string;
  Piso: number;
  Tipo_Unidad: TipoUnidad;
  Estado: EstadoUnidad;
  Media_URLS: string[];
  Precio_Oferta: number;
  Descripcion: string;
  Area: number; // m²
  Habitaciones?: number;
  Banos?: number;
}

export interface Usuario {
  ID_Usuario: string;
  Nombre: string;
  Email: string;
  Password: string; // In real app, this would be hashed
  Rol: RolUsuario;
  Unidad_Asignada?: string;
  Historial_Pagos: PagoHistorial[];
}

export interface PagoHistorial {
  ID_Pago: string;
  Fecha: string;
  Monto: number;
  Concepto: string;
  Estado: 'Completado' | 'Pendiente' | 'Rechazado';
}

export interface Evento {
  ID_Evento: string;
  Titulo: string;
  Fecha: string;
  Descripcion: string;
  Imagen_URL: string;
  Destacado: boolean;
}

export interface Solicitud {
  ID_Solicitud: string;
  ID_Usuario: string;
  Tipo: TipoSolicitud;
  Detalle: string;
  Estado: EstadoSolicitud;
  Fecha_Creacion: string;
  Fecha_Actualizacion: string;
}

// Generate 20 units across 6 floors
export const mockApartamentos: Apartamento[] = [
  // Piso 1 - Units 101, 102, 103
  {
    ID_Unidad: '101',
    Piso: 1,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA4NzQ4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDk3NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1658280911730-467b4764c09c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBraXRjaGVufGVufDF8fHx8MTc2MDk0NTU0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1200000,
    Descripcion: 'Moderno apartamento con excelente iluminación natural',
    Area: 65,
    Habitaciones: 2,
    Banos: 2
  },
  {
    ID_Unidad: '102',
    Piso: 1,
    Tipo_Unidad: 'Apartaestudio',
    Estado: 'Ocupado',
    Media_URLS: [
      'https://images.unsplash.com/photo-1702014862053-946a122b920d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzYwOTg4NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc2MDk4ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 850000,
    Descripcion: 'Apartaestudio funcional y acogedor',
    Area: 35,
    Habitaciones: 1,
    Banos: 1
  },
  {
    ID_Unidad: '103',
    Piso: 1,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Mantenimiento',
    Media_URLS: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA4NzQ4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1350000,
    Descripcion: 'Espacioso apartamento en proceso de renovación',
    Area: 75,
    Habitaciones: 3,
    Banos: 2
  },
  // Piso 2 - Units 201, 202, 203, 204
  {
    ID_Unidad: '201',
    Piso: 2,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDk3NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc2MDk4ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1658280911730-467b4764c09c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBraXRjaGVufGVufDF8fHx8MTc2MDk0NTU0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1280000,
    Descripcion: 'Apartamento con hermosa vista',
    Area: 68,
    Habitaciones: 2,
    Banos: 2
  },
  {
    ID_Unidad: '202',
    Piso: 2,
    Tipo_Unidad: 'Apartaestudio',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1702014862053-946a122b920d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzYwOTg4NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 900000,
    Descripcion: 'Apartaestudio moderno con cocina integrada',
    Area: 38,
    Habitaciones: 1,
    Banos: 1
  },
  {
    ID_Unidad: '203',
    Piso: 2,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Ocupado',
    Media_URLS: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA4NzQ4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDk3NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1400000,
    Descripcion: 'Apartamento de lujo con acabados premium',
    Area: 80,
    Habitaciones: 3,
    Banos: 2
  },
  {
    ID_Unidad: '204',
    Piso: 2,
    Tipo_Unidad: 'Apartaestudio',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1702014862053-946a122b920d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzYwOTg4NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 880000,
    Descripcion: 'Ideal para estudiantes o profesionales',
    Area: 36,
    Habitaciones: 1,
    Banos: 1
  },
  // Piso 3 - Units 301, 302, 303
  {
    ID_Unidad: '301',
    Piso: 3,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Ocupado',
    Media_URLS: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA4NzQ4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1320000,
    Descripcion: 'Apartamento familiar amplio',
    Area: 72,
    Habitaciones: 3,
    Banos: 2
  },
  {
    ID_Unidad: '302',
    Piso: 3,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDk3NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc2MDk4ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1250000,
    Descripcion: 'Excelente distribución de espacios',
    Area: 66,
    Habitaciones: 2,
    Banos: 2
  },
  {
    ID_Unidad: '303',
    Piso: 3,
    Tipo_Unidad: 'Apartaestudio',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1702014862053-946a122b920d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzYwOTg4NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 920000,
    Descripcion: 'Apartaestudio con balcón privado',
    Area: 40,
    Habitaciones: 1,
    Banos: 1
  },
  // Piso 4 - Units 401, 402, 403, 404
  {
    ID_Unidad: '401',
    Piso: 4,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA4NzQ4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDk3NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1380000,
    Descripcion: 'Apartamento luminoso con vista panorámica',
    Area: 76,
    Habitaciones: 3,
    Banos: 2
  },
  {
    ID_Unidad: '402',
    Piso: 4,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Ocupado',
    Media_URLS: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA4NzQ4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1290000,
    Descripcion: 'Moderno y elegante',
    Area: 70,
    Habitaciones: 2,
    Banos: 2
  },
  {
    ID_Unidad: '403',
    Piso: 4,
    Tipo_Unidad: 'Apartaestudio',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1702014862053-946a122b920d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzYwOTg4NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 950000,
    Descripcion: 'Completamente amoblado',
    Area: 42,
    Habitaciones: 1,
    Banos: 1
  },
  {
    ID_Unidad: '404',
    Piso: 4,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA4NzQ4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDk3NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1420000,
    Descripcion: 'Espacioso con walk-in closet',
    Area: 78,
    Habitaciones: 3,
    Banos: 2
  },
  // Piso 5 - Units 501, 502, 503, 504
  {
    ID_Unidad: '501',
    Piso: 5,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjB2aWV3fGVufDF8fHx8MTc2MDk3NTU0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDk3NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc2MDk4ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1450000,
    Descripcion: 'Penthouse con terraza privada',
    Area: 85,
    Habitaciones: 3,
    Banos: 3
  },
  {
    ID_Unidad: '502',
    Piso: 5,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Ocupado',
    Media_URLS: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA4NzQ4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1340000,
    Descripcion: 'Vista espectacular a la ciudad',
    Area: 74,
    Habitaciones: 2,
    Banos: 2
  },
  {
    ID_Unidad: '503',
    Piso: 5,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA4NzQ4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDk3NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1380000,
    Descripcion: 'Diseño contemporáneo',
    Area: 76,
    Habitaciones: 3,
    Banos: 2
  },
  {
    ID_Unidad: '504',
    Piso: 5,
    Tipo_Unidad: 'Apartaestudio',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1702014862053-946a122b920d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzYwOTg4NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 980000,
    Descripcion: 'Loft moderno con techos altos',
    Area: 45,
    Habitaciones: 1,
    Banos: 1
  },
  // Piso 6 - Units 601, 602, 603
  {
    ID_Unidad: '601',
    Piso: 6,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Disponible',
    Media_URLS: [
      'https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjB2aWV3fGVufDF8fHx8MTc2MDk3NTU0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDk3NDg3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc2MDk4ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1550000,
    Descripcion: 'Penthouse de lujo con rooftop',
    Area: 95,
    Habitaciones: 3,
    Banos: 3
  },
  {
    ID_Unidad: '602',
    Piso: 6,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Mantenimiento',
    Media_URLS: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA4NzQ4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1480000,
    Descripcion: 'En proceso de actualización',
    Area: 88,
    Habitaciones: 3,
    Banos: 2
  },
  {
    ID_Unidad: '603',
    Piso: 6,
    Tipo_Unidad: 'Apartamento',
    Estado: 'Ocupado',
    Media_URLS: [
      'https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50aG91c2UlMjB2aWV3fGVufDF8fHx8MTc2MDk3NTU0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    Precio_Oferta: 1520000,
    Descripcion: 'Máximo nivel con jacuzzi privado',
    Area: 92,
    Habitaciones: 3,
    Banos: 3
  }
];

export const mockEventos: Evento[] = [
  {
    ID_Evento: 'evt001',
    Titulo: 'Encuentro de Bienvenida 2025',
    Fecha: '2025-02-15T18:00:00',
    Descripcion: 'Únete a nosotros para dar la bienvenida a los nuevos residentes. Habrá música en vivo, comida y bebidas. ¡No te lo pierdas!',
    Imagen_URL: 'https://images.unsplash.com/photo-1758272134263-a658a0d94c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwcGFydHklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjA5ODg0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    Destacado: true
  },
  {
    ID_Evento: 'evt002',
    Titulo: 'Yoga en la Terraza',
    Fecha: '2025-02-22T07:00:00',
    Descripcion: 'Sesión de yoga matutina en nuestra terraza con vista panorámica. Todos los niveles son bienvenidos.',
    Imagen_URL: 'https://images.unsplash.com/photo-1758274525134-4b1e9cc67dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB5b2dhJTIwY2xhc3N8ZW58MXx8fHwxNzYwOTg4NDY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    Destacado: true
  },
  {
    ID_Evento: 'evt003',
    Titulo: 'Noche de Cine Comunitaria',
    Fecha: '2025-03-05T19:30:00',
    Descripcion: 'Proyección de película en el salón comunal. Palomitas incluidas. Votación abierta para elegir la película.',
    Imagen_URL: 'https://images.unsplash.com/photo-1527979809431-ea3d5c0c01c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwbW92aWUlMjBuaWdodHxlbnwxfHx8fDE3NjA5ODg0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    Destacado: true
  },
  {
    ID_Evento: 'evt004',
    Titulo: 'Workshop de Cocina Internacional',
    Fecha: '2025-03-12T16:00:00',
    Descripcion: 'Aprende a preparar platos internacionales con nuestro chef invitado. Cupos limitados.',
    Imagen_URL: 'https://images.unsplash.com/photo-1658280911730-467b4764c09c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBraXRjaGVufGVufDF8fHx8MTc2MDk0NTU0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    Destacado: false
  }
];

export const mockUsuarios: Usuario[] = [
  {
    ID_Usuario: 'user001',
    Nombre: 'María González',
    Email: 'maria@example.com',
    Password: 'demo123',
    Rol: 'Residente/Arrendador',
    Unidad_Asignada: '102',
    Historial_Pagos: [
      {
        ID_Pago: 'pago001',
        Fecha: '2025-01-15',
        Monto: 850000,
        Concepto: 'Arriendo Enero 2025',
        Estado: 'Completado'
      },
      {
        ID_Pago: 'pago002',
        Fecha: '2024-12-15',
        Monto: 850000,
        Concepto: 'Arriendo Diciembre 2024',
        Estado: 'Completado'
      }
    ]
  },
  {
    ID_Usuario: 'user002',
    Nombre: 'Carlos Rodríguez',
    Email: 'carlos@example.com',
    Password: 'demo123',
    Rol: 'Residente/Arrendador',
    Unidad_Asignada: '203',
    Historial_Pagos: [
      {
        ID_Pago: 'pago003',
        Fecha: '2025-01-15',
        Monto: 1400000,
        Concepto: 'Arriendo Enero 2025',
        Estado: 'Completado'
      }
    ]
  },
  {
    ID_Usuario: 'admin001',
    Nombre: 'Admin Edificio',
    Email: 'admin@example.com',
    Password: 'admin123',
    Rol: 'Administrador',
    Historial_Pagos: []
  }
];

export const mockSolicitudes: Solicitud[] = [
  {
    ID_Solicitud: 'sol001',
    ID_Usuario: 'user001',
    Tipo: 'Mantenimiento',
    Detalle: 'La llave del agua caliente del baño principal gotea constantemente',
    Estado: 'En Proceso',
    Fecha_Creacion: '2025-01-18',
    Fecha_Actualizacion: '2025-01-20'
  },
  {
    ID_Solicitud: 'sol002',
    ID_Usuario: 'user001',
    Tipo: 'Sugerencia',
    Detalle: 'Sería genial tener un horario extendido para el gimnasio los fines de semana',
    Estado: 'Pendiente',
    Fecha_Creacion: '2025-01-19',
    Fecha_Actualizacion: '2025-01-19'
  },
  {
    ID_Solicitud: 'sol003',
    ID_Usuario: 'user002',
    Tipo: 'Reclamo',
    Detalle: 'Ruido excesivo proveniente de la unidad superior durante la noche',
    Estado: 'Resuelta',
    Fecha_Creacion: '2025-01-10',
    Fecha_Actualizacion: '2025-01-15'
  }
];
