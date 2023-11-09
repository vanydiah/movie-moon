import { Link, useLocation } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import NavbarSearch from "./NavbarSearch";

const MainNavigation: React.FC = () => {
  let location = useLocation();
  const mediaType = location.pathname.split("/")[1];

  const moviesSelected = mediaType === "movie" ? classes.navActive : "";
  const tvSelected = mediaType === "tv" ? classes.navActive : "";
  const peopleSelected = mediaType === "person" ? classes.navActive : "";
  return (
    <header className={`navbar navbar-expand-md ${classes.navbar}`}>
      <nav className="container">
        <h3>
          <Link to="/" className="navbar-brand logo-icon">
            MOVIE <i className="fa-solid fa-moon" />MOON
          </Link>
        </h3>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <i className="text-white fa-solid fa-ellipsis-vertical"></i>
        </button>

        <NavbarSearch />
        
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className={`navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll order-1 ${classes["navbar-nav"]}`}
          >
            <li className={`nav-item dropdown ${moviesSelected}`}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Movie
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li>
                  <Link to="/movie/popular" className="dropdown-item">
                    Popular
                  </Link>
                  <Link to="/movie/now-playing" className="dropdown-item">
                    Now Palying
                  </Link>
                  <Link to="/movie/trending" className="dropdown-item">
                    Trending
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`nav-item dropdown ${tvSelected}`}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                TV Shows
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li>
                  <Link to="/tv/popular" className="dropdown-item">
                    Popular
                  </Link>
                  <Link to="/tv/trending" className="dropdown-item">
                    Trending
                  </Link>
                </li>
              </ul>
            </li>
            <li className={`nav-item dropdown ${peopleSelected}`}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                People
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li>
                  <Link to="/person" className="dropdown-item">
                    Popular People
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
