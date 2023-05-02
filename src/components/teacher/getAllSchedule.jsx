import React, { useState, useEffect } from "react";
import ApiService from "../../ApiService";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Navbar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function AllSchedule() {
  const [Data, setData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    let teacherId = localStorage.getItem("teacherId");
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
    console.log(teacherId);
    ApiService.TeacherAllSchedule(teacherId).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  const handleUpdate = (period) => {
    localStorage.setItem("period", period);
    navigate("/updateattendence");
  };
  return (
    <div>
      <Navbar firstName={localStorage.getItem("firstName")} />
      <div className="empty bg-img">
        <h1
          style={{
            color: "#05429b",
            fontWeight: "bolder",
            fontFamily: "sans-serif",
            marginTop: 50,
          }}
          className="mt-3"
        >
          {" "}
          All Schedule{" "}
        </h1>
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
              className="d-grid gap-2 col-7 mx-auto tableDiv"
              style={{ marginTop: 50 }}
            >
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Standard</th>
                    <th>Subject</th>
                    <th>Update Attendence</th>
                  </tr>
                </thead>
                <tbody>
                  {Data.map((item, index = 0) => {
                    return (
                      <tr>
                        <td>{(index += 1)}</td>
                        <td>{item.split(",")[0]}</td>
                        <td>{item.split(",")[1]}</td>
                        <td>{item.split(",")[2]}</td>
                        <td>{item.split(",")[3]}</td>
                        <td>{item.split(",")[4]}</td>
                        <td>
                          <Button
                            onClick={() => handleUpdate(item)}
                            variant="primary"
                          >
                            Update
                          </Button>{" "}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllSchedule;
