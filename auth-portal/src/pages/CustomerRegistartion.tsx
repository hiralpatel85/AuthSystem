import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { RegisterFormValues } from "../types";
import { registerCustomer } from "../services/api";
import { validationSchema } from "../utils/validationSchema";

const CustomerRegister = () => {
  const navigate = useNavigate();

  const initialValues: RegisterFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerCustomer(
          values.firstName,
          values.lastName,
          values.email,
          values.password
        );

        if (response.success) {
          toast.success(
            response?.data?.message ||
              "Customer registration successfully. Please verify your email."
          );
          navigate(`/verify?email=${response?.data?.email}`, {
            state: { email: values.email },
          });
        } else {
          toast.error(response.message || "Registration failed");
        }
      } catch (error: any) {
        toast.error(error?.message || "Registration failed");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Customer Registration
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-600 text-sm">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-600 text-sm">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg"
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
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg"
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CustomerRegister;
