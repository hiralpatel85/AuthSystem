import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { verifyEmailSchema } from "../utils/validationSchema";
import { VerifyFormValues } from "../types";
import { verifyEmail, resendVerificationCode } from "../services/api";
import { toast } from "react-toastify";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
 
  useEffect(() => {
    formik.setFieldValue("code", otp.join(""));
  }, [otp]);

  const handleResendCode = async () => {
    try {
       formik.setFieldValue("code", "");
       setOtp(Array(6).fill(""))
      setIsResending(true);
      await resendVerificationCode(email);
      toast.success("Verification code resent successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsResending(false);
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target as HTMLInputElement);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  const formik = useFormik<VerifyFormValues>({
    initialValues: {
      code: otp.join(""),
    },
    validationSchema: verifyEmailSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const resp = await verifyEmail(email, otp.join(""));
        toast.success(resp?.message || "Verification successful!");
        navigate("/admin/login");
      } catch (error: any) {
        toast.error(error?.message);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-pink-500 to-purple-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Verify Email
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6 flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onPaste={handlePaste}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
                className="w-[48px] p-2 border border-gray-300 text-center text-xl rounded-md focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>

          {formik.touched.code && formik.errors.code && (
            <div className="text-red-600 text-sm mb-4">
              {formik.errors.code}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-teal-400 to-pink-500 text-white py-2 px-4 rounded-md hover:shadow-lg transition duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </motion.button>

          <button
            type="button" 
            onClick={handleResendCode}
            disabled={isResending}
            className="w-full mt-3 text-blue-900 z-10 cursor-pointer hover:underline disabled:text-gray-500"
          >
            {"Resend Verification Code"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
