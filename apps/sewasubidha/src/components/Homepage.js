import "../App.css";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import getServicesListing from "../services/getServiceListing";
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
  }, []);
  const [serviceSelected, setServiceSelected] = useState("");

  async function onServiceSelect(serviceName) {
    setServiceSelected(serviceName);
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
                <h1>{serviceSelected}</h1>
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
