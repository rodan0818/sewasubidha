import axios from "../api/axios";
const URL = "/services/request";

export default async function requestForService(serviceName, token) {
  const response = await axios.post(
    URL,
    JSON.stringify({
      serviceName,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response?.data.service?._id;
}
