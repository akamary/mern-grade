import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export default function Create() {
    const [student, setStudent] = useState({
        studentName: '',
        course: '',
        credits: '',
        grade: ''
    });

    //const [type, setType] = useState("");

    const createStudent = () => {
        axios.post('https://mern-grade.herokuapp.com/students', student).then( () => {
          window.location.reload(false);
        })
    }

  return (
      <>
    <h2>Add new student Grade</h2>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1.4, width: '25ch' },bgcolor: 'white',width: '28ch' 
      }}
      noValidate
      autoComplete="off">
      <TextField id="outlined-basic" label="Student Name" variant="outlined" value={student.studentName} onChange={(event) => {
          setStudent({...student, studentName: event.target.value})
      }}/>
      <TextField id="outlined-basic" label="Course Name" variant="outlined" value={student.course} onChange={(event) => {
          setStudent({...student, course: event.target.value})
      }}/>
      <TextField id="outlined-basic" label="Course Credits" variant="outlined" value={student.credits} onChange={(event) => {
          setStudent({...student, credits: event.target.value})
      }}/>
      <TextField id="outlined-basic" label="Course Grade" variant="outlined" value={student.grade} onChange={(event) => {
          setStudent({...student, grade: event.target.value})
      }}/>
      
      <Button variant="contained" startIcon={<AddIcon />} onClick={createStudent}>ADD</Button>
    </Box>
    </>
  );
}