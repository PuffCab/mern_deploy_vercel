import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Travel App</h1>
      <hr />
      <Register />
      <hr />
      <Login />
      <hr />
      <Profile />
    </>
  );
}

export default App;
