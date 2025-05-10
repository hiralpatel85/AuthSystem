import RoleSwitcher from "./RoleSwitcher";

const AuthLayout = ({ type }: { type: "register" | "login" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          {type === "register" ? "Register as" : "Login as"}
        </h2>
        <RoleSwitcher />
      </div>
    </div>
  );
};

export default AuthLayout;
