import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/student",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Todays Schedule",
    path: "/student/todayschedule",
    icon: <IoIcons.IoIosCalendar />,
    cName: "nav-text",
  },
  {
    title: "Weekly Schedule",
    path: "/student/weeklySchedule",
    icon: <IoIcons.IoIosCalendar />,
    cName: "nav-text",
  },
  {
    title: "Assignments",
    path: "/assignments",
    icon: <FaIcons.FaList />,
    cName: "nav-text",
  },

  {
    title: "Attendence",
    path: "/studentattendence",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "LogOut",
    path: "/logout",
    icon: <FaIcons.FaSignOutAlt />,
    cName: "nav-text",
  },
];
