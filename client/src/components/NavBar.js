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

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/${event.target.query.value}`);
  };

  return (
    <div className="nav-bar">
      <div className="nav-bar__icon nav-bar__icon--red">
        <Link to="/">
          <PinterestIcon />
        </Link>
      </div>
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
      <div className="nav-bar__icon-group">
        <div className="nav-bar__profile">
          <ProfileDropdown user={user} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
