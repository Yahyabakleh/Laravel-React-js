import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";
function ShowEmployee() {
  const history = useHistory();
  if (localStorage.getItem("auth_user_role") === "0") {
    new swal("warning", "Access Denied", "warning");
    history.push("/admin");
  }
  const [loading, setLoading] = useState(true);
  const [Employeelist, setEmployeelist] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/show-employee`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setEmployeelist(res.data.Employee);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/delete-admin/${id}`).then((res) => {
      if (res.data.status === 200) {
        new swal("Success", res.data.message, "success");
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 404) {
        new swal("Success", res.data.message, "success");
        thisClicked.innerText = "Delete";
      }
    });
  };

  var viewEmployee_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading Employee...</h4>;
  } else {
    viewEmployee_HTMLTABLE = Employeelist.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            <Link to={`edit/${item.id}`} className="btn btn-success btn-sm">
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteEmployee(e, item.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <Link className="btn btn-primary" to="add">
                Add Employee
              </Link>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{viewEmployee_HTMLTABLE}</tbody>
              </table>
            </div>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default ShowEmployee;
