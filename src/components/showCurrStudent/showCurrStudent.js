import React, { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { UserContext } from "../../UserContext";

export default function ShowCurrStudent() {
  const [gradesList, setGradesList] = useState([]);

  const { value, setValue } = useContext(UserContext);
  let cal1 = 0;
  let cal2 = 0;
  let avg = 0;

  useEffect(() => {
    let currUser = value;
    console.log(currUser);
    const getCurrStudent = (studentName) => {
      axios
        .get(`https://mern-grade.herokuapp.com/students/${studentName}`)
        .then((userGrades) => {
          setGradesList(userGrades.data);
        });
    };

    getCurrStudent(currUser);

    for (var i = 0; i < gradesList.length; i++) {}
  }, []);

  const myFunc = () => {
    if (gradesList.length !== 0) {
      gradesList.map(
        (grade, key) => (
          (cal1 = cal1 + grade.grade * grade.credits),
          (cal2 = cal2 + grade.credits),
          (avg = (Math.round((cal1 / cal2) * 100) / 100).toFixed(2))
        )
      );
    } else {
      avg = 0;
    }
  };

  return (
    <>
      <h2>{value}'s Grades</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Course Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Course Credits
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Course Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gradesList.map((student, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.course}
                </TableCell>
                <TableCell>{student.credits}</TableCell>
                <TableCell>{student.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <br></br>
      <h3>
        {value}, your average is: {(myFunc(), avg)}
      </h3>
    </>
  );
}
