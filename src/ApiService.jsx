import axios from 'axios';
const BASE_API_URL = 'http://localhost:8080/';
class ApiService{
    Login(LoginRequest){
         return axios.post(BASE_API_URL + LoginRequest.role+"/login",LoginRequest);
    }
    AdminLogin(LoginRequest){
        return axios.post(BASE_API_URL + LoginRequest.role+"/login",LoginRequest);
    }
    SignUp(RegisterRequest){
        return axios.post(BASE_API_URL +RegisterRequest.role+"/register",RegisterRequest);
    }
    TodayStudentSchedule(StdId){
        return axios.get(BASE_API_URL + "student/timetable"+"/"+StdId,StdId);
    }
    StudentWeeklySchedule(WeeklyScheduleRequest){
        return axios.get(BASE_API_URL + "student/"+WeeklyScheduleRequest,WeeklyScheduleRequest);
    }
    SubejectAssignment(subAssignmentRequest){
        return axios.post(BASE_API_URL+ "student/subassignment",subAssignmentRequest)
    }
    DownloadAssignment(AssignmentId){
        return axios.get(BASE_API_URL+ "student/sdownload/"+AssignmentId,AssignmentId)
    }
    SubmitAssignmentByStudent(AssignSubmit){
        return axios.post(BASE_API_URL+ "student/studSubmitAssignment/"+AssignSubmit.studentId+"/"+AssignSubmit.assignmentId, AssignSubmit.assignmentFile,AssignSubmit.config)
    // axios.post(url, formData, config)
    }
    TodayTeacherSchedule(TeacherId){
        return axios.get(BASE_API_URL + "teacher/timetable"+"/"+TeacherId,TeacherId);
    }
    TeacherWeeklySchedule(TeacherId){
        return axios.get(BASE_API_URL + "teacher/"+TeacherId);
    }
    // CreateAssignment(CreateRequest){
    //     return axios.post(BASE_API_URL+ "teacher/createassignment",CreateRequest);
    // }
    FetchRegReqest(Role){
        return axios.get(BASE_API_URL + "admin/registerrequest/"+Role,Role);
    }
    UpdateStatus(userReq){
        return axios.post(BASE_API_URL+ "admin/updatestatus",userReq);
    }
    FetchAllSchedule(StdId){
        return axios.get(BASE_API_URL + "admin/getallschedule/"+StdId);
    }

    GetTeachersBySubId(SubId){
        return axios.get(BASE_API_URL + "admin/getteacherbysubid/"+SubId);
    }
    AddPeriod(newPeriod){
        return axios.post(BASE_API_URL+ "admin/addperiod",newPeriod);
    }
    DeletePeriod(id){
        return axios.delete(BASE_API_URL+ "admin/deleteperiod/"+id)
    }
    TeacherAllSchedule(TeacherId){
        return axios.get(BASE_API_URL + "teacher/allschedule/"+TeacherId);
    }
    StudentAttendenceList(periodId){
        return axios.get(BASE_API_URL + "teacher/studentattendencelist/"+periodId);
    }
    UpdateAttendence(attendeceReq){
        return axios.put(BASE_API_URL + "teacher/updateattendence",attendeceReq)
    }
    StudAttendenceBySubject(studentAttendenceRequest){
        return axios.get(BASE_API_URL + "student/attendence/"+studentAttendenceRequest.studentId+"/"+studentAttendenceRequest.subId);
    }
    GetStdByTeacherId(TeaherId){
        return axios.get(BASE_API_URL + "teacher/getstdid/"+TeaherId);

    }
    GetStudentByStd(stdId,subId){
        return axios.get(BASE_API_URL + "teacher/studentlist/"+stdId+"/"+subId);
    }
    UpdateAssignStatus(assignmentStatus){
    return axios.put(BASE_API_URL + "teacher/assignstatus",assignmentStatus);
    }
}
export default new ApiService();