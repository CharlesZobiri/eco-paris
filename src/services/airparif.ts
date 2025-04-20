import axios from "axios";

const API_KEY = import.meta.env.VITE_AIRPARIF_API_KEY;
const API_BASE_URL = "https://api.airparif.fr";

const airparifApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-Api-Key": API_KEY,
  },
});

export async function getAirQualityByCommune(inseeCode: string) {
  try {
    const response = await airparifApi.get(`/indices/prevision/commune`, {
      params: { insee: inseeCode },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données Airparif :",
      error
    );
    throw error;
  }
}
