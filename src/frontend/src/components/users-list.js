import React, { useState, useEffect } from "react";
import UserDataService from "../services/user";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  // const [username, setUsername] = useState(null);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserDataService.getClass("COP4600")
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
          var index;
          for (var i = 0; i < user.classes.length; i++) {
            if (user.classes[i] === "COP4600") {
              index = i;
              break;
            }
          }
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{user.username}</h5>
                  <p className="card-text">
                    <strong>Score: </strong>
                    {user.scores[index]}
                    <br />
                    <strong>Classname: </strong>
                    {user.classes[index]}
                    <br />
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
