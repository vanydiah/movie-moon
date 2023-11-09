import React from "react";
import { Link } from "react-router-dom";
import SocialMediaLinks from "../common/SocialMediaLinks";
import classes from "./MainNavigation.module.css";

const Footer = () => {
  const socialLinks = {
    linkedin_id: "vanydiah",
    github_id: "vanydiah",
  };
  return (
    <footer className="footer mt-auto text-muted">
      <nav className="navbar navbar-expand-lg nav-footer"  style={{backgroundColor: '#060612'}}>
        <div className="container footer">
          <div className={`${classes.navbar}`}>
            <h4>
              <Link to="/" className="navbar-brand">
              MOVIE <i className="fa-solid fa-moon" />MOON
              </Link>
            </h4>
          </div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="navbar-text">
                <small>
                  Data provided by&nbsp;
                  <a href="https://www.themoviedb.org/" target="_blank" style={{textDecoration: 'none', color: '#a29f9f'}}>TMDb</a>&nbsp;&nbsp;|
                  &nbsp;&nbsp;Made with ♥ by <a href="https://vanydiah.carrd.co" target="_blank" style={{textDecoration: 'none', color: '#a29f9f'}}>Vany</a>
                </small>
              </span>
            </li>
          </ul>
          <div className="navbar-text text-center socialinks">
            <small>
              <SocialMediaLinks links={socialLinks} color="text-white" />
            </small>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
