import React, { useState } from 'react';
import { Button, FormControlLabel, Switch, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import "../components/PostSettings.css";

const PostSettings = () => {
  // Stati per impostazioni dei post
  const [allowComments, setAllowComments] = useState(true); // Impostazione per consentire i commenti
  const [postVisibility, setPostVisibility] = useState('public'); // Impostazione per la visibilità del post

  // Funzione per gestire il cambio dello switch per consentire i commenti
  const handleAllowCommentsChange = (event) => {
    setAllowComments(event.target.checked);
  };

  // Funzione per gestire il cambio della visibilità del post
  const handlePostVisibilityChange = (event) => {
    setPostVisibility(event.target.value);
  };

  // Funzione per salvare le impostazioni dei post
  const handleSaveSettings = () => {
    // Logica per salvare le impostazioni
    console.log('Saved post settings:', {
      allowComments,
      postVisibility,
    });
  };

  return (
    <div className="post-settings-container">
      <h2>Post Settings</h2>

      {/* Switch per consentire i commenti */}
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

      {/* Selezione della visibilità del post */}
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

      {/* Pulsante per salvare le impostazioni */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  );
};

export default PostSettings;
