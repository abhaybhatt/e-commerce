import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Menu.css";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const Menu = ({ history }) => {
  return (
    <div className="navbar">
      <ul>
        <li style={currentTab(history, "/")}>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li style={currentTab(history, "/cart")}>
          <Link className="link" to="/cart">
            Cart
          </Link>
        </li>
        <li style={currentTab(history, "/dashboard/user")}>
          <Link className="link" to="/dashboard/user">
            Dashboard
          </Link>
        </li>
        <li style={currentTab(history, "/dashboard/admin")}>
          <Link className="link" to="/dashboard/admin">
            A.Dashboard
          </Link>
        </li>
        <li style={currentTab(history, "/signin")}>
          <Link className="link" to="/signin">
            Sign in
          </Link>
        </li>
        <li style={currentTab(history, "/signup")}>
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </li>
        <li style={currentTab(history, "/signout")}>
          <Link className="link" to="/signout">
            Sign out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
