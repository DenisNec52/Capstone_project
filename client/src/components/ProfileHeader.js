import React from "react";

import "./ProfileHeader.css";

const ProfileHeader = ({ user }) => {
  return (
    <div className="header__container">
      {/* Wrapper per l'avatar utente */}
      <div className="avatar__wrapper">
        {/* Mostra la lettera iniziale del nome utente come avatar */}
        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
      </div>
      
      {/* Nome utente */}
      <h1>{user.name}</h1>
      
      {/* Nome utente */}
      <span className="username">@{user.username}</span>
    </div>
  );
};

export default ProfileHeader;
