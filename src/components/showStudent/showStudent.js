import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';


export default function ShowStudent() {

    const [studentsList, setStudentList] = useState([])
    const deleteStudent = (id) => {
        axios.delete(`https://mern-grade.herokuapp.com/students/${id}`).then(()=> {
          window.location.reload(false);
        })
    }
    useEffect(() => {
        axios.get('https://mern-grade.herokuapp.com/students').then((allStudents) => {
          setStudentList(allStudents.data);
          
        })
      }, [])

  return (
    <>
    <h2>Students Grades</h2>  
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="right">Course Name</TableCell>
            <TableCell align="right">Course Credits</TableCell>
            <TableCell align="right"> Course Grade</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsList.map((student, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.studentName}
              </TableCell>
              <TableCell align="right">{student.course}</TableCell>
              <TableCell align="right">{student.credits}</TableCell>
              <TableCell align="right">{student.grade}</TableCell>
              <TableCell align="right">
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick= {() => deleteStudent(student._id)}>
                Delete
              </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}