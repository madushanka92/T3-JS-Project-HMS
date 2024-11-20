import React from "react";
import OverviewData from "../component/overviewData";
import {
  FaStethoscope,
  FaHeartbeat,
  FaCommentsDollar,
  FaCut,
  FaNotesMedical,
  FaUserNurse,
} from "react-icons/fa";
import "../assets/css/HomePage.scss";

import BarChart from "../component/chats/bar-chat";
import LineChart from "../component/chats/line-chat";

const HomePage = () => {
  const overviewDataArray = [
    { total: 20, type: "Doctors", icon: <FaStethoscope /> },
    { total: 50, type: "Nurse", icon: <FaUserNurse /> },
    { total: 15, type: "Patient", icon: <FaHeartbeat /> },
    { total: 30, type: "Appointment", icon: <FaCommentsDollar /> },
    { total: 30, type: "Operation", icon: <FaCut /> },
    { total: 30, type: "Lab Reports", icon: <FaNotesMedical /> },
  ];

  const Utils = {
    months: ({ count }) => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthNames.slice(0, count);
    },
  };

  const labels = Utils.months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Patients",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="HomePage" style={{ textAlign: "center" }}>
      <div className="overview-container">
        <div className="overViews">
          {overviewDataArray.map((data, index) => (
            <OverviewData
              key={index}
              total={data.total}
              type={data.type}
              icon={data.icon}
            />
          ))}
        </div>
      </div>

      <div className="chats">
        <BarChart data={data} options={options} />
        <LineChart data={data} options={options} />
      </div>
    </div>
  );
};

export default HomePage;
