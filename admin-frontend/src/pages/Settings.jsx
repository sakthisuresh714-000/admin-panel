import React, { useEffect, useState } from "react";
import axios from "axios";


const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    emailVerification: true,
    sessionTimeout: 30,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [settings.darkMode]);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/settings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSettings(res.data);
    } catch (err) {
      console.error(err);
      alert("Access Denied");
    }
  };

  const saveSettings = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/settings",
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (settings.darkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }

      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-card">

        <h2 className="settings-title">
          ⚙️ Admin Settings
        </h2>

        <div className="setting-box">
          <div className="setting-info">
            <h4>Dark Mode</h4>
            <p>Enable dark theme</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  darkMode: e.target.checked,
                })
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-box">
          <div className="setting-info">
            <h4>Email Verification</h4>
            <p>Require OTP verification</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.emailVerification}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  emailVerification: e.target.checked,
                })
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-box">
          <div className="setting-info">
            <h4>Session Timeout</h4>
            <p>Auto logout time in minutes</p>
          </div>

          <input
            className="session-input"
            type="number"
            min="1"
            value={settings.sessionTimeout}
            onChange={(e) =>
              setSettings({
                ...settings,
                sessionTimeout: Number(e.target.value),
              })
            }
          />
        </div>

        <button
          className="save-btn"
          onClick={saveSettings}
        >
          Save Settings
        </button>

      </div>
    </div>
  );
};

export default Settings;