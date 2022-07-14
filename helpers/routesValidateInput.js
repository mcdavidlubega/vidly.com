const Joi = require('joi');

//Joi validation function
function validateInput(reqBody) {
  const schema = {
    id: Joi.number(),
    genre: Joi.string().min(3).required(),
  };

  const { error } = Joi.validate(reqBody, schema);

  return error;
}

module.exports = validateInput;
