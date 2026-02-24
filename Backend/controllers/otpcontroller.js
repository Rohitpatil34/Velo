import Otp from "../model/otpmodel.js";
import User from "../model/Usermodel.js";

// Generate random 6 digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpCode = generateOtp();

    await Otp.create({
      userId,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
    });

    console.log(`OTP for ${user.mobile}: ${otpCode}`);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const otpRecord = await Otp.findOne({ userId, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await User.findByIdAndUpdate(userId, { isVerified: true });

    await Otp.deleteMany({ userId });

    res.json({ message: "Account verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
