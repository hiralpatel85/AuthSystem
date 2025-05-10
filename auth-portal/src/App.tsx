import { Navigate, Route, Routes } from "react-router-dom";
import CustomerRegister from "./pages/CustomerRegistartion";
import AdminRegister from "./pages/AdminRegistration";
import VerifyEmail from "./pages/VerifyEmail";
import AdminLogin from "./pages/AdminLogin";
import AuthLayout from "./components/AuthLayout";
import { useSelector } from "react-redux";
import { RootState } from "./types";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/dashboard" element={<Dashboard />} />
      ) : (
        <>
          <Route path="/" element={<AuthLayout type="register" />} />
          <Route path="/register/customer" element={<CustomerRegister />} />
          <Route path="/register/admin" element={<AdminRegister />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </>
      )}

      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
    </Routes>
  );
}

export default App;
