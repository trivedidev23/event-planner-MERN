import { useFormik } from "formik";
import TextInput from "../../components/common/fields/TextInput";
import * as Yup from "yup";
import { passwordRegExp, phoneRegExp } from "../../utils/regex";
import { useRegisterMutation } from "../../services/userApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../store/slices/authSlice";

const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    password: Yup.string()
      .matches(
        passwordRegExp,
        "Password should have minimum eight and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => await handleSubmit(values),
  });

  const handleSubmit = async (values) => {
    try {
      const { confirmPassword, ...payload } = values;
      const data = await register(payload).unwrap();
      if (data?.success) {
        dispatch(setIsAuthenticated(true));
        navigate("/");
      }
      if (data?.message) toast.success(data.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-2">Register</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <TextInput
                    label="Name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values?.name}
                    onBlur={formik.handleBlur}
                    err={formik.errors?.name && formik.touched?.name}
                    errorMessage={formik.errors?.name}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    label="Email"
                    name="email"
                    type={"email"}
                    onChange={formik.handleChange}
                    value={formik.values?.email}
                    onBlur={formik.handleBlur}
                    err={formik.errors?.email && formik.touched?.email}
                    errorMessage={formik.errors?.email}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    label="Phone"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values?.phone}
                    onBlur={formik.handleBlur}
                    err={formik.errors?.phone && formik.touched?.phone}
                    errorMessage={formik.errors?.phone}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    label="Password"
                    name="password"
                    type={"password"}
                    onChange={formik.handleChange}
                    value={formik.values?.password}
                    onBlur={formik.handleBlur}
                    err={formik.errors?.password && formik.touched?.password}
                    errorMessage={formik.errors?.password}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values?.confirmPassword}
                    onBlur={formik.handleBlur}
                    err={
                      formik.errors?.confirmPassword &&
                      formik.touched?.confirmPassword
                    }
                    errorMessage={formik.errors?.confirmPassword}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
              <Link to="/login">Already registered? Login here.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
