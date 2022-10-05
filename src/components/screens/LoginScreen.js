import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";
import "./background.css";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import { UserContext } from "../../UserContext";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const LoginScreen = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [isLogged, setIsLogged] = useState("");

  let ans;
  const { value, setValue } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/student");
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        //"https://mern-grade.herokuapp.com/api/auth/login",
        "http://localhost:5000/api/auth/login",
        { username, password },
        config
      );
      console.log(data);
      axios
        //.get("https://mern-grade.herokuapp.com/api/auth/login")
        .get("http://localhost:5000/api/auth/login")
        .then((allUsers) => {
          setUsersList(allUsers.data);
          ans = allUsers.data.find((user) => user.username === username);
          setValue(ans.username);
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("flag", username);
          console.log(username);
          if (ans.type === "Lecturer") navigate("/lecturer");
          else navigate("/student", { username });
        });
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="background-image">
      <div className="login-screen">
        <form onSubmit={loginHandler} className="login-screen__form">
          <h3 className="login-screen__title">Sign in</h3>
          {error && <span className="error-message">{error}</span>}
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              startIcon={<PersonIcon />}
              type="text"
              required
              id="name"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              required
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
          <span className="login-screen__subtext">
            Don't have an account? <Link to="/register">Sign up</Link>
          </span>
        </form>
      </div>
    </div>
  );
};
export default LoginScreen;
