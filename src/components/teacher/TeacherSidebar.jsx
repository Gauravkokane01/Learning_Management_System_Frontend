import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const TeacherSidebar = [
  {
    title: "Home",
    path: "/teacher",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Todays Schedule",
    path: "/teacher/todayschedule",
    icon: <IoIcons.IoIosCalendar />,
    cName: "nav-text",
  },
  {
    title: "Weekly Schedule",
    path: "/teacher/weeklySchedule",
    icon: <IoIcons.IoIosCalendar />,
    cName: "nav-text",
  },
  {
    title: "Upload Assignments",
    path: "/teacher/uploadassignments",
    icon: <FaIcons.FaList />,
    cName: "nav-text",
  },
  {
    title: "Download Assignments",
    path: "/teacher/download",
    icon: <FaIcons.FaList />,
    cName: "nav-text",
  },

  {
    title: "Update Attendence",
    path: "/allschedule",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "LogOut",
    path: "/",
    icon: <FaIcons.FaSignOutAlt />,
    cName: "nav-text",
  },
];
