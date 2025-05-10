import { Route, Routes } from "react-router-dom";
import CustomerRegister from "./pages/CustomerRegistartion";
import AdminRegister from "./pages/AdminRegistration";
import VerifyEmail from "./pages/VerifyEmail";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/register/customer" element={<CustomerRegister />} />
      <Route path="/register/admin" element={<AdminRegister />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
