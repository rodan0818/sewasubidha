import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import { React, createContext, useState } from "react";
import "./App.css";

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <main>
        <UserContext.Provider value={[user, setUser]}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Homepage />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </main>
    </>
  );
}

export default App;
