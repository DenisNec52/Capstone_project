import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Switch } from '@mui/material';
import "../components/SecuritySettings.css";

const SecuritySettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleTwoFactorAuthChange = (event) => {
    setTwoFactorAuth(event.target.checked);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSaveSettings = () => {
    // Logic to save settings goes here
    console.log('Saved security settings:', {
      twoFactorAuth,
      currentPassword,
      newPassword,
    });
  };

  return (
    <div className="security-settings-container">
      <h2>Security Settings</h2>

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

      <TextField
        label="Current Password"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
      />

      <TextField
        label="New Password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  );
};

export default SecuritySettings;
