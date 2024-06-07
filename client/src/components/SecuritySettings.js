import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Switch } from '@mui/material';
import "../components/SecuritySettings.css";

const SecuritySettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false); // Abilitazione della doppia autenticazione
  const [currentPassword, setCurrentPassword] = useState(''); // Password attuale
  const [newPassword, setNewPassword] = useState(''); // Nuova password

  // Gestisce il cambiamento della doppia autenticazione
  const handleTwoFactorAuthChange = (event) => {
    setTwoFactorAuth(event.target.checked);
  };

  // Gestisce il cambiamento della password attuale
  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  // Gestisce il cambiamento della nuova password
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  // Gestisce il salvataggio delle impostazioni di sicurezza
  const handleSaveSettings = () => {
    // Logica per salvare le impostazioni
    console.log('Saved security settings:', {
      twoFactorAuth,
      currentPassword,
      newPassword,
    });
  };

  return (
    <div className="security-settings-container">
      <h2>Security Settings</h2>

      {/* Interruttore per abilitare/disabilitare la doppia autenticazione */}
      <FormControlLabel
        control={
          <Switch
            checked={twoFactorAuth}
            onChange={handleTwoFactorAuthChange}
            name="twoFactorAuth"
            color="primary"
          />
        }
        label={twoFactorAuth ? "Two-Factor Authentication is enabled" : "Two-Factor Authentication is disabled"}
      />

      {/* Campo di input per la password attuale */}
      <TextField
        label="Current Password"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
      />

      {/* Campo di input per la nuova password */}
      <TextField
        label="New Password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
      />

      {/* Bottone per salvare le impostazioni */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  );
};

export default SecuritySettings;
