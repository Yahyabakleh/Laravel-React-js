import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";
function AdminShow() {
  const history = useHistory();
  if (
    localStorage.getItem("auth_user_role") === "1" ||
    localStorage.getItem("auth_user_role") === "0"
  ) {
    new swal("warning", "Access Denied", "warning");
    history.push("/admin");
  }
  const [loading, setLoading] = useState(true);
  const [Adminlist, setAdminlist] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/show-admin`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setAdminlist(res.data.Admin);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const deleteAdmin = (e, id) => {
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

  var viewAdmin_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading Admin...</h4>;
  } else {
    viewAdmin_HTMLTABLE = Adminlist.map((item) => {
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
              onClick={(e) => deleteAdmin(e, item.id)}
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
                Add Admin
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
                <tbody>{viewAdmin_HTMLTABLE}</tbody>
              </table>
            </div>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default AdminShow;
