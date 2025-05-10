import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { motion } from "framer-motion";
import { RootState } from "../types";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user); 

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 p-8 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
          Welcome to the {user.role === "customer" ? "Customer" : "Admin"} Dashboard
        </h1>
        <div className="text-center">
          {user.role === "customer" ? (
            <motion.div
              className="bg-blue-100 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xl font-semibold text-gray-800">Welcome, {user.firstName}!</p>
              <p className="mt-4 text-gray-600">Here you can manage your personal details and view your orders.</p>
            </motion.div>
          ) : (
            <motion.div
              className="bg-green-100 p-6 rounded-xl shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xl font-semibold text-gray-800">Welcome, Admin {user.firstName}!</p>
              <p className="mt-4 text-gray-600">Here you can manage all users and view system reports.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
