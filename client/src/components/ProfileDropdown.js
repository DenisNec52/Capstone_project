import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/session';

const ProfileDropdown = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick} style={{ display: 'flex', alignItems: 'center' }}>
        {user?.avatar ? <Avatar src={user.avatar} /> : <AccountCircleIcon />}
        <span className="nav-bar__profile-name">{user?.username}</span>
        <ArrowDropDownIcon />
      </IconButton>
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
