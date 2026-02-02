import React from "react";

const LoginSignupPage = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 bg-white w-full md:w-6/12 h-screen md:h-auto rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row">
        
        {/* LEFT IMAGE SECTION (Desktop only) */}
        <div className="hidden lg:flex relative w-1/2 bg-green-500">
          <img
            src="https://playo-website.gumlet.io/playo-website-v2/login-bg.png"
            alt="login-bg"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative z-10 flex items-center justify-center w-full">
            <img
              src="https://playo-website.gumlet.io/playo-website-v2/login-top.png"
              alt="login-illustration"
              className="w-11/12 object-contain"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2 px-6 sm:px-8 py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-6">
            <h2 className="text-xl font-semibold">Login / Sign Up</h2>
            <button onClick={onClose}>
              <img
                src="https://playo-website.gumlet.io/playo-website-v2/Hamburger.png"
                alt="close"
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* Form */}
          <div className="flex flex-col items-center mt-8 space-y-6">
            <div className="w-full">
              <label className="block mb-3 text-md font-medium text-mute_text">
                Enter Mobile No <span className="text-red-400">*</span>
              </label>

              <div className="flex">
                {/* Country Code */}
                <button className="flex items-center gap-2 h-12 px-3 border rounded-l-lg bg-white">
                  <span className="font-semibold">+91</span>
                  <img
                    src="https://flagcdn.com/20x15/in.png"
                    alt="IN"
                    className="w-5 h-4"
                  />
                </button>

                {/* Mobile Input */}
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  className="flex-1 h-12 px-3 border border-l-0 rounded-r-lg outline-none tracking-widest font-semibold"
                />
              </div>
            </div>

            {/* Send OTP */}
            <button
              disabled
              className="w-full p-3 rounded-lg bg-gray-100 text-[#758A80] font-semibold opacity-50 cursor-not-allowed"
            >
              Send OTP
            </button>

            {/* OR */}
            <div className="text-mute_text font-medium">or</div>

            {/* Social Login */}
            <div className="flex gap-10">
              
              {/* Email */}
              <div className="flex flex-col items-center gap-2">
                <button className="h-10 w-10 rounded-full border flex items-center justify-center">
                  <img
                    src="https://playo-website.gumlet.io/playo-website-v2/email-icon.png"
                    alt="email"
                    className="w-5 h-5"
                  />
                </button>
                <span>Email Id</span>
              </div>

              {/* Google */}
              <div className="flex flex-col items-center gap-2">
                <iframe
                  title="Google Sign In"
                  src="https://accounts.google.com/gsi/button?type=icon&shape=circle&size=large"
                  className="h-11 w-16 border-0"
                />
                <span>Google</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
