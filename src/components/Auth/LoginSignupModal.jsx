import { Dialog } from "@headlessui/react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";



const LoginSignupModal = ({ isOpen, onClose }) => {
  // form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  // auth states
  const [mode, setMode] = useState("login"); // login | signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {login} = useAuth();
    // ✅ RESET MODAL STATE WHEN IT OPENS
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setAgree(false);
      setMode("login");
      setError("");
      setSuccess("");
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!agree) {
      setError("Please accept Terms & Privacy Policy");
      return;
    }

    try {
      setLoading(true);

      if (mode === "signup") {
        await api.post("/users/signup", {
          name: email.split("@")[0], // temporary
          email,
          mobile: "9999999999", // temporary
          password,
        });

        setSuccess("Signup successful. Please verify your email.");
      }

      if (mode === "login") {
        const res = await api.post("/users/login", {
          email,
          password,
        });
       login(res.data.token,res.data.user)
        setSuccess("Login successful!");
        onClose();
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      <div className="flex min-h-screen md:items-center md:justify-center">
        <Dialog.Panel className="w-full h-screen md:h-auto md:w-6/12 max-w-5xl bg-white rounded-none md:rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          
          {/* LEFT IMAGE */}
          <div className="hidden lg:flex w-1/2 relative bg-green-500">
            <img
              src="https://playo-website.gumlet.io/playo-website-v2/login-bg.png"
              alt="login-bg"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <img
              src="https://playo-website.gumlet.io/playo-website-v2/login-top.png"
              alt="login-top"
              className="relative z-10 m-auto w-11/12 object-contain"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full h-full bg-white lg:w-1/2 px-6 sm:px-8 py-8 relative">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-6 text-xl font-semibold">
              <span>Login / Sign Up</span>
              <button onClick={onClose} className="text-2xl hover:opacity-70">
                ✕
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-4 mt-4 text-sm">
              <button
                onClick={() => setMode("login")}
                className={mode === "login" ? "text-green-600 font-semibold" : "text-gray-400"}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={mode === "signup" ? "text-green-600 font-semibold" : "text-gray-400"}
              >
                Sign Up
              </button>
            </div>

            {/* Messages */}
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
            {success && <p className="mt-4 text-green-600 text-sm">{success}</p>}

            {/* Form */}
            <div className="mt-8 space-y-6">
              
              {/* Email */}
              <div>
                <label className="block mb-2 text-md font-medium text-gray-500">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg px-4 h-12 w-full outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-md font-medium text-gray-500">
                  Password *
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-lg px-4 h-12 w-full outline-none"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="mt-1 h-4 w-4 accent-green-500 cursor-pointer"
                />
                <p className="text-sm text-gray-500">
                  By continuing, you agree to our{" "}
                  <span className="text-green-600 font-medium">Terms</span> &{" "}
                  <span className="text-green-600 font-medium">Privacy Policy</span>.
                </p>
              </div>

              {/* Continue Button */}
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full p-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Continue"}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LoginSignupModal;
