import axios from "../api/axios";
const URL = "/services/accept";
export default async function acceptRequest(serviceId, token) {
  const response = await axios.post(
    URL,
    JSON.stringify({
      serviceId,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response?.data;
}
