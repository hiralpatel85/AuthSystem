import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { LoginFormValues } from "../types";
import { adminLogin } from "../services/api";
import { toast } from "react-toastify";
import { setUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../redux/features/authSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await adminLogin(values.email, values.password);

        if (response.success) {
          dispatch(
            setUser({
              id: response.data.user?.id,
              firstName: response.data.user?.firstName,
              lastName: response.data.user?.lastName,
              email: response.data.user?.email,
              role: response.data.user?.role,
              isVerified: response.data.user?.isVerified,
            })
          );

          dispatch(setAuthToken(response.data.token));

          toast.success(response.message || "Login successful!");
        } else {
          toast.error(response.message || "Login failed");
        }
      } catch (error: any) {
        if (error?.data && error?.data?.isVerified === false) {
          navigate(`/verify?email=${values?.email}`);
        }
        toast.error(error?.message || "An error occurred during login");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
          Admin Login
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition duration-300"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
