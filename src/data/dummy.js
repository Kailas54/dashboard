import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import { MdRequestQuote } from 'react-icons/md';
export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'EmployeeInfo',
        icon: <RiContactsLine />,
      },
      {
        name: 'WorkHours',
        icon: <FiClock />,
      },
      {
        name: 'employees',
        icon: <IoMdContacts />,
      },
      {
        name: 'salaryOverview',
        icon: <MdRequestQuote />,
      },
      {
        name: 'calendar',
        icon: <AiOutlineCalendar />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];
