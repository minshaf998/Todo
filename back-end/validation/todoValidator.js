const Joi = require("joi");

const todoSchema = Joi.object({
  note: Joi.string().min(1).max(15),
  userid: Joi.string().email(),
  isCompleted: Joi.boolean(),
});

module.exports = todoSchema;
