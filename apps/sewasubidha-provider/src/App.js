import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { db } from "./db";
import acceptRequest from "./services/respondToRequest";
const socket = io.connect("http://localhost:3001");

function App() {
  const [incomingService, setIncomingService] = useState([]);
  const [newService, setNewService] = useState({});
  async function acceptServiceRequest(serviceId) {
    acceptRequest(serviceId, db.acessToken).then((responseData) => {
      console.log(`Request accepted SID:${serviceId}`);
      console.log(incomingService);
      console.log(responseData);
      const newIncomingServices = incomingService.filter(
        (service) => service.serviceId !== serviceId
      );
      setIncomingService(newIncomingServices);
      socket.emit(serviceId, {
        responseData,
        mobile: db.mobile,
        fullName: db.fullName,
      });
      alert(responseData.message);
    });
  }
  useEffect(() => {
    if (Object.keys(newService).length !== 0) {
      setIncomingService((oldValues) => [newService, ...oldValues]);
      setNewService({});
    }
  }, [newService]);
  //hardcoded service provider Id
  socket.on(db.serviceProviderId, (payload) => {
    setNewService(payload);
  });
  return (
    <>
      {incomingService.length > 0 ? (
        <main className="App m-3">
          {incomingService.map((service, index) => {
            return (
              <div key={index} className="m-3 p-3 border border-primary">
                <h3>ServiceName: {service.serviceName}</h3>
                <p>UserId: {service.userId}</p>
                <p>ServiceId: {service.serviceId}</p>
                <button
                  className="btn btn-success m-3"
                  onClick={() => {
                    acceptServiceRequest(service.serviceId);
                  }}
                >
                  Accept
                </button>{" "}
                <button className="btn btn-danger m-3">Ignore</button>
              </div>
            );
          })}
        </main>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
