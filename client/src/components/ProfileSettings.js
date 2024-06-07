import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Switch, Avatar, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import "../components/ProfileSettings.css";
import { createAvatar } from '@dicebear/core';
import { avataaarsNeutral } from '@dicebear/collection';

// Avatar predefiniti
const avatars = [
  'https://example.com/avatar1.png',
  'https://example.com/avatar2.png',
  'https://example.com/avatar3.png',
  // Aggiungi altri avatar predefiniti qui
];

const ProfileSettings = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Avatar selezionato
  const [isProfilePublic, setIsProfilePublic] = useState(true); // Visibilità del profilo
  const [postOption, setPostOption] = useState(''); // Opzioni di post
  const [username, setUsername] = useState(''); // Nome utente
  const [avatarPreview, setAvatarPreview] = useState(''); // Anteprima dell'avatar
  const [initialsAvatar, setInitialsAvatar] = useState(''); // Avatar iniziali

  // Gestisce il cambiamento della visibilità del profilo
  const handleProfileVisibilityChange = (event) => {
    setIsProfilePublic(event.target.checked);
  };

  // Gestisce il cambiamento delle opzioni di post
  const handlePostOptionChange = (event) => {
    setPostOption(event.target.value);
  };

  // Gestisce il cambiamento del nome utente
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setInitialsAvatar(event.target.value.charAt(0).toUpperCase());
  };

  // Gestisce il caricamento dell'avatar
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setSelectedAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gestisce la selezione dell'avatar
  const handleAvatarSelect = (avatar) => {
    setAvatarPreview(avatar);
    setSelectedAvatar(avatar);
  };

  // Gestisce il salvataggio delle impostazioni
  const handleSaveSettings = () => {
    // Logica per salvare le impostazioni
    console.log('Saved settings:', {
      selectedAvatar,
      isProfilePublic,
      postOption,
      username,
    });
  };

  return (
    <div className="profile-settings-container">
      <h2>Profile Settings</h2>

      {/* Campo di input per il nome utente */}
      <FormControl fullWidth margin="normal">
        <TextField
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </FormControl>

      {/* Selezione dell'avatar */}
      <div className="avatar-selection">
        {/* Avatar predefinito */}
        <div className="default-avatar">
          <Avatar sx={{ width: 56, height: 56 }}>{initialsAvatar}</Avatar>
          <p>Default Avatar</p>
        </div>
        {/* Avatar caricato */}
        {avatarPreview && (
          <div className="uploaded-avatar">
            <Avatar src={avatarPreview} alt="Avatar Preview" sx={{ width: 56, height: 56 }} />
            <p>Selected Avatar</p>
          </div>
        )}
      </div>

      {/* Caricamento dell'avatar */}
      <div className="avatar-upload">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="avatar-upload-input"
          type="file"
          onChange={handleAvatarUpload}
        />
        <label htmlFor="avatar-upload-input">
          <Button variant="contained" color="primary" component="span">
            Upload Avatar
          </Button>
        </label>
      </div>

      {/* Griglia per gli avatar predefiniti */}
      <Grid container spacing={2} className="avatar-grid">
        {avatars.map((avatar, index) => (
          <Grid item key={index}>
            <Avatar
              src={avatar}
              alt={`Avatar ${index + 1}`}
              sx={{ width: 56, height: 56, cursor: 'pointer', border: avatar === avatarPreview ? '2px solid blue' : 'none' }}
              onClick={() => handleAvatarSelect(avatar)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Selezione delle opzioni di post */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="post-option-select-label">Post Options</InputLabel>
        <Select
          labelId="post-option-select-label"
          value={postOption}
          onChange={handlePostOptionChange}
          fullWidth
        >
          <MenuItem value="everyone">Everyone can comment</MenuItem>
          <MenuItem value="friends">Only friends can comment</MenuItem>
          <MenuItem value="none">No one can comment</MenuItem>
        </Select>
      </FormControl>

      {/* Interruttore per la visibilità del profilo */}
      <FormControlLabel
        control={
          <Switch
            checked={isProfilePublic}
            onChange={handleProfileVisibilityChange}
            name="profileVisibility"
            color="primary"
          />
        }
        label={isProfilePublic ? "Profile is Public" : "Profile is Private"}
      />

      {/* Bottone per salvare le impostazioni */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  );
};

export default ProfileSettings;
