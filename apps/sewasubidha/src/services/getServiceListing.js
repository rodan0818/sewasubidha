import axios from "../api/axios";
const URL = "/services-list";

export default async function getServicesListing() {
  const response = await axios.get(URL);
  return response.data;
}
