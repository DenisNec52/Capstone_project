import React, { useState } from 'react';
import { Button, FormControlLabel, Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import "../components/PostSettings.css";

const PostSettings = () => {
  const [allowComments, setAllowComments] = useState(true);
  const [postVisibility, setPostVisibility] = useState('public');

  const handleAllowCommentsChange = (event) => {
    setAllowComments(event.target.checked);
  };

  const handlePostVisibilityChange = (event) => {
    setPostVisibility(event.target.value);
  };

  const handleSaveSettings = () => {
    // Logic to save settings goes here
    console.log('Saved post settings:', {
      allowComments,
      postVisibility,
    });
  };

  return (
    <div className="post-settings-container">
      <h2>Post Settings</h2>

      <FormControlLabel
        control={
          <Switch
            checked={allowComments}
            onChange={handleAllowCommentsChange}
            name="allowComments"
            color="primary"
          />
        }
        label={allowComments ? "Comments are allowed" : "Comments are not allowed"}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="post-visibility-select-label">Post Visibility</InputLabel>
        <Select
          labelId="post-visibility-select-label"
          value={postVisibility}
          onChange={handlePostVisibilityChange}
          fullWidth
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
          <MenuItem value="friends">Friends only</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" fullWidth onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  );
};

export default PostSettings;
