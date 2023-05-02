import React, { useState, useEffect } from "react";
import ApiService from "../../ApiService";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Navbar";
import Table from "react-bootstrap/Table";

function TodayStudentSchedule() {
  const [Data, setData] = useState([]);
  const [Today, setToday] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }

    let stdId = localStorage.getItem("stdId");
    console.log(stdId);
    ApiService.TodayStudentSchedule(stdId).then((response) => {
      setData(response.data);
      console.log(response.data);
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      setToday(date);
    });
  }, []);

  return (
    <div>
      <Navbar
        firstName={localStorage.getItem("firstName")}
        std={localStorage.getItem("std")}
      />

      <div className="empty bg-img">
        <h1
          style={{
            color: "#05429b",
            fontWeight: "bolder",
            fontFamily: "sans-serif",
          }}
          className="mt-3"
        >
          {" "}
          Today's Schedule{" "}
        </h1>
        <h2>{Today}</h2>
        {Data.length === 0 ? (
          <center>
            <h1
              style={{
                marginTop: 30,
                backgroundColor: "ivory",
                color: "#07288e",
                fontWeight: "500",
                width: "300px",
              }}
            >
              No Schedule
            </h1>
          </center>
        ) : (
          <div>
            <div
              className="d-grid gap-2 col-6 mx-auto tableDiv"
              style={{ marginTop: 50 }}
            >
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Subject</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                {Data.map((item, index = 0) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{(index += 1)}</td>
                        <td>{item.split(",")[0]}</td>
                        <td>{item.split(",")[1]}</td>
                        <td>{item.split(",")[2]}</td>
                        <td>{item.split(",")[3]}</td>
                        <td>{item.split(",")[4]}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodayStudentSchedule;
