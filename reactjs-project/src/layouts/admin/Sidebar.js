import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  var list = "";
  console.log(localStorage.getItem("auth_user_role"));
  if (localStorage.getItem("auth_user_role") === "0") {
    list = (
      <div className="nav">
        <div className="sb-sidenav-menu-heading">Core</div>

        <Link className="nav-link" to="/admin/orders/show">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          Orders
        </Link>
      </div>
    );
  } else if (localStorage.getItem("auth_user_role") === "1") {
    list = (
      <div className="nav">
        <div className="sb-sidenav-menu-heading">Core</div>

        <Link className="nav-link" to="/admin/employee/show">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          Employee
        </Link>
        <Link className="nav-link" to="/admin/admin-orders/show">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          Orders
        </Link>
      </div>
    );
  } else if (localStorage.getItem("auth_user_role") === "2") {
    list = (
      <div className="nav">
        <div className="sb-sidenav-menu-heading">Core</div>
        <Link className="nav-link" to="/admin/admins/show">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          Admin
        </Link>
        <Link className="nav-link" to="/admin/employee/show">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          Employee
        </Link>
        <Link className="nav-link" to="/admin/admin-orders/show">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          Orders
        </Link>
        <Link className="nav-link" to="/admin/log">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          Log
        </Link>
      </div>
    );
  }
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">{list}</div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        {localStorage.getItem("auth_name")}
      </div>
    </nav>
  );
};

export default Sidebar;
