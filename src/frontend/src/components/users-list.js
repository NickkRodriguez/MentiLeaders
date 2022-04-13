import React, { useState, useEffect } from "react";
import UserDataService from "../services/user";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.users);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //   const refreshList = () => {
  //     retrieveUsers();
  //   };

  return (
    <div>
      <div className="row">
        {users.map((user) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.username}</h5>
                  <p className="card-text">
                    <strong>Score: </strong>
                    {user.score}
                    <br />
                    <strong>Classname: </strong>
                    {user.classname}
                    <br />
                    <strong>Attendance: </strong>
                    {user.attendance}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
