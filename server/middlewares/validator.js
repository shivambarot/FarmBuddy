const Ajv = require("ajv")
const ajv = new Ajv({allErrors:true})

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const validate = ajv.compile(schema)
      if (!validate(req.body)) {
        return res.status(412).json(validate.errors)
      }
      next()
    }
  }
}
