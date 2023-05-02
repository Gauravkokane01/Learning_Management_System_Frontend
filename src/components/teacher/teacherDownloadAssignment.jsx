import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ApiService from "../../ApiService";
import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useNavigate } from "react-router";

function TeacherDownloadAssignment() {
  const [StandardList, setStandardList] = useState("");
  // const [StandardId, setStandardId] = useState('');
  const [Data, setData] = useState("");
  const [AssignmentStatus, setAssignmentStatus] = useState("");
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [AssignmentNo, setAssignmentNo] = useState("");
  const MySwal = withReactContent(Swal);
  let navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
    const teacherId = localStorage.getItem("teacherId");
    ApiService.GetStdByTeacherId(teacherId).then((response) => {
      console.log(response.data);
      setStandardList(
        response.data.map((item) => {
          return <option value={item}>{item}</option>;
        })
      );
    });
  }, []);

  const handleStdId = (event) => {
    console.log("std:" + event);
    var stdId;
    if (event.target.value === "1ST") stdId = 1;
    else if (event.target.value === "2ND") stdId = 2;
    else if (event.target.value === "3RD") stdId = 3;
    else if (event.target.value === "4TH") stdId = 4;
    else stdId = 5;

    const subId = localStorage.getItem("subjectId");

    ApiService.GetStudentByStd(stdId, subId).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  const handleDownloadAssign = (event) => {
    const fName = event.target.getAttribute("fName");
    const lName = event.target.getAttribute("lName");
    const assignNo = event.target.getAttribute("aNo");
    console.log("AssignId" + event);
    const tempId = event.target.value;
    console.log("tempId" + tempId);

    const FileDownload = require("js-file-download");

    axios({
      url: "http://localhost:8080/teacher/tdownload/" + tempId,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      console.log("file:" + response.data);
      FileDownload(
        response.data,
        localStorage.getItem("std") +
          "_" +
          fName +
          lName +
          "_" +
          localStorage.getItem("subject") +
          "_" +
          assignNo +
          ".pdf"
      );
    });
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    const assignStatus = event.target.value;
    const assignId = event.target.getAttribute("assignId");

    const assignmentStatus = {
      id: assignId,
      status: assignStatus,
    };

    console.log("atStuts: " + assignStatus);
    console.log("Id: " + assignId);

    ApiService.UpdateAssignStatus(assignmentStatus).then((response) => {
      console.log(response.data);
      MySwal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });
    });
  };

  return (
    <div>
      <div>
        <Navbar firstName={localStorage.getItem("firstName")} />
      </div>
      <div>
        <h1
          style={{
            color: "#05429b",
            fontWeight: "bolder",
            fontFamily: "sans-serif",
            marginTop: 50,
          }}
          className="mt-3"
        >
          Download Submitted Assignments
        </h1>
      </div>
      <center>
        <div
          style={{
            marginTop: 100,
            backgroundColor: "white",
            borderRadius: "25px",
            width: "200px",
          }}
        >
          <select
            className="mb-3 mt-3"
            name="standard"
            onChange={handleStdId}
            defaultValue={"DEFAULT"}
          >
            <option disabled="disabled" value="DEFAULT">
              --Select Standard--
            </option>{" "}
            {StandardList}
          </select>
        </div>
      </center>
      <div className="empty bg-img" style={{ marginTop: 50 }}>
        {Data.length === 0 ? (
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
              No Submitted Assignment
            </h1>
          </center>
        ) : (
          <div>
            <div className="d-grid gap-2 col-6 mx-auto tableDiv">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>subject Name</th>
                    <th>Assignment No.</th>
                    <th>Download</th>
                    <th>Teacher Remark</th>
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
                        <td>
                          <Button
                            fName={item.split(",")[0]}
                            lName={item.split(",")[1]}
                            aNo={item.split(",")[3]}
                            value={item.split(",")[4]}
                            onClick={handleDownloadAssign}
                            variant="primary"
                          >
                            Download
                          </Button>
                        </td>
                        <td>
                          <div>
                            <input
                              type="radio"
                              assignId={item.split(",")[4]}
                              id="html"
                              name="fav_language"
                              value="checked"
                              onChange={handleOnChange}
                            />
                            <label for="html">Checked</label>
                            <br />
                            <input
                              type="radio"
                              assignId={item.split(",")[4]}
                              id="css"
                              name="fav_language"
                              value="resubmit"
                              onChange={handleOnChange}
                            />
                            <label for="css">Resubmit</label>
                          </div>
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

export default TeacherDownloadAssignment;
