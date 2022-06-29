import * as React from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@mui/material'
import Student from './showStudent/showStudent.js';
import Create from './createStudent/createStudent.js';
import useStyles from '../styles';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';


  
  const LecturerScreen = ({ history}) => {
    const classes = useStyles();
    let navigate=useNavigate();
    const [error, setError] = useState("");
    const [privateData, setPrivateData]= useState("");   

    useEffect(()=> {
        if(!localStorage.getItem("authToken")) {
            navigate("/login");
        }
        
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

        try {
            const {data} = await axios.get("https://mern-grade.herokuapp.com/api/private", config);
            setPrivateData(data.data);
        } catch (error) {
            localStorage.removeItem("authToken");
            setError("You are not authorized, please log in first");
        }
        }
        fetchPrivateData();
    }, [history])
    const logoutHandler=()=> {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

  return (
    <div className="App">
       <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="warning">
          <Typography className={classes.heading} variant="h2" align="center" >Welcome, Lecturer!</Typography>
        </AppBar>
        <Grow in>
          <Container>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={8}>
          <Student/>
        </Grid>
        <Grid item xs={4}>
        <Create/>
        </Grid>
      </Grid>
          </Container>
        </Grow>
      </Container>
      <Box textAlign='center' margin='30px'>
      <Button variant="outlined" onClick= {logoutHandler}>Logout  </Button>
      </Box>
    </div>
  );
}
export default LecturerScreen;