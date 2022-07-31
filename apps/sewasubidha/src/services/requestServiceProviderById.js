import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export default function requestServiceProviderById(
  serviceProviderId,
  userId,
  serviceId
) {
  socket.emit(`${serviceProviderId}`, { userId, serviceId });
}
