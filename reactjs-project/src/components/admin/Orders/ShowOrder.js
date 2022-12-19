import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import swal from "sweetalert2";
function ShowOrder() {
  const history = useHistory();
  if (
    localStorage.getItem("auth_user_role") === "1" ||
    localStorage.getItem("auth_user_role") === "2"
  ) {
    new Swal("warning", "Access Denied", "warning");
    history.push("/admin");
  }
  const [loading, setLoading] = useState(true);
  const [orderlist, setorderlist] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/show-order`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setorderlist(res.data.order);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  var vieworder_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading order...</h4>;
  } else {
    vieworder_HTMLTABLE = orderlist.map((item) => {
      var status = "";
      if (item.status === 0) {
        status = (
          <span className="btn btn-warning btn-sm" disabled>
            Pending
          </span>
        );
      } else if (item.status === 1) {
        status = (
          <span className="btn btn-success btn-sm" disabled>
            accept
          </span>
        );
      } else if (item.status === 2) {
        status = (
          <span className="btn btn-danger btn-sm" disabled>
            Rejected
          </span>
        );
      } else {
      }
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{status}</td>
          <td>
            <Link to={`view/${item.id}`} className="btn btn-primary btn-sm">
              View
            </Link>
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
              <h4>ORDERS</h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{vieworder_HTMLTABLE}</tbody>
              </table>
            </div>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default ShowOrder;
