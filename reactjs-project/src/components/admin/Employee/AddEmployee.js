import React, { useState } from "react";
import axios from "axios";
import SweetAlert2 from "sweetalert2";
import { useHistory } from "react-router-dom";
function AddEmployee() {
  const history = useHistory();
  if (localStorage.getItem("auth_user_role") === "0") {
    new SweetAlert2("warning", "Access Denied", "warning");
    history.push("/admin");
  }
  const [AddEmployeeInput, setAddEmployee] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    error_list: []
  });
  const handleInput = (e) => {
    e.persist();
    setAddEmployee({ ...AddEmployeeInput, [e.target.name]: e.target.value });
  };
  const AddEmployeeSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: AddEmployeeInput.name,
      email: AddEmployeeInput.email,
      password: AddEmployeeInput.password,
      password_confirmation: AddEmployeeInput.password_confirmation
    };
    axios.get("sanctum/csrf-cookie").then((response) => {
      axios.post("api/add_employee", data).then((res) => {
        if (res.data.status === 200) {
          new SweetAlert2("Success", res.data.message, "success");
          history.push("/admin/employee/show");
        } else if (res.data.status === 401) {
          new SweetAlert2("Warning", res.data.message, "warning");
        } else {
          setAddEmployee({
            ...AddEmployeeInput,
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
              <h4>Add Employee</h4>
            </div>
            <div className="card-body">
              <form onSubmit={AddEmployeeSubmit}>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Name</label>
                      <input
                        type="name"
                        name="name"
                        onChange={handleInput}
                        value={AddEmployeeInput.name}
                        className="form-control"
                      />
                      <span>{AddEmployeeInput.error_list.name}</span>
                    </div>{" "}
                  </div>{" "}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Email ID</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleInput}
                        value={AddEmployeeInput.email}
                        className="form-control"
                      />
                      <span>{AddEmployeeInput.error_list.email}</span>
                    </div>
                  </div>{" "}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleInput}
                        value={AddEmployeeInput.password}
                        className="form-control"
                      />{" "}
                      <span>{AddEmployeeInput.error_list.password}</span>
                    </div>
                  </div>{" "}
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Password Confirmation</label>
                      <input
                        type="password"
                        name="password_confirmation"
                        onChange={handleInput}
                        value={AddEmployeeInput.password_confirmation}
                        className="form-control"
                      />{" "}
                      <span>
                        {AddEmployeeInput.error_list.password_confirmation}
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
export default AddEmployee;
