import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ApiService from "../../ApiService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router";

function SetSchedule() {
  const [contacts, setContacts] = useState();

  const [Msg, setMsg] = useState("Select Standard");
  const [Data, setData] = useState();

  const [Teacher, setTeacher] = useState("");

  const [Pdate, setPdate] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [StdId, setStdId] = useState("");
  const [SubId, setSubId] = useState("");
  const [Tid, setTid] = useState("");
  const MySwal = withReactContent(Swal);

  let navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
  });

  const handleAddFormChange = (event) => {
    // event.preventDefault();

    if (event.target.name === "date") setPdate(event.target.value);
    else if (event.target.name === "starttime")
      setStartTime(event.target.value);
    else if (event.target.name === "endtime") setEndTime(event.target.value);
    else if (event.target.name === "subjectid") {
      setSubId(event.target.value);
      const subId = event.target.value;

      ApiService.GetTeachersBySubId(subId).then((response) => {
        setTeacher(response.data);
        // Teacher = response.data;
        const faculty = response.data;
        console.log("abc:" + faculty);
        console.log("teacher name:" + response.data);
      });
    } else if (event.target.name === "teacherid") setTid(event.target.value);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newPeriod = {
      date: Pdate,
      startTime: StartTime,
      endTime: EndTime,
      stdId: StdId,
      subjectId: SubId,
      teacherId: Tid,
    };
    ApiService.AddPeriod(newPeriod).then((response) => {
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      }).then(() => {
        ApiService.FetchAllSchedule(StdId).then((responce) => {
          setData(responce.data);
          console.log(responce.data);
          // setMsg(event.target.getAttribute("attribute") + " Schedule");
        });
      });
    });

    setTeacher("");
  };

  const handleStandardId = (event) => {
    //setStdId(event.target.value);
    const stdId = event.target.value;
    setStdId(stdId);
    console.log(stdId);
    ApiService.FetchAllSchedule(stdId).then((responce) => {
      setData(responce.data);
      console.log(responce.data);
      setMsg(event.target.getAttribute("attribute") + " Schedule");
    });
  };

  const handleDeleteClick = (id) => {
    console.log("pID " + id);
    ApiService.DeletePeriod(id).then((response) => {
      MySwal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      }).then(() => {
        ApiService.FetchAllSchedule(StdId).then((responce) => {
          setData(responce.data);
          console.log(responce.data);
        });
      });
    });
  };

  return (
    <div>
      <div>
        <Navbar firstName={localStorage.getItem("firstName")} />
      </div>
      <h1
        style={{
          color: "#05429b",
          fontWeight: "bolder",
          fontFamily: "sans-serif",
        }}
        className="mt-3"
      >
        {" "}
        Set Schedule{" "}
      </h1>
      <div style={{ marginTop: 30 }}>
        <Button
          value="1"
          attribute="Std1"
          onClick={handleStandardId}
          variant="danger"
          size="lg"
        >
          Std 1
        </Button>{" "}
        <Button
          value="2"
          attribute="Std2"
          onClick={handleStandardId}
          variant="danger"
          size="lg"
        >
          Std 2
        </Button>{" "}
        <Button
          value="3"
          attribute="Std3"
          onClick={handleStandardId}
          variant="danger"
          size="lg"
        >
          Std 3
        </Button>{" "}
        <Button
          value="4"
          attribute="Std4"
          onClick={handleStandardId}
          variant="danger"
          size="lg"
        >
          Std 4
        </Button>{" "}
        <Button
          value="5"
          attribute="Std5"
          onClick={handleStandardId}
          variant="danger"
          size="lg"
        >
          Std 5
        </Button>{" "}
      </div>
      <center>
        <h2
          style={{
            marginTop: 30,
            backgroundColor: "ivory",
            color: "#07288e",
            fontWeight: "500",
            width: "300px",
          }}
        >
          {Msg}
        </h2>
      </center>
      {Msg.length === 15 ? null : (
        <div>
          <div className="d-grid gap-2 col-7 mx-auto tableDiv">
            <form>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Remove Period</th>
                  </tr>
                </thead>
                <tbody></tbody>
                {/* </Table> */}

                <tbody>
                  {Data.map((item, index = 0) => (
                    <tr>
                      <td>{(index += 1)}</td>
                      <td>{item.split(",")[0]}</td>
                      <td>{item.split(",")[1]}</td>
                      <td>{item.split(",")[2]}</td>
                      <td>{item.split(",")[3]}</td>
                      <td>{item.split(",")[4]}</td>
                      <td>
                        <Button
                          variant="danger"
                          type="button"
                          onClick={() => handleDeleteClick(item.split(",")[5])}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </form>
          </div>

          <div>
            <center>
              <h2
                style={{
                  marginTop: 30,
                  backgroundColor: "ivory",
                  color: "#07288e",
                  fontWeight: "500",
                  width: "300px",
                }}
              >
                Add Period
              </h2>
            </center>
            <form onSubmit={handleAddFormSubmit}>
              <input
                type="Date"
                name="date"
                required="required"
                placeholder="Enter a date..."
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="starttime"
                required="required"
                placeholder="HH:MM:SS"
                onChange={handleAddFormChange}
              />
              <input
                type="text"
                name="endtime"
                required="required"
                placeholder="HH:MM:SS"
                onChange={handleAddFormChange}
              />
              <select
                name="subjectid"
                onChange={handleAddFormChange}
                defaultValue={"DEFAULT"}
              >
                <option disabled="disabled" value="DEFAULT">
                  --Select Subject--
                </option>
                <option value="1">English </option>
                <option value="2">Hindi</option>
                <option value="3">Marathi </option>
                <option value="4">History</option>
                <option value="5">Geography </option>
              </select>
              <input
                type="number"
                name="teacherid"
                required="required"
                placeholder="Enter a teacher id"
                onChange={handleAddFormChange}
              />
              <Button variant="primary" style={{ marginLeft: 5 }} type="submit">
                Add Period
              </Button>{" "}
            </form>
          </div>
          <div
            className="d-grid gap-2 col-6 mx-auto tableDiv"
            style={{ marginTop: 30 }}
          >
            {Teacher.length === 0 ? null : (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Teacher Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {Teacher.map((item) => {
                    return (
                      <tr>
                        <td>{item.split(",")[0]}</td>
                        <td>{item.split(",")[1]}</td>
                        <td>{item.split(",")[2]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default SetSchedule;
