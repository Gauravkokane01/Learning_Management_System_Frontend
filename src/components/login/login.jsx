import React from "react";
import loginImg from "../../login.svg";
import { useState } from "react";
import ApiService from "../../ApiService";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [Role, setRole] = useState("");
  const [Status, setStatus] = useState();

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const onchangeHandle = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "role") {
      setRole(event.target.value);
    } else setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (Email === "" || Password === "" || Role === "") {
      MySwal.fire("Oops!", "Creadentials Required!!", "question");
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(Email)) {
        var LoginRequest = {
          email: Email,
          password: Password,
          role: Role,
        };
        console.log(LoginRequest);
        if (Email === "shilpi@gmail.com") {
          ApiService.AdminLogin(LoginRequest)
            .then((response) => {
              setUser(response.data);
              localStorage.setItem("user", response.data.email);
              localStorage.setItem("firstName", response.data.firstName);

              console.log("from backend" + response.data);
              navigate("/admin");
            })
            .catch((err) => {
              console.log(err.data);
              MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Inavlid credentials..!",
              });
            });
        } else if (Role === "student") {
          ApiService.Login(LoginRequest)
            .then((response) => {
              setUser(response.data);
              localStorage.setItem("std", response.data.distinct);
              localStorage.setItem("firstName", response.data.firstName);
              localStorage.setItem("stdId", response.data.distinctId);
              localStorage.setItem("studentId", response.data.studentId);
              localStorage.setItem("user", response.data.email);

              console.log("from backend" + response.data);
              console.log(response.data.status);
              if (response.data.status === "pending") {
                MySwal.fire({
                  icon: "error",
                  title: "Oops...",
                  text:
                    response.data.firstName +
                    " Your Registration Request is Pending!",
                });
                navigate("");
              } else if (response.data.status === "rejected") {
                MySwal.fire({
                  icon: "error",
                  title: "Oops...",
                  text:
                    response.data.firstName +
                    " Your Registration Request is Rejected!",
                });
                navigate("");
              } else {
                navigate("/student");
              }
            })
            .catch((err) => {
              console.log(err.data);
              MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Inavlid credentials..!",
              });
            });
        } else {
          ApiService.Login(LoginRequest)
            .then((response) => {
              setUser(response.data);
              localStorage.setItem("teacherId", response.data.teacherId);
              localStorage.setItem("firstName", response.data.firstName);
              localStorage.setItem("subject", response.data.distinct);
              localStorage.setItem("subjectId", response.data.distinctId);
              localStorage.setItem("user", response.data.email);

              console.log("from backend" + response.data);
              if (response.data.status === "pending") {
                MySwal.fire({
                  icon: "error",
                  title: "Oops...",
                  text:
                    response.data.firstName +
                    " Your Registration Request is Pending!",
                });
                navigate("");
              } else if (response.data.status === "rejected") {
                MySwal.fire({
                  icon: "error",
                  title: "Oops...",
                  text:
                    response.data.firstName +
                    " Your Registration Request is Rejected!",
                });
                navigate("");
              } else {
                navigate("/teacher");
              }
            })

            .catch((err) => {
              console.log(err.data);
              MySwal.fire({
                icon: "error",
                title: "Oops...",
                text: "Inavlid credentials..!",
              });
            });
        }
      } else {
        MySwal.fire("Oops!", "Creadentials Required!!", "question");
      }
    }
  };

  return (
    <div className="base-container">
      <div className="head">
        <font size="5">Login</font>
      </div>
      <div className="content">
        <div className="image">
          <img src={loginImg} />
        </div>
        <div className="form">
          <div className="inputClass">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input
                type="email"
                name="email"
                placeholder="username"
                onChange={onchangeHandle}
                required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={onchangeHandle}
                required
              />
            </div>
            <div className="form-group">
              <select
                name="role"
                onChange={onchangeHandle}
                defaultValue={"DEFAULT"}
              >
                <option disabled="disabled" value="DEFAULT">
                  --Select Role--
                </option>
                <option value="student">Student </option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="submit" className="btn btn-dark" onClick={handleLogin}>
          <font color="white">Login</font>
        </button>
      </div>
    </div>
  );
}
