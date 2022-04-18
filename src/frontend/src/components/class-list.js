import React, { useEffect, useState } from "react";
import UserDataService from "../services/user";
import * as ReactBootStrap from "react-bootstrap";

const ClassList = (props) => {
  //const [classes, setClasses] = useState([]);
  //const [users, setUsers] = useState([]);
  const [classObjs, setClassObjs] = useState([]);

  useEffect(() => {
    retrieveClassObjs();
  }, []);

  const retrieveClasses = async () => {
    //UserDataService.getUser(props.user.name)
    //  .then((response) => {
    //    console.log(response.data);
    //    setClasses(response.data.users[0].classes);
    //  })
    //  .catch((e) => {
    //    console.log(e);
    //  });
    const response = await UserDataService.getUser(props.user.name);
    return response.data.users[0].classes;
  };

  const retrieveUsers = async (classname) => {
    //UserDataService.getClass(classname).then((response) => {
    //  console.log(response.data);
    //  setUsers(response.data.users);
    //});
    const response = await UserDataService.getClass(classname);
    return response.data.users;
  };

  const retrieveClassObjs = async () => {
    var classes = await retrieveClasses();
    let classObjsTemp = [];
    for (var i = 0; i < classes.length; i++) {
      let classObj = [];
      var users = await retrieveUsers(classes[i]);
      for (var j = 0; j < users.length; j++) {
        var index;
        for (var k = 0; k < users[j].classes.length; k++) {
          if (users[j].classes[k] === classes[i]) {
            index = k;
            break;
          }
        }
        const userObj = {
          username: users[j].username,
          score: users[j].scores[index],
          classname: users[j].classes[index],
        };
        classObj.push(userObj);
      }
      classObj.sort((a, b) => b.score - a.score);
      classObjsTemp.push(classObj);
    }
    setClassObjs(classObjsTemp);
  };

  return (
    <div>
      {classObjs.length ? (
        
        <button onClick={retrieveClassObjs} className="btn btn-success">
          Refresh User Leaderboards
        </button>
        
      ) : (
        <div>
          <h5>
            Please login with valid username to retrieve class leaderboards
          </h5>
          <button onClick={retrieveClassObjs} className="btn btn-success">
            Retrieve User Leaderboards
          </button>
        </div>
      )}
      <div className="row">
        {classObjs.map((classObj) => {
          var index = 0;
          if (classObj.length === 0) {
            return null;
          }
          return (
            <div className="container mt-3">
              <h5>{classObj[0].classname}</h5>
              <ReactBootStrap.Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Position</th>
                  </tr>
                </thead>

                <tbody>
                  {classObj.map((userObj) => {
                    index += 1;
                    return (
                      <tr>
                        <td>{userObj.username}</td>
                        <td>{userObj.score}</td>
                        <td>{index}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </ReactBootStrap.Table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassList;
