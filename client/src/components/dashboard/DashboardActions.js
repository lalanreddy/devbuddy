import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-dark">
        <i className="fas fa-user-circle text-dark" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-dark">
        <i className="text-dark" /> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-dark">
        <i className="text-dark" /> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
