// src/utils/locationHelpers.js

import axios from "axios";

export const detectCurrentLocation = async (setLocation) => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  setLocation((prev) => ({ ...prev, loading: true }));

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      try {
        // ⚠️ Use backend proxy (NO CORS issue)
        const { data } = await axios.get(
          "/location/reverse",
          {
            params: { lat, lng }
          }
        );

        setLocation({
          lat,
          lng,
          city: data.city || "Unknown",
          area: data.area || "",
          loading: false,
        });
      } catch (err) {
        alert("Failed to detect location");
        setLocation((prev) => ({ ...prev, loading: false }));
      }
    },
    () => {
      alert("Location permission denied");
      setLocation((prev) => ({ ...prev, loading: false }));
    }
  );
};
