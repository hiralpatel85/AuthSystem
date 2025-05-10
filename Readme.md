# Customer and Admin Registration System

This project is a full-stack application built with **React.js**, **Node.js**, **Express**, and **MySQL**. It handles customer and admin registrations with role-based access, email verification, and admin-only login.

---

## ✨ **Features**

* **Customer Registration**
* **Admin Registration**
* **Email Verification** for both Customers and Admins
* **Role-based Access Control**
* **Admin Login Page** (restricted to verified Admins only)
* **Error Handling and Validation**

---

## 🗂️ **Project Structure**

```
├── auth-backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── utils
├── auth-portal
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── utils
├── .env
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

---

## ⚙️ **Installation & Setup**

### **1️⃣ Clone the repository**

```bash
git clone <repository-url>
cd <repository-name>
```

### **2️⃣ Install dependencies**

For both auth-portal and auth-backend, run the following commands:

```bash
cd auth-backend
npm install
cd auth-portal
npm install
```

### **3️⃣ Configure `.env` files**

Create a `.env` file in the `auth-backend` directory and add your configuration:

```env
SECRET_KEY=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password
DB_URL=connection_string
```

Create a `.env` file in the `auth-backend` directory and add your configuration:

```env
REACT_APP_BASE_URL=Backend_base_url
```

### **5️⃣ Start the application**

For auth-backend:

```bash
cd auth-backend
npm run start
```

For auth-portal:

```bash
cd auth-portal
npm run start
```

---

## 🚀 **Usage**

1. Visit `/register/customer` to register as a Customer.
2. Visit `/register/admin` to register as an Admin.
3. Upon registration, you will receive a verification code in your email.
4. Enter the verification code to activate your account.
5. Admins can log in at `/admin/login` if their account is verified.

---

## 🛡️ **Security**
* Passwords are hashed with bcrypt before storage.
* JWT is used for authentication.
* Email verification ensures only validated users can access the system.


