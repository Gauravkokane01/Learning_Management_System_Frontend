import { React, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";

function Teacher() {
  let navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
  });
  return (
    <div>
      <div>
        <Navbar firstName={localStorage.getItem("firstName")} />
      </div>
    </div>
  );
}

export default Teacher;
