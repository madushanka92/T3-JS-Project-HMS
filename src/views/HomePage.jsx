import React, { useEffect, useState } from "react";
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
import { statisticsService } from "../_services/apiService";

const HomePage = () => {
  const [counts, setCounts] = useState({
    doctors: 0,
    nurses: 0,
    patients: 0,
    appointments: 30, // Default values
    operations: 30, // Default values
    labReports: 30, // Default values
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.role === "Admin") {
      setIsAdmin(true);
    }

    // Fetch total counts for doctors, nurses, patients, etc.
    statisticsService
      .getTotalCounts()
      .then((response) => {
        setCounts({
          doctors: response.data.doctors,
          nurses: response.data.nurses,
          patients: response.data.patients,
          appointments: response.data.admissions, // Default or fetched value
          operations: 30, // Default or fetched value
          labReports: 30, // Default or fetched value
        });
      })
      .catch((err) => {
        console.error("Error fetching counts:", err);
      });
  }, []);

  const overviewDataArray = [
    { total: counts.doctors, type: "Doctors", icon: <FaStethoscope /> },
    { total: counts.nurses, type: "Nurse", icon: <FaUserNurse /> },
    { total: counts.patients, type: "Patient", icon: <FaHeartbeat /> },
    {
      total: counts.appointments,
      type: "Admissions",
      icon: <FaCommentsDollar />,
    },
    { total: counts.operations, type: "Operation", icon: <FaCut /> },
    { total: counts.labReports, type: "Lab Reports", icon: <FaNotesMedical /> },
  ];

  const handleEdit = (userId) => {
    navigate(`/users/edit/${userId}`);
  };

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

      {isAdmin && ( // Only render charts if the user is an Admin
        <div className="chats">
          <BarChart data={data} options={options} />
          <LineChart data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
