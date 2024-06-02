import React from 'react';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import ProfileSettings from './ProfileSettings';
import PostSettings from './PostSettings';
import SecuritySettings from './SecuritySettings';
import DeleteAccount from './DeleteAccount'; // Importa DeleteAccount
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Logic to handle logout
    console.log("Logged out");
    navigate('/');
  };

  const handleDeleteAccount = () => {
    navigate('/settings/delete-account'); // Naviga alla pagina di conferma
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <Link to="/settings/profile" className={`settings-link ${location.pathname === '/settings/profile' ? 'active' : ''}`}>
          Profile Settings
        </Link>
        <Link to="/settings/posts" className={`settings-link ${location.pathname === '/settings/posts' ? 'active' : ''}`}>
          Post Settings
        </Link>
        <Link to="/settings/security" className={`settings-link ${location.pathname === '/settings/security' ? 'active' : ''}`}>
          Security Settings
        </Link>
        <button onClick={handleLogout} className="settings-link Goback-button">Go Back</button>
        <button onClick={handleDeleteAccount} className="settings-link delete-button">Delete Account</button>
      </div>
      <div className="settings-content">
        <Routes>
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="posts" element={<PostSettings />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="delete-account" element={<DeleteAccount />} /> {/* Aggiungi questa riga */}
          <Route path="/" element={<h2>Please select an option from the left.</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
