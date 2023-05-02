import React, { useState } from "react";
import ApiService from "../../ApiService";
import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router";

function TeacherUploadAssignments() {
  const [SubId, setSubId] = useState(localStorage.getItem("subjectId"));
  const [StdId, setStdId] = useState("");
  const [StandardId, setStandardId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [Subject, setsubject] = useState(localStorage.getItem("subject"));
  const [TeacherId, setTeacherId] = useState(localStorage.getItem("teacherId"));
  const [StandardList, setStandardList] = useState("");
  const MySwal = withReactContent(Swal);

  let navigate = useNavigate();

  const handleOnChange = (event) => {
    if (event.target.name === "subject") setSubId(event.target.value);
    else if (event.target.name === "standard") setStdId(event.target.value);
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleStdId = (event) => {
    console.log("std:" + event.target.value);
    var stdId = 0;
    if (event.target.value === "1ST") stdId = 1;
    else if (event.target.value === "2ND") stdId = 2;
    else if (event.target.value === "3RD") stdId = 3;
    else if (event.target.value === "4TH") stdId = 4;
    else stdId = 5;

    setStandardId(stdId);
    console.log("std:" + stdId);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
    ApiService.GetStdByTeacherId(TeacherId).then((response) => {
      setStdId(response.data);
      console.log(response.data);
      setStandardList(
        response.data.map((item) => {
          return <option value={item}>{item}</option>;
        })
      );
    });
  }, []);

  const handleUploadFile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("assignmentFile", selectedFile);
    formData.append("subId", SubId);
    formData.append("stdId", StandardId);
    console.log(selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/teacher/createassignment",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      MySwal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar firstName={localStorage.getItem("firstName")} />
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
          Upload {Subject} Assignment
        </h1>
      </div>
      <div>
        <div
          className="d-grid gap-2 col-4 mx-auto tableDiv"
          style={{ marginTop: 50 }}
        >
          <div></div>
          <div style={{ backgroundColor: "white", borderRadius: "25px" }}>
            <form onSubmit={handleUploadFile}>
              <select
                className="mt-5"
                name="standard"
                onChange={handleStdId}
                defaultValue={"DEFAULT"}
              >
                <option disabled="disabled" value="DEFAULT">
                  --Select Standard--
                </option>{" "}
                {StandardList}
              </select>
              <input
                className="mt-4"
                type="file"
                onChange={handleFileSelect}
                style={{ marginTop: 100 }}
              />
              <Button
                className="mb-5 mt-4"
                type="submit"
                variant="primary"
                size="lg"
                style={{ marginTop: 100 }}
              >
                Upload
              </Button>{" "}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherUploadAssignments;
