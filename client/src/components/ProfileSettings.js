import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Switch, Avatar, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import "../components/ProfileSettings.css";
import { createAvatar } from '@dicebear/core';
import { avataaarsNeutral } from '@dicebear/collection';

const avatars = [
  'https://example.com/avatar1.png',
  'https://example.com/avatar2.png',
  'https://example.com/avatar3.png',
  // Aggiungi altri avatar predefiniti qui
];

const ProfileSettings = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [postOption, setPostOption] = useState('');
  const [username, setUsername] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [initialsAvatar, setInitialsAvatar] = useState('');

  const handleProfileVisibilityChange = (event) => {
    setIsProfilePublic(event.target.checked);
  };

  const handlePostOptionChange = (event) => {
    setPostOption(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setInitialsAvatar(event.target.value.charAt(0).toUpperCase());
  };

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

  const handleAvatarSelect = (avatar) => {
    setAvatarPreview(avatar);
    setSelectedAvatar(avatar);
  };

  const handleSaveSettings = () => {
    // Logic to save settings goes here
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

      <div className="avatar-selection">
        <div className="default-avatar">
          <Avatar sx={{ width: 56, height: 56 }}>{initialsAvatar}</Avatar>
          <p>Default Avatar</p>
        </div>
        {avatarPreview && (
          <div className="uploaded-avatar">
            <Avatar src={avatarPreview} alt="Avatar Preview" sx={{ width: 56, height: 56 }} />
            <p>Selected Avatar</p>
          </div>
        )}
      </div>

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

      <Button variant="contained" color="primary" fullWidth onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  );
};

export default ProfileSettings;
