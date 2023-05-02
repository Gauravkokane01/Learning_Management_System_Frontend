import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ApiService from "../../ApiService";
import { useNavigate } from "react-router";

function StudentAttendence() {
  const [AttendeceStatus, setAttendenceStatus] = useState("Select Subejct");
  const [StudentId, setStudentIdId] = useState(
    localStorage.getItem("studentId")
  );
  const [SubjectId, setSubjectId] = useState("");
  const [Data, setData] = useState("");

  let navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
  });

  const handleSubjectId = (event) => {
    setSubjectId(event.target.value);
    console.log("subId= " + SubjectId);
    setAttendenceStatus(
      "Attendence for " + event.target.getAttribute("subName")
    );

    var studentAttendenceRequest = {
      studentId: StudentId,
      subId: SubjectId,
    };

    ApiService.StudAttendenceBySubject(studentAttendenceRequest).then(
      (response) => {
        setData(response.data);
        console.log("abc" + Data);
      }
    );
  };

  return (
    <div>
      <div>
        <Navbar
          firstName={localStorage.getItem("firstName")}
          std={localStorage.getItem("std")}
        />
      </div>
      <h2
        style={{
          color: "#05429b",
          fontWeight: "bolder",
          fontFamily: "sans-serif",
        }}
        className="mt-3"
      >
        {" "}
        Attendence By Subject{" "}
      </h2>
      <div>
        <Button
          value="1"
          subName="English"
          onClick={handleSubjectId}
          variant="danger"
          size="lg"
        >
          English
        </Button>{" "}
        <Button
          value="2"
          subName="Hindi"
          onClick={handleSubjectId}
          variant="danger"
          size="lg"
        >
          Hindi
        </Button>{" "}
        <Button
          value="3"
          subName="Marathi"
          onClick={handleSubjectId}
          variant="danger"
          size="lg"
        >
          Marathi
        </Button>{" "}
        <Button
          value="4"
          subName="History"
          onClick={handleSubjectId}
          variant="danger"
          size="lg"
        >
          Hisotry
        </Button>{" "}
        <Button
          value="5"
          subName="Geography"
          onClick={handleSubjectId}
          variant="danger"
          size="lg"
        >
          Geography
        </Button>{" "}
        <div className="empty bg-img" style={{ marginTop: 50 }}>
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
                {AttendeceStatus}
              </h1>
            </center>
          ) : (
            <div>
              <center>
                <h1
                  style={{
                    marginTop: 30,
                    backgroundColor: "ivory",
                    color: "#07288e",
                    fontWeight: "500",
                    width: "500px",
                  }}
                >
                  {AttendeceStatus}
                </h1>
              </center>
              <div className="d-grid gap-2 col-7 mx-auto tableDiv">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Subject</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Attendence Status</th>
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
                          <td>{item.split(",")[5]}</td>
                          <td>{item.split(",")[6]}</td>
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
    </div>
  );
}

export default StudentAttendence;
