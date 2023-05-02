import React from "react";
import ApiService from "../../ApiService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import CheckInlineExample from "./inlineRadio";
import Form from "react-bootstrap/Form";

export function Register() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Gender, setGender] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [Role, setRole] = useState("");
  const [Distinct, setDistinct] = useState("");

  // let Navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const handleOnChange = (event) => {
    if (event.target.name === "firstName") setFirstName(event.target.value);
    else if (event.target.name === "lastName") setLastName(event.target.value);
    else if (event.target.name === "gender") setGender(event.target.value);
    else if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "password") setPassword(event.target.value);
    else if (event.target.name === "cPassword")
      setCPassword(event.target.value);
    else if (event.target.name === "role") setRole(event.target.value);
    else if (event.target.name === "distinct") setDistinct(event.target.value);
  };

  const Validate = (event) => {
    // var password = event.target.value;
    // var confirmPassword = event.target.value;
    if (Password !== CPassword) {
      MySwal.fire(
        "Oops!",
        "Passord and Confirm Password Should Match!!",
        "question"
      );
      return false;
    }
    return true;
  };
  const handleRegisterRequest = (event) => {
    event.preventDefault();
    if (
      FirstName === "" ||
      LastName === "" ||
      Gender === "" ||
      Email === "" ||
      Password === "" ||
      Role === ""
    ) {
      MySwal.fire("Oops!", "Please fill all the form fields!!", "question");
    } else {
      if (Role === "student") {
        var signUpRequest = {
          firstName: FirstName,
          lastName: LastName,
          gender: Gender,
          email: Email,
          password: Password,
          role: Role,
          std: parseInt(Distinct),
        };
      } else {
        var signUpRequest = {
          firstName: FirstName,
          lastName: LastName,
          gender: Gender,
          email: Email,
          password: Password,
          role: Role,
          subject: parseInt(Distinct),
        };
      }

      console.log(signUpRequest);

      const goToLogin = () => {
        window.location.reload();
      };

      ApiService.SignUp(signUpRequest)
        .then((response) => {
          console.log("from backend" + response.data);
          MySwal.fire(
            "Congratulations!",
            "You have successfully registered with us!!!"
          ).then(() => {
            goToLogin();
          });
        })
        .catch((err) => {
          console.log(err.data);
          MySwal.fire("Oops!", "User Already Registered with us!", "question"); // ).then(()=>{
          //   history.go(0);
          // })
        });
    }
  };

  return (
    <div className="base-container">
      <div className="content">
        <div className="form">
          <div className="form-group">
            <input
              name="firstName"
              placeholder="First Name"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              name="lastName"
              placeholder="Last Name"
              required
              onChange={handleOnChange}
            />
          </div>

          <Form>
            <div key={`inline-${"radio"}`} className="mb-3">
              <Form.Check
                inline
                label="Male"
                checked={Gender === "male"}
                onChange={handleOnChange}
                value="male"
                name="gender"
                type={"radio"}
                id={`inline-${"radio"}-1`}
              />
              <Form.Check
                inline
                label="Female"
                checked={Gender === "female"}
                onChange={handleOnChange}
                value="female"
                name="gender"
                type={"radio"}
                id={`inline-${"radio"}-2`}
              />
              <Form.Check
                inline
                label="Other"
                checked={Gender === "other"}
                onChange={handleOnChange}
                value="other"
                name="gender"
                type={"radio"}
                id={`inline-${"radio"}-3`}
              />
            </div>
          </Form>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="cPassword"
              placeholder="Confirm Password"
              required
              onChange={handleOnChange}
              onBlur={Validate}
            />
          </div>
          <div className="form-group">
            <select name="role" onChange={handleOnChange}>
              <option disabled="disabled" selected="selected">
                --Select Role--
              </option>
              <option value="student">Student </option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          {Role === "student" ? (
            <div className="form-group">
              <select
                name="distinct"
                onChange={handleOnChange}
                defaultValue={"DEFAULT"}
              >
                <option disabled="disabled" value="DEFAULT">
                  --Select Standard--
                </option>
                <option value="1">Std 1 </option>
                <option value="2">Std 2</option>
                <option value="3">Std 3</option>
                <option value="4">Std 4</option>
                <option value="5">Std 5</option>
              </select>
            </div>
          ) : (
            <div className="form-group">
              <select
                name="distinct"
                onChange={handleOnChange}
                defaultValue={"DEFAULT"}
              >
                <option disabled="disabled" value="DEFAULT">
                  --Select Subject--
                </option>
                <option value="1">English </option>
                <option value="2">Hindi</option>
                <option value="3">Marathi</option>
                <option value="4">History</option>
                <option value="5">Geography</option>
              </select>
            </div>
          )}

          <div className="footer register">
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleRegisterRequest}
            >
              <font color="white">Register</font>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
