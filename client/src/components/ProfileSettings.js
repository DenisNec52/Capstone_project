import React, { useState } from 'react';
import { TextField, Button, Avatar, Grid } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUserAvatar } from '../actions/session';
import "../components/ProfileSettings.css";

const ProfileSettings = () => {
  const [avatarPreview, setAvatarPreview] = useState('');
  const [initialsAvatar, setInitialsAvatar] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setInitialsAvatar(event.target.value.charAt(0).toUpperCase());
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("Avatar URL from server:", response.data.url);
        setAvatarPreview(response.data.url);
        dispatch(updateUserAvatar(response.data.url));  // Dispatch action to update avatar
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    }
  };

  const handleSaveSettings = () => {
    // Additional settings save logic
    alert('Settings saved successfully');
  };

  return (
    <div className="profile-settings-container">
      <h2>Profile Settings</h2>
      <TextField
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
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
      <Button variant="contained" color="primary" fullWidth onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  );
};

export default ProfileSettings;
