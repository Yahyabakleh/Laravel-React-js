import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SweetAlert2 from "sweetalert2";
function ViewAdminOrder(props) {
  const history = useHistory();
  if (localStorage.getItem("auth_user_role") === "0") {
    new SweetAlert2("warning", "Access Denied", "warning");
    history.push("/admin");
  }
  const [loading, setLoading] = useState(true);
  const [orderlist, setorderlist] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/view-order/${props.match.params.id}`).then((res) => {
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
  });

  var acceptSubmit = (e) => {
    e.preventDefault();
    axios.post(`api/accept-order/${props.match.params.id}`).then((res) => {
      if (res.data.status === 200) {
        new SweetAlert2("Success", res.data.message, "success");
        history.push("/admin/admin-orders/show");
      }
    });
  };
  var rejectSubmit = (e) => {
    e.preventDefault();
    axios.post(`api/reject-order/${props.match.params.id}`).then((res) => {
      if (res.data.status === 200) {
        new SweetAlert2("Success", res.data.message, "success");
        history.push("/admin/admin-orders/show");
      }
    });
  };
  var vieworder_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading order...</h4>;
  } else {
    vieworder_HTMLTABLE = (
      <div className="p-5">
        <h4>{orderlist.name}</h4>
        <p className="p-5">{orderlist.description}</p>
      </div>
    );
  }

  var path = "http://127.0.0.1:8000/order-returnfile/" + props.match.params.id;
  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                View Order
                <Link
                  to="/admin/admin-orders/show"
                  className="btn btn-primary btn-sm float-end"
                >
                  BACK
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-12">{vieworder_HTMLTABLE}</div>
                <div className="col-md-12">
                  <div className="col-md-12">
                    <a href={path} target="_blank" rel="noreferrer">
                      {orderlist.name} PDF File{" "}
                    </a>
                  </div>{" "}
                  <div className="col-md-12 mt-5">
                    <button
                      type="button"
                      className="btn btn-success btn-sm text-white float-start"
                      onClick={acceptSubmit}
                    >
                      accept
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm text-white float-end"
                      onClick={rejectSubmit}
                    >
                      reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewAdminOrder;
