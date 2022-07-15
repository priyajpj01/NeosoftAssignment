const Joi=require('@hapi/joi')


const loginValidation = (data) => {
 
  var re = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;
  const schema=Joi.object(
    {
    userID:Joi.string().pattern(re).min(10).required().messages({
      "string.empty": `"userID" cannot be an empty field`,
      "any.required": `"userID" is a required field`,
      "string.base": `"userID" should be a type of 'text'`,
    }),
    password:Joi.string().min(6).required().messages({
      "string.empty": `"password" cannot be an empty field`,
      "any.required": `"password" is a required field`,
      "string.min": `"password" should have a minimum length of 6`,
      "string.base": `"password" should be a type of 'text'`,
    })

    }
)
const validation = schema.validate(data);
return validation;
  };


  const registerValidation = (data) => {
 
    var re = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;
    const schema=Joi.object(
      {
      userID:Joi.string().pattern(re).min(10).required().messages({
        "string.empty": `"userID" cannot be an empty field`,
        "any.required": `"userID" is a required field`,
        "string.base": `"userID" should be a type of 'text'`,
      }),
      password:Joi.string().min(6).required().messages({
        "string.empty": `"password" cannot be an empty field`,
        "any.required": `"password" is a required field`,
        "string.min": `"password" should have a minimum length of 6`,
        "string.base": `"password" should be a type of 'text'`,
      }),
      role:Joi.string().required().messages({
        "string.empty": `"role" cannot be an empty field`,
        "any.required": `"role" is a required field`
      }),
      name:Joi.string().required().messages({
        "string.empty": `"name" cannot be an empty field`,
        "any.required": `"name" is a required field`
      }),
      owner:Joi.string().required().messages({
        "string.empty": `"owner" cannot be an empty field`,
        "any.required": `"owner" is a required field`
      })
  
      }
  )
  const validation = schema.validate(data);
  return validation;
    };
   
 
const checklistValidation = (data) => {
    const schema=Joi.object(
      {
      isExist:Joi.boolean().required().messages({
        "boolean.empty": `"isExist" cannot be an empty field`,
        "any.required": `"isExist" is a required field`
      }),
      category:Joi.string().required().messages({
        "string.empty": `"category" cannot be an empty field`,
        "any.required": `"category" is a required field`
      }),
      driverDetails:Joi.string().required().messages({
        "string.empty": `"driverDetails" cannot be an empty field`,
        "any.required": `"driverDetails" is a required field`
      }),
      img:Joi.string().required().messages({
        "string.empty": `"img" cannot be an empty field`,
        "any.required": `"img" is a required field`
      }),
      summary:Joi.string()
      }
  )
  const validation = schema.validate(data);
  return validation;
    };
    



module.exports.loginValidation = loginValidation;
module.exports.checklistValidation = checklistValidation;
module.exports.registerValidation = registerValidation;
