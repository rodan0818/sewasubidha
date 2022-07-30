import "../App.css";
import { React, useContext } from "react";
import { UserContext } from "../App";
function Homepage() {
  const user = useContext(UserContext)[0];
  console.log(user);
  return (
    <>
      <main className="homepage">
        {user.accessToken ? (
          <h1>UserId:{user?.userData?.userId}</h1>
        ) : (
          <h1>404 not found</h1>
        )}
      </main>
    </>
  );
}
export default Homepage;
