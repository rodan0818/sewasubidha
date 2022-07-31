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
  }, []);

  // console.log(user);

  return (
    <>
      <main className="homepage">
        {!user.accessToken ? (
          <h1>404 not found</h1>
        ) : (
          <>
            <h2 className="pageHeading">Select a service</h2>
            {serviceListings.map((serviceListObject, index) => {
              return <button key={index}>{serviceListObject?.name}</button>;
            })}
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
