import React, { useEffect, useState } from "react";
import UserDataService from "../services/user";
import * as ReactBootStrap from "react-bootstrap";

const ClassList = (props) => {
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = useState([]);
  const [classObjs, setClassObjs] = useState([]);

  useEffect(() => {
    retrieveClassObjs();
  }, []);

  const retrieveClasses = () => {
    UserDataService.getUser(props.user.name)
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

  const retrieveClassObjs = async () => {
    retrieveClasses();
    let classObjsTemp = [];
    for (var i = 0; i < classes.length; i++) {
      let classObj = [];
      retrieveUsers(classes[i]);
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
        {/* const users = [
    { name: "Aaron", score: "1", attendance: "1" },
    { name: "Alex", score: "2", attendance: "2" },
    { name: "Nick", score: "3", attendance: "1" },
    { name: "Willy", score: "4", attendance: "3" },
    { name: "Will Smith", score: "5", attendance: "1" },
    { name: "Chris Rock", score: "6", attendance: "2" },
    { name: "Bruh", score: "69420", attendance: "3" },
  ];

  const renderUser = (user, index) => {
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.score}</td>
        <td>{user.attendance}</td>
      </tr>
    );
  }; */}
        {/* <div className="container mt-3">
        <h1>Class</h1>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>{users.map(renderUser)}</tbody>
        </ReactBootStrap.Table>
      </div> */}
        {/* <div className="row">
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
      </div> */}
      </div>
    </div>
  );
};

export default ClassList;
