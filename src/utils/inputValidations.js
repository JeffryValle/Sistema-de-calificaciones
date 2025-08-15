
export const name_validation = {
  name: 'name',
  label: 'Nombre',
  type: 'text',
  id: 'name',
  placeholder: 'Escribe tu nombre ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 50,
      message: 'Minimo 50 caracteres',
    },
  },
}

export const desc_validation = {
  name: 'description',
  label: 'description',
  multiline: true,
  id: 'description',
  placeholder: 'write description ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 200,
      message: '200 characters max',
    },
  },
}

export const password_validation = {
  name: 'password',
  label: 'Contraseña',
  type: 'password',
  id: 'password',
  placeholder: 'Escribe tu contraseña ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 6,
      message: 'Minimo 6 caracteres',
    },
  },
}

export const num_validation = {
  name: 'phone',
  label: 'Teléfono',
  type: 'number',
  id: 'phone',
  placeholder: 'Escribe tu teléfono',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
  },
}

export const email_validation = {
  name: 'email',
  label: 'Correo',
  type: 'email',
  id: 'email',
  placeholder: 'Escribe tu dirección de correo',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Debe ser un correo válido',
    },
  },
}