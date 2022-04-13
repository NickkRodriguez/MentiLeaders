import { React, useState, useEffect }  from "react";
import UserDataService from "../services/user";

export const Blank = () => {
    const [studentName, setStudentName] = useState(null);

    const retrieveStudent = (studentName) => {
        UserDataService.getUser(studentName)
          .then((response) => {
              console.log(response.data);
              setStudentName(response.data.username);
          })
          .catch((e) => {
              console.log(e);
          });
    };

    useEffect(() => {
        retrieveStudent("Willy");
    });

    return (
        <div>{studentName}</div>
    );
};