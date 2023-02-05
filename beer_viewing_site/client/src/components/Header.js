import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";

const Header = ({ history }) => {
  const handleLogout = (evt) => {
    logout(() => {
      history.push("/signin");
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Beers
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  <i className="fas fa-edit"></i> Signup
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signin">
                  <i className="fas fa-sign-in-alt"></i> Signin
                </a>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && isAuthenticated().role === 0 && (
            <Fragment>
              <li className="nav-item">
                <a className="nav-link" href="/user/dashboard">
                  <i className="fas fa-home"></i> Dashboard
                </a>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && isAuthenticated().role === 1 && (
            <Fragment>
              <li className="nav-item">
                <a className="nav-link" href="/admin/dashboard">
                  <i className="fas fa-home"></i> Dashboard
                </a>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <button
                  className="btn btn-link text-secondary text-decoration-none pl-0"
                  onClick={handleLogout}
                >
                  <i className="fas fa-signout-alt"></i> Logout
                </button>
              </li>
            </Fragment>
          )}
        </ul>
        <form className="form-inline my-2 my-lg-0" />
      </div>
    </nav>
  );
};

export default withRouter(Header);
