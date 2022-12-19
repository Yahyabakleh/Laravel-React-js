import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SweetAlert2 from "sweetalert2";

function ViewOrder(props) {
  const history = useHistory();
  if (
    localStorage.getItem("auth_user_role") === "1" ||
    localStorage.getItem("auth_user_role") === "2"
  ) {
    new SweetAlert2("warning", "Access Denied", "warning");
    history.push("/admin");
  }

  const [loading, setLoading] = useState(true);
  const [orderlist, setorderlist] = useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: `/api/update-order/${props.match.params.id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.data.status === 200) {
        new SweetAlert2("Success", response.data.message, "success");
        history.push("/admin/orders/show");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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
  // var path = "http://127.0.0.1:8000/order-returnfile/" + props.match.params.id;
  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                View Order
                <Link
                  to="/admin/orders/show"
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
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group mb-3">
                      <input
                        type="file"
                        name="file"
                        onChange={handleFileSelect}
                        className="form-control"
                        accept=".pdf"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <button type="submit" className="btn btn-primary">
                        upload & save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewOrder;
