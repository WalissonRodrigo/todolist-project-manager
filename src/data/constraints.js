const constraints = {
  firstName: {
    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  lastName: {
    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  username: {
    length: {
      minimum: 2,
      maximum: 20,
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  emailAddress: {
    email: {
      message: "^Endereço de email inválido",
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  emailAddressConfirmation: {
    email: {
      message: "^A confirmação do endereço de email é inválida",
    },

    equality: {
      attribute: "emailAddress",
      message:
        "^A confirmação do endereço de email não é igual ao endereço de email",
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  password: {
    length: {
      minimum: 6,
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },

  passwordConfirmation: {
    equality: "password",

    length: {
      minimum: 6,
    },

    presence: {
      allowEmpty: false,
    },

    type: "string",
  },
};

export default constraints;
