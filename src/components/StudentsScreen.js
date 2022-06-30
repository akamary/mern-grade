import * as React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import CurrStudent from "./showCurrStudent/showCurrStudent.js";
import { Box } from "@mui/system";
import useStyles from "../styles";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./screens/backscreens.css";

const StudentsScreen = ({ history }) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const { value, setValue } = useContext(UserContext);
  let currUser = value; 

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          "https://mern-grade.herokuapp.com/api/private",
          config
        );
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized, please log in first");
      }
    };
    fetchPrivateData();
  }, [history]);
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="background-screens">
      <div className="App">
        <Container maxWidth="md">
          <AppBar
            className={classes.appBar}
            position="static"
            style={{backgroundColor: "teal"}}
          >
            <Typography className={classes.heading} variant="h3" align="center">
              Welcome {currUser}!
            </Typography>
          </AppBar>

          <Grow in>
            <Container>
              <Grid
                container 
                justify="center"
                align="center"
                alignItems="center"
                direction="column"
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={8}>
                  <CurrStudent />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>
        <Box textAlign="center" margin="30px">
          <Button variant="outlined" onClick={logoutHandler}>
            Logout
          </Button>
        </Box>
      </div>
    </div>
  );
};
export default StudentsScreen;
