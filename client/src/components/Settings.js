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

  // Funzione per gestire il logout
  const handleLogout = () => {
    console.log("Logged out"); // Logica per il logout
    navigate('/'); // Naviga alla home page dopo il logout
  };

  // Funzione per gestire la richiesta di eliminazione dell'account
  const handleDeleteAccount = () => {
    navigate('/settings/delete-account'); // Naviga alla pagina di conferma eliminazione account
  };

  return (
    <div className="settings-container">
      {/* Sidebar con i link per le diverse impostazioni */}
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
        {/* Bottone per il logout */}
        <button onClick={handleLogout} className="settings-link Goback-button">Go Back</button>
        {/* Bottone per eliminare l'account */}
        <button onClick={handleDeleteAccount} className="settings-link delete-button">Delete Account</button>
      </div>
      {/* Contenuto delle impostazioni */}
      <div className="settings-content">
        <Routes>
          {/* Rotte per le diverse impostazioni */}
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="posts" element={<PostSettings />} />
          <Route path="security" element={<SecuritySettings />} />
          {/* Rotta per la conferma di eliminazione dell'account */}
          <Route path="delete-account" element={<DeleteAccount />} />
          {/* Rotta di fallback per quando nessuna opzione è selezionata */}
          <Route path="/" element={<h2>Please select an option from the left.</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
