import React from "react";
import ChangePassword from "../../components/ChangePassword/ChangePassword";

function Settings() {
  return (
    <div className="container">
      <h1>Account Settings</h1>

      <div className="settings-section">
        <h4>Personal Information</h4>
      </div>
      <hr />
      <div className="settings-section">
        <ChangePassword />
      </div>
    </div>
  );
}

export default Settings;
