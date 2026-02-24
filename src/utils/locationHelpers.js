// src/utils/locationHelpers.js

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
        const res = await fetch(
          `http://localhost:5000/api/location/reverse?lat=${lat}&lng=${lng}`
        );
        const data = await res.json();

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
