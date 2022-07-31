import axios from "../api/axios";
const URL = "/locations/near";

export default async function getNearServiceProvider(
  token,
  coordinates,
  serviceName
) {
  const response = await axios.post(
    URL,
    JSON.stringify({
      coordinates: [coordinates[0], coordinates[1]],
      serviceName: serviceName,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      withCredentials: true,
    }
  );
  return response?.data;
}
