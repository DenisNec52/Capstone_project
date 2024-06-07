import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import "./DeleteAccount.css";

const DeleteAccount = () => {
  const navigate = useNavigate();

  // Funzione per gestire la conferma di eliminazione dell'account
  const handleConfirmDelete = () => {
    // Logica per eliminare l'account
    console.log("Account deleted");
    // Naviga alla home page dopo l'eliminazione
    navigate('/');
  };

  // Funzione per gestire l'annullamento della cancellazione dell'account
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
        {/* Pulsante per eliminare l'account */}
        <Button variant="contained" color="secondary" onClick={handleConfirmDelete}>
          Delete Account
        </Button>
        {/* Pulsante per annullare l'eliminazione dell'account */}
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteAccount;
