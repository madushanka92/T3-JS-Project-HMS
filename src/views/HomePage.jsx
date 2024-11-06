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

const HomePage = () => {
  const overviewDataArray = [
    { total: 20, type: "Doctors", icon: <FaStethoscope /> },
    { total: 50, type: "Nurse", icon: <FaUserNurse /> },
    { total: 15, type: "Patient", icon: <FaHeartbeat /> },
    { total: 30, type: "Appointment", icon: <FaCommentsDollar /> },
    { total: 30, type: "Operation", icon: <FaCut /> },
    { total: 30, type: "Lab Reports", icon: <FaNotesMedical /> },
  ];

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
    </div>
  );
};

export default HomePage;
