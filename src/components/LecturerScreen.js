import * as React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import axios from "axios";
import Student from "./showStudent/showStudent.js";
import Create from "./createStudent/createStudent.js";
import Button from "@mui/material/Button";
import useStyles from "../styles";
import { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import "./screens/backscreens.css";

const LecturerScreen = ({ history }) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

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
          "http://localhost:5000/api/private",
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
            style={{ backgroundColor: "teal" }}
          >
            <Typography className={classes.heading} variant="h3" align="center">
              Welcome Lecturer!
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
                <Grid item xs={4}>
                  <Create />
                </Grid>
                <Grid item xs={12}>
                  <Student />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>
        <Box textAlign="center" margin="30px">
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={logoutHandler}
          >
            Logout{" "}
          </Button>
        </Box>
      </div>
    </div>
  );
};
export default LecturerScreen;
