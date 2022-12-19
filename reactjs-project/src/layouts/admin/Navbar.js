import React from "react";
import { Link } from "react-router-dom";
import SweetAlert2 from "sweetalert2";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const history = useHistory();
  var logoutSubmit = (e) => {
    e.preventDefault();
    axios.post("api/logout").then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        new SweetAlert2("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link to="#" className="navbar-brand ps-3">
        Home
      </Link>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
      >
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0 hidden"></form>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <button
            type="button"
            className="nav-link btn btn-danger btn-sm text-white  "
            onClick={logoutSubmit}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
