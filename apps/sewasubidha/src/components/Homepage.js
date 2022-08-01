import "../App.css";
import { React, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import getServicesListing from "../services/getServiceListing";
import getNearServiceProvider from "../services/getNearServiceProvider";
import requestForService from "../services/requestForService";
import requestServiceProviderById from "../services/requestServiceProviderById";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");
function Homepage() {
  const [user, setUser] = useContext(UserContext);
  const [serviceListings, setServiceListings] = useState([]);
  //fetches the data once for ui render
  useEffect(() => {
    const getResponseData = async () => {
      const responseData = await getServicesListing();
      setServiceListings(responseData);
    };
    getResponseData();
    setServiceSelected("");
    setProviderResponse(false);
    receivedProviderResponse.current = {};
  }, []);
  const [serviceSelected, setServiceSelected] = useState("");
  const [location, setLocation] = useState({});
  const [serviceProviders, setServiceProviders] = useState([]);
  const [finding, setFinding] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [providerResponse, setProviderResponse] = useState(false);
  const receivedProviderResponse = useRef({});
  socket.on(serviceId, (payload) => {
    receivedProviderResponse.current = payload;
    setProviderResponse(true);
    setFinding(false);
    // setProviderResponse(true);
  });
  async function findServiceProvider() {
    let serviceIdReceived = "";
    setFinding(true);
    return requestForService(serviceSelected, user.accessToken)
      .then((serviceIdGot) => {
        serviceIdReceived = serviceIdGot;
        setServiceId(serviceIdGot);
        return getNearServiceProvider(
          user.accessToken,
          [location.latitude, location.longitude],
          serviceSelected
        );
      })
      .then((serviceProviderList) => {
        if (serviceProviderList?.length === 0) {
          setNotFound(true);
          setFinding(false);
        }
        setServiceProviders(serviceProviderList);
        return requestServiceProviderById(
          serviceProviderList[0],
          user?.userData?.userId,
          serviceIdReceived,
          serviceSelected
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function onServiceSelect(serviceName) {
    setServiceSelected(serviceName);
  }
  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(coordinates);
      });
    }
  }

  return (
    <>
      <main className="homepage">
        {!user.accessToken ? (
          <h1>404 not found</h1>
        ) : (
          <>
            {serviceSelected === "" ? (
              <div className="serviceSelector">
                <h1 className="pageHeading">Select a service</h1>
                {serviceListings.map((serviceListObject, index) => {
                  return (
                    <button
                      key={index}
                      className="serviceNameCard"
                      onClick={() => {
                        getCurrentLocation();
                        onServiceSelect(serviceListObject?.name);
                      }}
                    >
                      {serviceListObject?.name}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="serviceUi">
                <button
                  onClick={() => {
                    setServiceSelected("");
                    setNotFound(false);
                    receivedProviderResponse.current = {};
                    setProviderResponse(false);
                  }}
                  className="goToHome"
                  style={{
                    background: "initial",
                    border: "initial",
                    color: "#C7C7C7",
                    textDecoration: "underline",
                  }}
                >
                  Home
                </button>
                <h1 className="serviceNameHolder">{serviceSelected}</h1>
                {finding ? <p>Finding service provider...</p> : <></>}
                {notFound ? (
                  <p>
                    No service provider available for {serviceSelected} service
                  </p>
                ) : (
                  <></>
                )}
                {providerResponse ? (
                  <>
                    <p>
                      {receivedProviderResponse.current.responseData.message}
                    </p>
                    <p>
                      Provider Name: {receivedProviderResponse.current.fullName}
                    </p>
                    <p>Mobile: {receivedProviderResponse.current.mobile}</p>
                    <p>
                      Provider ID:
                      {
                        receivedProviderResponse.current.responseData.service
                          .providerId
                      }
                    </p>
                  </>
                ) : (
                  <></>
                )}
                <button
                  className="findServiceProviderButton"
                  onClick={findServiceProvider}
                >
                  Find service provider
                </button>
              </div>
            )}
            <Link
              to={"/"}
              onClick={() => {
                //emptying the userState
                setUser({});
              }}
              className="logoutLink"
            >
              Logout
            </Link>
          </>
        )}
      </main>
    </>
  );
}
export default Homepage;
