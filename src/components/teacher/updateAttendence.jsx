import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import ApiService from "../../ApiService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router";

function UpdateAttendence() {
  const [Period, setPeriod] = useState(localStorage.getItem("period"));
  const [Attendence, setAttendence] = useState("");
  const [Data, setData] = useState("");
  const MySwal = withReactContent(Swal);

  let navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
    console.log("pid" + Period.split(",")[5]);
    ApiService.StudentAttendenceList(Period.split(",")[5]).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  const handleOnChange = (event) => {
    event.preventDefault();
    const attendenceStatus = event.target.value;
    const attendenceId = event.target.getAttribute("attendenceId");

    const attendeceReq = {
      id: attendenceId,
      status: attendenceStatus,
    };
    console.log("atStuts: " + attendenceStatus);
    console.log("Id: " + attendenceId);

    ApiService.UpdateAttendence(attendeceReq).then((response) => {
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

      <div
        className="d-grid gap-2 col-7 mx-auto tableDiv"
        style={{ marginTop: 50 }}
      >
        <h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Standard</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Period.split(",")[0]}</td>
                <td>{Period.split(",")[1]}</td>
                <td>{Period.split(",")[2]}</td>
                <td>{Period.split(",")[3]}</td>
                <td>{Period.split(",")[4]}</td>
              </tr>
            </tbody>
          </Table>
        </h3>
      </div>
      <center>
        <h2
          style={{
            marginTop: 10,
            backgroundColor: "ivory",
            color: "#07288e",
            fontWeight: "500",
            width: "500px",
          }}
        >
          Student Attendece Table
        </h2>
      </center>
      {Data.length === 0 ? null : (
        <div
          className="d-grid gap-2 col-7 mx-auto tableDiv"
          style={{ marginTop: 50 }}
        >
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Attendence</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item, index = 0) => {
                return (
                  <tr>
                    <td>{(index += 1)}</td>
                    <td>{item.split(",")[0]}</td>
                    <td>{item.split(",")[1]}</td>
                    <td>
                      <div key={`inline-${"radio"}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Prsent"
                          attendenceId={item.split(",")[2]}
                          checked={Attendence === "present"}
                          onChange={handleOnChange}
                          value="present"
                          name="attendence"
                          type={"radio"}
                          id={`inline-${"radio"}-1`}
                        />
                        <Form.Check
                          inline
                          label="Absent"
                          attendenceId={item.split(",")[2]}
                          checked={Attendence === "absent"}
                          onChange={handleOnChange}
                          value="absent"
                          name="attendence"
                          type={"radio"}
                          id={`inline-${"radio"}-2`}
                        />
                      </div>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default UpdateAttendence;
