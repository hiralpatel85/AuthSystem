import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RoleSwitcher = () => {
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  return (
    <div className="text-center mb-4">
      <div className="flex justify-center gap-4 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded shadow ${
            role === "customer" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            navigate("/register/customer");
            setRole("customer");
          }}
        >
          Customer
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded shadow ${
            role === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            navigate("/register/admin");
            setRole("admin");
          }}
        >
          Admin
        </motion.button>
      </div>
    </div>
  );
};

export default RoleSwitcher;
