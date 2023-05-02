import logo from "./login.svg";

import "./App.css";
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom"
import  Login  from "./components/login";
import Home from "./components/admin/Home";
import Student from "./components/student/Student";
import Teacher from "./components/teacher/Teacher";
import SubjectAssignment from "./components/student/assignment";
import TodayStudentSchedule from "./components/student/todayStudentSchedule";
import TodayTeacherSchedule from "./components/teacher/todayTeacherSchedule";
import StudentWeeklySchedule from "./components/student/studentWeeklySchedule";
import TeacherWeeklySchedule from "./components/teacher/teacherWeeklySchedule";
import TeacherAssignments from "./components/teacher/teacherUploadAssignments";
import StudentRegRequest from "./components/admin/StudentRegRequest";
import TeacherRegRequest from "./components/admin/TeacherRegRequest";
import SetSchedule from "./components/admin/setSchedule";
import AllSchedule from "./components/teacher/getAllSchedule";
import UpdateAttendence from "./components/teacher/updateAttendence";
import StudentAttendence from "./components/student/studentAttendence";
import TeacherUploadAssignments from "./components/teacher/teacherUploadAssignments";
import TeacherDownloadAssignment from "./components/teacher/teacherDownloadAssignment";
import LogOut from "./components/logOut";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin" element={<Home />}></Route>
        <Route path="/student" element={<Student />}></Route>
        <Route path="/teacher" element={<Teacher />}></Route>

        <Route path="/assignments" element={<SubjectAssignment />}></Route>
        <Route path="/teacher/uploadassignments" element={<TeacherUploadAssignments />}></Route>
        <Route path="/teacher/download" element={<TeacherDownloadAssignment />}></Route>


        <Route path="/student/weeklySchedule" element={<StudentWeeklySchedule />}></Route>
        <Route path="/student/todayschedule" element={<TodayStudentSchedule />}></Route>
        
        <Route path="/teacher/todayschedule" element={<TodayTeacherSchedule />}></Route>
        <Route path="/teacher/weeklyschedule" element={<TeacherWeeklySchedule />}></Route>

        <Route path="/studentrequest" element={<StudentRegRequest />}></Route>
        <Route path="/teacherrequest" element={<TeacherRegRequest />}></Route>

        <Route path="/setschedule" element={<SetSchedule />}></Route>
        
        <Route path="/allschedule" element={<AllSchedule />}></Route>
        <Route path="/updateattendence" element={<UpdateAttendence />}></Route>

        <Route path="/studentattendence" element={<StudentAttendence />}></Route>

        <Route path="/logout" element={<LogOut/>}></Route>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
