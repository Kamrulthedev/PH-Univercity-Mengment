import Joi from "joi";

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-zA-Z]*$/, "capitalize")
    .messages({
      "string.max":
        "First name must be less than or equal to 20 characters long",
      "string.empty": "First name is required",
      "string.pattern.name": "{#label} should start with a capital letter",
    }),
  middleName: Joi.string().required().messages({
    "string.empty": "Middle name is required",
  }),
  lastName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z]+$/, "alpha")
    .messages({
      "string.empty": "Last name is required",
      "string.pattern.name": "{#label} must only contain alphabetic characters",
    }),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Local guardian name is required",
  }),
  occupation: Joi.string().required().messages({
    "string.empty": "Local guardian occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Local guardian contact number is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Local guardian address is required",
  }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.empty": "Father name is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.empty": "Father contact number is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.empty": "Father occupation is required",
  }),
  fatherAddress: Joi.string().required().messages({
    "string.empty": "Father address is required",
  }),
  motherName: Joi.string().required().messages({
    "string.empty": "Mother name is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.empty": "Mother contact number is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.empty": "Mother occupation is required",
  }),
  motherAddress: Joi.string().required().messages({
    "string.empty": "Mother address is required",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string(),
  name: userNameSchema.required().messages({
    "object.base": "Student name is required",
  }),
  gender: Joi.string().required().messages({
    "string.empty": "Gender is required",
  }),
  dateOfBirth: Joi.date().iso().required().messages({
    "date.format": "Date of birth must be in ISO format",
    "any.required": "Date of birth is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "{#value} is not a valid email",
    "string.empty": "Email is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact number is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.empty": "Emergency contact number is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "any.only": "Invalid blood group",
    }),
  presentAddress: Joi.string().required().messages({
    "string.empty": "Present address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "string.empty": "Permanent address is required",
  }),
  guardians: guardianSchema.required().messages({
    "object.base": "Guardians information is required",
  }),
  localGuardian: localGuardianSchema.required().messages({
    "object.base": "Local guardian information is required",
  }),
  profileImg: Joi.string().uri().messages({
    "string.uri": "Profile image must be a valid URL",
  }),
  isActive: Joi.string().valid("active", "block").required().messages({
    "any.only": "Active status must be either active or block",
    "string.empty": "Active status is required",
  }),
});


export default studentValidationSchema;