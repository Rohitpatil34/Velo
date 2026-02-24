import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; 
// change 5000 if your backend runs on different port

export const fetchVenues = async ({
  lat,
  lng,
  sport,
  page = 1,
  limit = 9,
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/venues`, {
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
    const response = await axios.get(`${BASE_URL}/venues/${id}`);
    return response.data;
  } catch (error) {
    console.error("Fetch venue by ID error:", error);
    throw error;
  }
};