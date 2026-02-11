import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();   // ✅ get login function

  const token = searchParams.get("token");

  const [message, setMessage] = useState(
    token ? "Verifying your email..." : "Invalid verification link"
  );

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        const res = await api.get(`/users/verify-email?token=${token}`);

        // ✅ AUTO LOGIN HERE
        login(res.data.token, res.data.user);

        setMessage("Email verified successfully! Redirecting...");

        setTimeout(() => navigate("/"), 1500);

      } catch (error) {
        setMessage("Verification link expired or invalid");
      }
    };

    verifyEmail();
  }, [token, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
      {message}
    </div>
  );
};

export default VerifyEmail;
