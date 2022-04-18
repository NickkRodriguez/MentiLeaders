import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";

import ClassList from "./components/class-list";
import Login from "./components/login";
import { ImportExcel } from "./components/import-excel";

import logo from "./MentiLeader.png";
import "./App.css";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <ReactBootStrap.Navbar className="color-nav navbar-dark" variant="light"> 
        {/* 
        <a href="/users" className="navbar-brand">
          <img src={logo} width={50} height={50} alt="Logo"></img>
          <Link to={"/users"} className="nav-link"></Link>
        </a>
        */}
        <div className="navbar-nav navbar-light">
          <li className="nav-item text-nav m-auto">
            <Link to={"/users"} className="nav-link">
              <img src={logo} width={40} height={40} alt="Logo"></img>
            </Link>
          </li>
          <li className="nav-item text-nav m-auto">
            <Link to={"/users"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item text-nav m-auto">
            <Link to={"/import-excel"} className="nav-link">
              Import
            </Link>
          </li>
          <li className="nav-tem m-auto"></li>
          <li className="nav-item m-auto">
            {user ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </ReactBootStrap.Navbar>

      <div className="container mt-3">
        <Switch>
          <Route
            exact
            path={["/", "/users"]}
            render={(props) => <ClassList {...props} user={user} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          />
          <Route
            path="/import-excel"
            render={(props) => <ImportExcel {...props} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
