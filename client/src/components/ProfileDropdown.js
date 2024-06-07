import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/session';

const ProfileDropdown = ({ user }) => {
  // Stato per gestire l'apertura e la chiusura del menu
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  // Funzione per gestire il click sull'icona del profilo
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Funzione per chiudere il menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Funzione per gestire il logout
  const handleLogout = () => {
    dispatch(logout()); // Esegue l'azione di logout
    handleClose(); // Chiude il menu dopo il logout
  };

  return (
    <div>
      {/* Icona del profilo con nome utente */}
      <IconButton onClick={handleClick} style={{ display: 'flex', alignItems: 'center' }}>
        {/* Mostra l'avatar utente se disponibile, altrimenti mostra l'icona predefinita */}
        {user?.avatar ? <Avatar src={user.avatar} /> : <AccountCircleIcon />}
        <span className="nav-bar__profile-name">{user?.username}</span>
        <ArrowDropDownIcon />
      </IconButton>

      {/* Menu a discesa con le opzioni del profilo */}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/settings">Settings</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/upload">Upload</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
