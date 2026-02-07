import User from "../model/Usermodel.js"
import crypto from "crypto"
import sendEmail from"../utils/sendEmail.js"
import process from "process"



export const signupUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    
    const user = await User.create({
      name,
      email,
      mobile,
      password,
      emailVerificationToken: token,
      emailVerificationExpires: Date.now() + 15 * 60 * 1000,
    });

    const verifyLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Verify your Playo account",
      html: `
        <h3>Welcome to Playo</h3>
        <p>Click below to verify your email:</p>
        <a href="${verifyLink}">Verify Email</a>
      `,
    });

    res.status(201).json({
  message: "Signup successful. Please verify your email.",
  userId: user._id,
});
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    //  AUTO LOGIN AFTER VERIFICATION
    const jwtToken = user.generateToken();

    res.json({
      message: "Email verified successfully",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Verify Email Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const loginUser = async (req, res) => {
  console.log("REQ BODY:", req.body);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Explicitly select password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  BLOCK LOGIN UNTIL EMAIL VERIFIED
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
    }

    //  LOGIN SUCCESS (NO OTP FOR NOW)
    const token = user.generateToken();

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error("Get Profile Error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
export const updateProfile = async (req, res) => {
  try {
    const { name, mobile } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, mobile },
      { new: true, runValidators: true }
    )

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    })

  } catch (error) {
    console.error("Update Profile Error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
