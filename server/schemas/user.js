module.exports = {
  loginSchema: {
    type: "object",
    properties: {
      email: {type: 'string'},
      password: {type: 'string'},
    },
    required: ['email', 'password']
  },

  registerSchema: {
    type: "object",
    properties: {
      name: {type: "string"},
      email: {type: "string"},
      password: {type: "string"},
      user_type: {enum: ["customer", "farmer"]}
    },
    required: ["name", "email", "password", "user_type"]
  }
}