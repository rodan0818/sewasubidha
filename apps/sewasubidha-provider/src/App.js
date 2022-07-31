import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");
function App() {
  const [incomingService, setIncomingService] = useState([]);
  const [newService, setNewService] = useState({});
  useEffect(() => {
    if (Object.keys(newService).length !== 0) {
      setIncomingService((oldValues) => [newService, ...oldValues]);
      setNewService({});
    }
  }, [newService]);
  //hardcoded service prvider Id
  socket.on("62e1300b4b8dcb57d42f8a2f", (payload) => {
    // setIncomingService((prevState) => {
    //   return [...prevState, payload];
    // });
    // setIncomingService((oldValues) => [payload, ...oldValues]);
    setNewService(payload);
  });
  console.log(incomingService);
  return (
    <>
      {incomingService.length > 0 ? (
        <div>
          {incomingService.map((service, index) => {
            return (
              <div key={index}>
                <h3>ServiceName: {service.serviceName}</h3>
                <p>UserId: {service.userId}</p>
                <p>ServiceId: {service.serviceId}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
