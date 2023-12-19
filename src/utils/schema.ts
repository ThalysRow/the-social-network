import joi from "joi";

export const newUser = joi.object({
  name: joi
    .string()
    .required()
    .max(50)
    .custom((name, helpers) => {
      if (name.trim() === "") {
        return helpers.message({ message: "Format name invalid" });
      }
    })
    .messages({
      "string.empty": "The name field cannot be empty",
      "any.required": "The name field is required",
      "string.max": "The name field must have a maximum of 50 characters",
      custom: "Format name invalid",
    }),

  email: joi.string().email().required().messages({
    "string.empty": "The email field cannot be empty",
    "any.required": "The email field is required",
    "string.email": "Email invalid format",
  }),

  user_name: joi
    .string()
    .required()
    .max(10)
    .custom((name, helpers) => {
      if (name.trim() === "") {
        return helpers.message({ message: "Format name invalid" });
      }
    })
    .messages({
      "string.empty": "The username field cannot be empty",
      "any.required": "The username field is required",
      "string.max": "The username field must have a maximum of 10 characters",
      custom: "Format name invalid",
    }),

  password: joi
    .string()
    .required()
    .max(20)
    .min(8)
    .custom((pass, helpers) => {
      if (pass.trim() === "" || pass.includes(" ")) {
        return helpers.message({
          message: "Please check your password, no space allowed",
        });
      }
    })
    .messages({
      "string.empty": "The password field cannot be empty",
      "any.required": "The password field is required",
      "string.max": "The password field must have a maximum of 20 characters",
      "string.min": "The password field must have a minimum of 8 characters",
      custom: "Please check your password, no space allowed",
    }),

  photo: joi
    .string()
    .required()
    .custom((url, helpers) => {
      if (url.trim() === "") {
        return helpers.message({ message: "Photo format invalid" });
      }
    })
    .messages({
      "string.empty": "The photo field cannot be empty",
      "any.required": "The photo field is required",
      custom: "Photo format invalid",
    }),
});

export const updateUser = joi.object({
  name: joi
    .string()
    .max(50)
    .custom((name, helpers) => {
      if (name.trim() === "") {
        return helpers.message({ message: "Format name invalid" });
      }
    })
    .messages({
      "string.empty": "The name field cannot be empty",
      "string.max": "The name field must have a maximum of 50 characters",
      custom: "Format name invalid",
    }),

  password: joi
    .string()
    .max(20)
    .min(8)
    .custom((password, helpers) => {
      if (password.trim() === "" || password.includes(" ")) {
        return helpers.message({
          message: "Please check your password, no space allowed",
        });
      }
    })
    .messages({
      "string.empty": "The password field cannot be empty",
      "string.max": "The password field must have a maximum of 20 characters",
      "string.min": "The password field must have a minimum of 8 characters",
      custom: "Please check your password, no space allowed",
    }),

  email: joi.string().email().messages({
    "string.empty": "The email field cannot be empty",
    "string.email": "Email invalid format",
  }),

  user_name: joi
    .string()
    .max(10)
    .custom((name, helpers) => {
      if (name.trim() === "") {
        return helpers.message({ message: "Format user_name invalid" });
      }
    })
    .messages({
      "string.empty": "The user_name field cannot be empty",
      "string.max": "The user_name field must have a maximum of 10 characters",
      custom: "Format name invalid",
    }),

  photo: joi
    .string()
    .custom((url, helpers) => {
      if (url.trim() === "") {
        return helpers.message({ message: "Url invalid" });
      }
    })
    .messages({
      "string.empty": "The photo field cannot be empty",
      custom: "Format photo invalid",
    }),
});
