import React, { useEffect, useState } from "react";
import ApiService from "../../ApiService";
import fileDownload from "js-file-download";
import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router";
import assign from "../../images/assign.jpg";

function SubjectAssignment() {
  const [StdId, setStdId] = useState(localStorage.getItem("stdId"));
  const [SubId, setSubId] = useState("");
  const [Data, setData] = useState("");
  const [AssignmentId, setAssignmentId] = useState();
  const [AssignmentStatus, setAssignmentStatus] = useState("Select Subject");
  const [StudentId, setStudentId] = useState(localStorage.getItem("studentId"));
  const [file, setFile] = useState();
  const [SubName, setSubName] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
  });
  const handleSubjectId = (event) => {
    setSubId(event.target.value);
    setAssignmentStatus("No Assignment");
    console.log(SubId);

    setSubName(event.target.getAttribute("subName"));

    var subAssignmentRequest = {
      stdId: StdId,
      subId: SubId,
      studentId: StudentId,
    };
    ApiService.SubejectAssignment(subAssignmentRequest).then((response) => {
      setData(response.data);
      console.log("abc" + Data);
    });
  };

  const handleDownloadAssign = (id) => {
    console.log("AssignId" + id);
    const tempId = id.target.getAttribute("assignmentId");
    console.log("tempId" + tempId);
    setAssignmentId(tempId);
    const assignmentNo = id.target.getAttribute("assignmentNo");

    const FileDownload = require("js-file-download");

    axios({
      url: "http://localhost:8080/student/sdownload/" + tempId,
      method: "GET",
      responseType: "blob", // Important
    }).then((response) => {
      console.log("file:" + response.data);
      FileDownload(
        response.data,
        localStorage.getItem("std") +
          "_" +
          SubName +
          "_" +
          assignmentNo +
          ".pdf"
      );
    });
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  // function handleSubmit(event) {
  //   event.preventDefault()
  //   const url = 'http://localhost:3000/uploadFile';
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('fileName', file.name);
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   };
  //   axios.post(url, formData, config).then((response) => {
  //     console.log(response.data);
  //   });

  // }
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmitAssignment = async (event) => {
    event.preventDefault();
    const tempId = event.target.getAttribute("assignmentId");
    console.log("tempId" + tempId);

    const formData = new FormData();
    formData.append("assignmentFile", selectedFile);
    formData.append("studentId", StudentId);
    formData.append("assignmentId", tempId);
    console.log(selectedFile);
    try {
      const response = await axios({
        method: "put",
        url: "http://localhost:8080/student/studSubmitAssignment",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Navbar
          firstName={localStorage.getItem("firstName")}
          std={localStorage.getItem("std")}
        />
      </div>

      <div>
        <h1
          style={{
            color: "#05429b",
            fontWeight: "bolder",
            fontFamily: "sans-serif",
          }}
          className="mt-3"
        >
          Assignments
        </h1>
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
                {AssignmentStatus}
              </h1>
            </center>
          ) : (
            <div>
              <div className="d-grid gap-2 col-6 mx-auto tableDiv">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Subject</th>
                      <th>Assignment No</th>
                      <th>Date</th>
                      <th>Download</th>
                      <th>Submit Assignment</th>
                      <th>Assignment Status</th>
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
                          <td>
                            <Button
                              variant="primary"
                              onClick={handleDownloadAssign}
                              assignmentId={item.split(",")[3]}
                              assignmentNo={item.split(",")[1]}
                            >
                              Download
                            </Button>{" "}
                          </td>

                          <td>
                            <form
                              onSubmit={handleSubmitAssignment}
                              assignmentId={item.split(",")[3]}
                            >
                              <input type="file" onChange={handleFileSelect} />{" "}
                              <Button
                                type="submit"
                                variant="primary"
                                style={{ marginBottom: 2 }}
                              >
                                Submit
                              </Button>{" "}
                            </form>
                          </td>
                          <td>{item.split(",")[4]}</td>
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

export default SubjectAssignment;
