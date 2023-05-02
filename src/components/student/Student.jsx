import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import React, { useEffect } from "react";
function Student() {
  let navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
  });

  return (
    <div>
      <Navbar
        firstName={localStorage.getItem("firstName")}
        std={localStorage.getItem("std")}
      />
      <div className="home">
        <h1 style={{ color: "Blue" }}>Hello</h1>
      </div>
    </div>
  );
}

export default Student;
