import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaPlus,
  FaRegCommentDots,
  FaRegUserCircle,
} from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import "./Navbar.css";
export default function Navbar({ theme, setTheme }) {
  const { isAuthenticated, logout } = useContext(AuthContext),
    [open, setOpen] = useState(false),
    { pathname } = useLocation(),
    navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const leave = () => {
    logout();
    setOpen(false);
    navigate("/");
  };
  const links = (
    <>
      <NavLink to="/search">Marketplace</NavLink>
      <NavLink to="/blog">Journal</NavLink>
      <NavLink to="/chatlist">
        <FaRegCommentDots />
        Messages
      </NavLink>
      <NavLink to={isAuthenticated ? "/account" : "/login"}>
        <FaRegUserCircle />
        {isAuthenticated ? "Your account" : "Sign in"}
      </NavLink>
      {isAuthenticated && (
        <button className="gg-signout" onClick={leave}>
          Sign out
        </button>
      )}
      <Link className="gg-list-cta" to="/postAd">
        <FaPlus />
        Post Free Ads
      </Link>
    </>
  );
  return (
    <header className="gg-header">
      <div className="gg-header-inner">
        <Link className="gg-brand" to="/" aria-label="Green Gadgets home">
          <span>
            <FaLeaf />
          </span>
          Green Gadgets
        </Link>
        <nav className="gg-desktop-nav" aria-label="Main navigation">
          {links}
        </nav>
        <div className="gg-header-tools">
          <button
            className="gg-icon-button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={
              theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
            }
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
          <button
            className="gg-icon-button gg-menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="gg-mobile-nav"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="gg-mobile-nav"
          className="gg-mobile-nav"
          aria-label="Mobile navigation"
        >
          {links}
        </nav>
      )}
    </header>
  );
}
