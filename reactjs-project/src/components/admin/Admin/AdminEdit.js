import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";

function AdminEdit(props) {
  const history = useHistory();
  if (
    localStorage.getItem("auth_user_role") === "1" ||
    localStorage.getItem("auth_user_role") === "0"
  ) {
    new swal("warning", "Access Denied", "warning");
    history.push("/admin");
  }

  const [loading, setLoading] = useState(true);
  const [adminInput, setadmin] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    const admin_id = props.match.params.id;
    axios.get(`/api/edit-admin/${admin_id}`).then((res) => {
      if (res.data.status === 200) {
        setadmin(res.data.admin);
      } else if (res.data.status === 404) {
        new swal("Error", res.data.message, "error");
        history.push("/admin/admins/show");
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const handleInput = (e) => {
    e.persist();
    setadmin({ ...adminInput, [e.target.name]: e.target.value });
  };

  const updateadmin = (e) => {
    e.preventDefault();

    const admin_id = props.match.params.id;
    const data = adminInput;
    axios.put(`/api/update-admin/${admin_id}`, data).then((res) => {
      if (res.data.status === 200) {
        new swal("Success", res.data.message, "success");
        setError([]);
      } else if (res.data.status === 422) {
        new swal("All fields are mandetory", "", "error");
        setError(res.data.errors);
      } else if (res.data.status === 404) {
        new swal("Error", res.data.message, "error");
        history.push("admin/view-admin");
      }
    });
  };

  if (loading) {
    return <h4>Loading Edit admin...</h4>;
  }

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Edit Admin
                <Link
                  to="/admin/admins/show"
                  className="btn btn-primary btn-sm float-end"
                >
                  BACK
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={updateadmin}>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Name</label>
                      <input
                        type="name"
                        name="name"
                        onChange={handleInput}
                        value={adminInput.name}
                        className="form-control"
                      />
                      <small className="text-danger">{error.name}</small>
                    </div>{" "}
                  </div>{" "}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Email ID</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleInput}
                        value={adminInput.email}
                        className="form-control"
                      />
                      <small className="text-danger">{error.email}</small>
                    </div>
                  </div>{" "}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleInput}
                        placeholder="if you dont want to change the password leave this field empty"
                        className="form-control"
                      />{" "}
                    </div>
                  </div>{" "}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Password Confirmation</label>
                      <input
                        type="password"
                        name="password_confirmation"
                        onChange={handleInput}
                        placeholder="if you dont want to change the password leave this field empty"
                        className="form-control"
                      />{" "}
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
export default AdminEdit;
