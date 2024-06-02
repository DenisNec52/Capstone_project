import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import "./DeleteAccount.css";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    // Logic to delete the account
    console.log("Account deleted");
    // Navigate to home page after deletion
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/settings');
  };

  return (
    <Box className="delete-account-container">
      <Typography variant="h4" gutterBottom>
        Confirm Account Deletion
      </Typography>
      <Typography variant="body1" gutterBottom>
        Are you sure you want to delete your account? This action cannot be undone.
      </Typography>
      <Box className="delete-account-buttons">
        <Button variant="contained" color="secondary" onClick={handleConfirmDelete}>
          Delete Account
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteAccount;
