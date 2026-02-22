import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../services/userservice";

function EditProfile() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔄 Populate form from logged-in user
  useEffect(() => {
    if (user) {
      const [firstName = "", lastName = ""] = user.name?.split(" ") || [];
      setForm({
        fname: firstName,
        lname: lastName,
        mobile: user.mobile || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    if (!user) return;
    const [firstName = "", lastName = ""] = user.name?.split(" ") || [];
    setForm({
      fname: firstName,
      lname: lastName,
      mobile: user.mobile || "",
      email: user.email || "",
    });
    setError("");
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        name: `${form.fname} ${form.lname}`.trim(),
        mobile: form.mobile,
      };

      const res = await updateProfile(payload);

      // 🔄 Sync updated user everywhere
      updateUser(res.data.user);

      alert("Profile updated successfully ✅");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full col-span-12 mb-20 bg-white border-2 border_container h-fit md:col-span-9 md:mb-0">
      <div className="p-3">
        <div className="px-2 lg:px-6">

          {/* Avatar */}
          <div className="flex flex-col items-center justify-center w-full h-44">
            <div className="relative flex flex-col items-center justify-center w-full text-2xl border-b-2 border-surface">
              <span className="absolute px-3 bg-white rounded-full">
                <img
                  src="https://playo-website.gumlet.io/playo-website-v3/icons/Avatar-man-specs.png"
                  alt="avatar"
                  className="rounded-full w-28 h-28 object-cover"
                />
              </span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="flex flex-col items-start justify-start w-full p-3 py-5 space-y-5">

          {error && (
            <div className="w-full text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="grid w-full gap-5 pb-8 border-b md:grid-cols-2">

            {/* First Name */}
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2 text-sm font-medium">
                Name <span className="ml-1 text-red-600">*</span>
              </label>
              <input
                name="fname"
                value={form.fname}
                onChange={handleChange}
                className="w-full h-10 px-3 border-2 border_container"
                placeholder="First Name"
              />
            </div>

            {/* Last Name */}
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2 text-sm font-medium">
                Last Name <span className="ml-1 text-red-600">*</span>
              </label>
              <input
                name="lname"
                value={form.lname}
                onChange={handleChange}
                className="w-full h-10 px-3 border-2 border_container"
                placeholder="Last Name"
              />
            </div>

            {/* Phone */}
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2 text-sm font-medium">
                Phone No.
              </label>
              <div className="flex flex-row space-x-3">
                <input
                  disabled
                  className="w-20 h-10 px-3 border-2 border_container text-gray-400"
                />
                <input
                  name="mobile"
                  value={form.mobile}
                  disabled
                  className="w-full h-10 px-3 border-2 border_container text-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="col-span-2 md:col-span-1">
              <label className="block mb-2 text-sm font-medium">
                Email <span className="ml-1 text-red-600">*</span>
              </label>
              <input
                name="email"
                value={form.email}
                disabled
                className="w-full h-10 px-3 border-2 border_container text-gray-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-end justify-end w-full space-x-5">
            <button
              onClick={handleReset}
              disabled={loading}
              className="px-5 h-10 bg-white font-semibold border border_container disabled:opacity-50"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="h-10 px-5 bg-primary text-white font-semibold border border_container disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditProfile;
