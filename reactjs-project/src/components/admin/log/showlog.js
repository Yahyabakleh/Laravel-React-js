import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import swal from "sweetalert2";
function Showlog() {
  const [loading, setLoading] = useState(true);
  const [Loglist, setLoglist] = useState([]);
  const history = useHistory();
  if (
    localStorage.getItem("auth_user_role") === "1" ||
    localStorage.getItem("auth_user_role") === "0"
  ) {
    new swal("warning", "Access Denied", "warning");
    history.push("/admin");
  }
  useEffect(() => {
    let isMounted = true;

    axios.get(`/api/activities`).then((res) => {
      if (isMounted) {
        if (res.status === 200) {
          setLoglist(res.data.activity);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  var viewLog_HTMLTABLE = "";
  if (loading) {
    return <h4>Loading Log...</h4>;
  } else {
    viewLog_HTMLTABLE = Loglist.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.description}</td>
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
              <h4>Log</h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Log description</th>
                  </tr>
                </thead>
                <tbody>{viewLog_HTMLTABLE}</tbody>
              </table>
            </div>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default Showlog;
