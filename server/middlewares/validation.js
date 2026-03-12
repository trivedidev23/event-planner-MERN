const Yup = require("yup");
const { passwordRegExp, phoneRegExp } = require("../utils/common");

const registerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Name is required"),
  password: Yup.string()
    .matches(
      passwordRegExp,
      "Password should have minimum eight and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    )
    .required("Password is required"),
});

const loginSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .matches(
      passwordRegExp,
      "Password should have minimum eight and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    )
    .required("Password is required"),
});

const eventSchema = Yup.object({
  title: Yup.string().required("Event title is required"),
  description: Yup.string().nullable().notRequired(),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "end date can't be before start date")
    .required("End date is required"),
  recurranceType: Yup.string().required("Recurrance type is required"),
});

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.errors });
  }
};

module.exports = { validate, registerSchema, loginSchema, eventSchema };
