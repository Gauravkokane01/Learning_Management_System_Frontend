import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/admin',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Student Requests',
    path: '/studentrequest',
    icon: <IoIcons.IoIosCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Teacher Requests',
    path: '/teacherrequest',
    icon: <IoIcons.IoIosCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Set Schedule',
    path: '/setschedule',
    icon: <IoIcons.IoIosCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'LogOut',
    path: '/',
    icon: <FaIcons.FaSignOutAlt/>,
    cName: 'nav-text'
  },
 
];