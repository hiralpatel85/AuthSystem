const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendVerificationEmail } = require("../services/email-service");
const {
  generateVerificationCode,
  addMinutes,
} = require("../utils/generateVerificationCode");
const jwt = require("jsonwebtoken");
const { responseFormat, validatePassword } = require("../helper");

// Customer Registration
exports.customerRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json(
          responseFormat(
            400,
            false,
            null,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
          )
        );
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json(
          responseFormat(
            400,
            false,
            null,
            "User with this email already exists."
          )
        );
    }

    const newUser = User.build({
      firstName,
      lastName,
      email,
      password,
      role: "customer",
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();
    const verificationExpiry = addMinutes(new Date(), 5);

    newUser.password = hashedPassword;
    newUser.verificationCode = verificationCode;
    newUser.verificationExpiry = verificationExpiry;

    await newUser.save();

    await sendVerificationEmail(email, verificationCode);

    res
      .status(201)
      .json(
        responseFormat(
          201,
          true,
          newUser,
          "Registration successful. Please verify your email."
        )
      );
  } catch (error) {
    console.error(error.message);
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json(responseFormat(400, false, null, error.errors[0].message));
    }
    res
      .status(500)
      .json(responseFormat(500, false, null, "Error registering user."));
  }
};

// Admin Registration
exports.adminRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json(
          responseFormat(
            400,
            false,
            null,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
          )
        );
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json(
          responseFormat(
            400,
            false,
            null,
            "User with this email already exists."
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();
    const verificationExpiry = addMinutes(new Date(), 5);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin",
      verificationCode,
      verificationExpiry,
    });

    await sendVerificationEmail(email, verificationCode);

    res
      .status(201)
      .json(
        responseFormat(
          201,
          true,
          newUser,
          "Admin registration successful. Please verify your email."
        )
      );
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json(responseFormat(500, false, null, "Error registering admin."));
  }
};

// Resend Verification Code
exports.resendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json(responseFormat(404, false, null, "User not found."));
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json(responseFormat(400, false, null, "User is already verified."));
    }

    const newVerificationCode = generateVerificationCode();
    user.verificationCode = newVerificationCode;
    user.verificationExpiry = addMinutes(new Date(), 5);
    await user.save();

    await sendVerificationEmail(email, newVerificationCode);

    res
      .status(200)
      .json(
        responseFormat(
          200,
          true,
          null,
          "Verification code resent successfully."
        )
      );
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json(
        responseFormat(500, false, null, "Error resending verification code.")
      );
  }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json(responseFormat(404, false, null, "User not found."));
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json(responseFormat(400, false, null, "User is already verified."));
    }

    if (user.verificationCode !== verificationCode) {
      return res
        .status(400)
        .json(responseFormat(400, false, null, "Invalid verification code."));
    }
    if (new Date() > user.verificationExpiry) {
      return res
        .status(400)
        .json(
          responseFormat(
            400,
            false,
            null,
            "Verification code expired. Please resend the code."
          )
        );
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationExpiry = null;
    await user.save();

    res
      .status(200)
      .json(responseFormat(200, true, null, "Email verified successfully."));
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json(responseFormat(500, false, null, "Error verifying email."));
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json(
          responseFormat(
            400,
            false,
            null,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long"
          )
        );
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json(responseFormat(404, false, null, "User not found."));
    }
    
    if (user?.role !== "admin") {
      return res
        .status(400)
        .json(
          responseFormat(
            404,
            false,
            null,
            "You are not allowed to login from here"
          )
        );
    }
    if (!user.isVerified) {
      const newVerificationCode = generateVerificationCode();
      user.verificationCode = newVerificationCode;
      user.verificationExpiry = addMinutes(new Date(), 5);
      await user.save();

      await sendVerificationEmail(email, newVerificationCode);

      return res
        .status(400)
        .json(
          responseFormat(
            400,
            false,
            { isVerified: user.isVerified },
            "Please verify your email before logging in."
          )
        );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json(responseFormat(400, false, null, "Invalid credentials."));
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json(responseFormat(200, true, { token, user }, "Login successful."));
  } catch (error) {
    console.error(error.message);
    res.status(500).json(responseFormat(500, false, null, "Error logging in."));
  }
};
