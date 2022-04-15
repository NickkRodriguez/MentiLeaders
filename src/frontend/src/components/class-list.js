import React, { useState, useEffect } from "react";
import UserDataService from "../services/user";

const ClassList = (props) => {
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveClasses();
  }, []);

  const retrieveClasses = () => {
    UserDataService.getUser("aduffaut")
      .then((response) => {
        console.log(response.data);
        setClasses(response.data.users[0].classes);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveUsers = (classname) => {
    UserDataService.getClass(classname).then((response) => {
      console.log(response.data);
      setUsers(response.data.users);
    });
  };

  return (
    <div>
      <div className="row">
        {classes.map((classname) => {
          retrieveUsers(classname);
          // eslint-disable-next-line no-lone-blocks
          {
            return (
              <div>
                {users.map((userId) => {
                  var index;
                  for (var i = 0; i < userId.classes.length; i++) {
                    if (userId.classes[i] === classname) {
                      index = i;
                    }
                  }
                  return (
                    <div className="col-lg-4 pb-1">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{userId.username}</h5>
                          <p className="card-text">
                            <strong>Score: </strong>
                            {userId.scores[index]}
                            <br />
                            <strong>Classname: </strong>
                            {userId.classes[index]}
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ClassList;
