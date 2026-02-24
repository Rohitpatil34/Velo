import api from "./api";


export const fetchVenues = async ({
  lat,
  lng,
  sport,
  page = 1,
  limit = 9,
}) => {
  try {
    const response = await api.get(`/venues`, {
      params: {
        lat,
        lng,
        sport,
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Fetch venues error:", error);
    throw error;
  }
};
export const fetchVenueById = async (id) => {
  try {
    const response = await api.get(`/venues/${id}`);
    return response.data;
  } catch (error) {
    console.error("Fetch venue by ID error:", error);
    throw error;
  }
};