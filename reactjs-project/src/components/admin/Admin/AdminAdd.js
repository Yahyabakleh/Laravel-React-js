import React, { useState } from "react";
import axios from "axios";
import SweetAlert2 from "sweetalert2";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
function AdminAdd() {
  const history = useHistory();
  if (
    localStorage.getItem("auth_user_role") === "1" ||
    localStorage.getItem("auth_user_role") === "0"
  ) {
    new SweetAlert2("warning", "Access Denied", "warning");
    history.push("/admin");
  }
  const [AddAdminInput, setAddAdmin] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    error_list: []
  });
  const handleInput = (e) => {
    e.persist();
    setAddAdmin({ ...AddAdminInput, [e.target.name]: e.target.value });
  };
  const AddAdminSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: AddAdminInput.name,
      email: AddAdminInput.email,
      password: AddAdminInput.password,
      password_confirmation: AddAdminInput.password_confirmation
    };
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios.post("api/add_admin", data).then((res) => {
        if (res.data.status === 200) {
          new SweetAlert2("Success", res.data.message, "success");
          history.push("/admin/admins/show");
        } else if (res.data.status === 401) {
          new SweetAlert2("Warning", res.data.message, "warning");
        } else {
          setAddAdmin({
            ...AddAdminInput,
            error_list: res.data.validation_errors
          });
        }
      });
    });
  };
  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Add Admin{" "}
                <Link
                  to="/admin/admins/show"
                  className="btn btn-primary btn-sm float-end"
                >
                  BACK
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={AddAdminSubmit}>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Name</label>
                      <input
                        type="name"
                        name="name"
                        onChange={handleInput}
                        value={AddAdminInput.name}
                        className="form-control"
                      />
                      <span>{AddAdminInput.error_list.name}</span>
                    </div>{" "}
                  </div>{" "}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Email ID</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleInput}
                        value={AddAdminInput.email}
                        className="form-control"
                      />
                      <span>{AddAdminInput.error_list.email}</span>
                    </div>
                  </div>{" "}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleInput}
                        value={AddAdminInput.password}
                        className="form-control"
                      />{" "}
                      <span>{AddAdminInput.error_list.password}</span>
                    </div>
                  </div>{" "}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Password Confirmation</label>
                      <input
                        type="password"
                        name="password_confirmation"
                        onChange={handleInput}
                        value={AddAdminInput.password_confirmation}
                        className="form-control"
                      />{" "}
                      <span>
                        {AddAdminInput.error_list.password_confirmation}
                      </span>
                    </div>
                  </div>{" "}
                </div>
                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminAdd;
