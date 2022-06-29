import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Create() {
    const [student, setStudent] = useState({
        studentName: '',
        course: '',
        credits: '',
        grade: ''
    });

    const createStudent = () => {
        axios.post('https://mern-grade.herokuapp.com/students', student).then( () => {
          window.location.reload(false);
        })
    }

  return (
      <>
    <h2>Add Grade</h2>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1.2, width: '25ch' },bgcolor: 'white',width: '28ch' 
      }}
      noValidate
      autoComplete="off">
      <TextField id="outlined-basic" label="Name" variant="outlined" value={student.studentName} onChange={(event) => {
          setStudent({...student, studentName: event.target.value})
      }}/>
      <TextField id="outlined-basic" label="Course" variant="outlined" value={student.course} onChange={(event) => {
          setStudent({...student, course: event.target.value})
      }}/>
      <TextField id="outlined-basic" label="Credits" variant="outlined" value={student.credits} onChange={(event) => {
          setStudent({...student, credits: event.target.value})
      }}/>
      <TextField id="outlined-basic" label="Grade" variant="outlined" value={student.grade} onChange={(event) => {
          setStudent({...student, grade: event.target.value})
      }}/>

      <Button variant="contained" onClick={createStudent}>Create</Button>
    </Box>
    </>
  );
}