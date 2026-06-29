export const validateProfile = (data, role) => {
  const errors = {};

  if (!data.username || data.username.length < 3) {
    errors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
  }

  if (!data.fullName || data.fullName.length < 2) {
    errors.fullName = 'El nombre completo es requerido';
  }

  if (role === 'musician') {
    if (!data.location) {
      errors.location = 'La ubicación es requerida';
    }
    if (data.roles.length === 0) {
      errors.roles = 'Selecciona al menos un rol';
    }
  }

  if (role === 'business') {
    if (!data.businessName) {
      errors.businessName = 'El nombre del negocio es requerido';
    }
    if (!data.phone) {
      errors.phone = 'El teléfono es requerido';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const MUSICIAN_ROLES = [
  "Vocalista",
  "Guitarrista",
  "Bajista",
  "Baterista",
  "Tecladista",
  "Saxofonista",
  "Trompetista",
  "Percusionista",
  "Corista",
  "DJ",
  "Productor",
  "Otro"
];

export const BUSINESS_TYPES = [
  "Venue",
  "Bar",
  "Estudio de Grabación",
  "Sala de Ensayo",
  "Tienda de Instrumentos",
  "Escuela de Música",
  "Promotora",
  "Otro"
];