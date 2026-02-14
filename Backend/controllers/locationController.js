export const reverseGeocode = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          "User-Agent": "VeloApp/1.0 (contact@velo.app)",
          "Accept": "application/json",
        },
      }
    );

    const data = await response.json();

    const address = data.address || {};

    res.json({
      city:
        address.city ||
        address.town ||
        address.village ||
        address.state ||
        "",
      area:
        address.suburb ||
        address.neighbourhood ||
        address.county ||
        "",
    });
  } catch (err) {
    console.error("Reverse Geocode Error:", err);
    res.status(500).json({ message: "Reverse geocode failed" });
  }
};
export const searchLocation = async (req, res) => {
  try {
    const { q } = req.query;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${q}&addressdetails=1&limit=5`,
      {
        headers: {
          "User-Agent": "VeloApp/1.0 (contact@velo.app)",
        },
      }
    );

    const data = await response.json();

    const results = data.map((place) => ({
      city:
        place.address.city ||
        place.address.town ||
        place.address.village ||
        "",
      area:
        place.address.suburb ||
        place.address.neighbourhood ||
        "",
      lat: place.lat,
      lng: place.lon,
      display: place.display_name,
    }));

    res.json(results);
  } catch (err) {
    console.error("Search location failed", err);
    res.status(500).json({ message: "Search failed" });
  }
};
