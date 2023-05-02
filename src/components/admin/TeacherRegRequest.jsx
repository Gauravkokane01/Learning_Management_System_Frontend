import React, { useEffect, useState } from "react";
import ApiService from "../../ApiService";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Navbar from "./Navbar";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function TeacherRegRequest() {
  const [Data, setData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }

    ApiService.FetchRegReqest("teacher").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  const handleRequest = (event) => {
    const teacherId = event.target.getAttribute("teacherId");
    const Status = event.target.value;

    var teacherReq = {
      role: "teacher",
      status: Status,
      id: teacherId,
    };
    console.log(teacherReq);
    ApiService.UpdateStatus(teacherReq).then((response) => {
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      }).then(() => {
        window.location.reload();
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
          }}
          className="mt-3"
        >
          {" "}
          Teacher Registration Requests{" "}
        </h1>
        {Data.length === 0 ? (
          <h1>No Request</h1>
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Subject</th>
                    <th>Approve</th>
                    <th>Reject</th>
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
                            value="approved"
                            teacherId={item.split(",")[3]}
                            onClick={handleRequest}
                            variant="success"
                          >
                            Approve
                          </Button>{" "}
                        </td>
                        <td>
                          <Button
                            value="rejected"
                            teacherId={item.split(",")[3]}
                            onClick={handleRequest}
                            variant="danger"
                          >
                            Reject
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

export default TeacherRegRequest;
