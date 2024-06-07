import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PinterestIcon from "@mui/icons-material/Pinterest";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/ProfileDropdown";
import "./NavBar.css";

const NavBar = ({ query }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  // Funzione per gestire la ricerca
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/${event.target.query.value}`);
  };

  return (
    <div className="nav-bar">
      {/* Icona del logo Pinterest */}
      <div className="nav-bar__icon nav-bar__icon--red">
        <Link to="/">
          <PinterestIcon />
        </Link>
      </div>
      {/* Link per la homepage */}
      <div className="nav-bar__link">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-bar__link--active" : "nav-bar__link--inactive"
          }
        >
          Home
        </NavLink>
      </div>
      {/* Box di ricerca */}
      <div className="nav-bar__search-box">
        <SearchIcon />
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            name="query"
            defaultValue={query || ""}
          />
          <button type="submit"></button>
        </form>
      </div>
      {/* Gruppo di icone del profilo utente */}
      <div className="nav-bar__icon-group">
        <div className="nav-bar__profile">
          {/* Dropdown del profilo utente */}
          <ProfileDropdown user={user} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
