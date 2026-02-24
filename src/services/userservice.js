import api from "./api";

// GET profile
export const getProfile = () => {
  return api.get("/users/profile");
};

// UPDATE profile
export const updateProfile = (data) => {
  return api.put("/users/profile", data);
};
