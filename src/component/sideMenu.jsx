import React from "react";
import "../assets/css/component/sideMenu.scss";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="side-menu">
      <h3>Welcome {Admin}</h3>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/doctors">Doctors</Link></li>
        <li><Link to="/nurse">Nurse</Link></li>
        <li><Link to="/patient">Patients</Link></li>
        <li><Link to="/medical_report">Medical Reports</Link></li>
        <li><Link to="/department">Department</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/billing">Billing</Link></li>
        <li><Link to="/rooms">Rooms Data</Link></li>
      </ul>
    </div>
  );
};

export default SideMenu;
