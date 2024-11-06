import React from "react";
import "../assets/css/component/overviewData.scss";

const OverviewData = ({ total, type, icon }) => {
  return (
    <div className="outer-view">
      <div className="overview-data">
        <div className="details">
          <h3>{total}</h3>
          <span>{type}</span>
        </div>
        <div className="icon">{icon}</div>
      </div>
    </div>
  );
};

export default OverviewData;
