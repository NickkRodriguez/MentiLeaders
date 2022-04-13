import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ReactBootStrap from "react-bootstrap";

import AddUser from "./components/add-user";
import User from "./components/user";
import UsersList from "./components/users-list";
import Login from "./components/login";

import logo from "./MentiLeader.png";
import './App.css';

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  const users = [

    {name: "Aaron", score: "1", attendance: "1"},
    {name: "Alex", score: "2", attendance: "2"},
    {name: "Nick", score: "3", attendance: "1"},
    {name: "Willy", score: "4", attendance: "3"},
    {name: "Will Smith", score: "5", attendance: "1"},
    {name: "Chris Rock", score: "6", attendance: "2"},
    {name: "Bruh", score: "69420", attendance: "3"},
  ]

  const renderUser = (user, index) => {

    return(
      <tr>
        <td>{user.name}</td>
        <td>{user.score}</td>
        <td>{user.attendance}</td>
      </tr>
    )

  }

  return (


    <div>

      <ReactBootStrap.Navbar className="color-nav navbar-dark" variant="light" >
        <a href="/users" className="navbar-brand">
          <img src={logo} width={50} height={50} alt="Logo"></img>
        </a>
        <div className="navbar-nav mr-auto navbar-light">
          <li className="nav-item text-nav">
            <Link to={"/users"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item text-nav">
            <Link to={"/users"} className="nav-link">
              Import Data
            </Link>
          </li>
          <li className="nav-tem">

          </li>
          <li className="nav-item">
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
          <Route exact path={["/", "/users"]} component={UsersList} />
          <Route
            path="/users/:id/update"
            render={(props) => <AddUser {...props} user={user} />}
          />
          <Route
            path="/users/:id"
            render={(props) => <User {...props} user={user} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          />
        </Switch>
      </div>

      <div className="container mt-3">
        <h1>Class</h1>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {users.map(renderUser)}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    </div>
  );
}

export default App;
