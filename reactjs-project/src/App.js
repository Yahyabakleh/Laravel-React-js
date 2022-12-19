import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import AdminPrivateRoute from "./AdminPrivateRoute";
// import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/login";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route exact path="/" component={<Redirect to="/login" />} /> */}
          <Route exact path="/">
            {localStorage.getItem("auth_token") ? <Login /> : <Login />}
          </Route>

          <Route path="/login">
            {localStorage.getItem("auth_token") ? (
              <Redirect to="/admin" />
            ) : (
              <Login />
            )}
          </Route>
          {/* <Route
            path="/admin"
            name="Admin"
            render={(props) => <MasterLayout {...props} />}
          /> */}
          <AdminPrivateRoute path="/admin" name="Admin" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
