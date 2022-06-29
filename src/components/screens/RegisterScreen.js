import React from 'react';
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import "./RegisterScreen.css";
import "./background.css"
import { UserContext } from '../../UserContext';

const RegisterScreen = ({history})=> {
  let navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const {value, setValue} = useContext(UserContext);
  const [usersList, setUsersList] = useState([]);
  let ans;

  useEffect(() => {
    if(localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    if(password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("")
      }, 5000 );
      return setError("Password do not match")
    }
    try {
      console.log(type, username, password);
      const {data} = await axios.post("/api/auth/register", {username, password, type}, config);
      axios.get('/api/auth/login').then((allUsers) => {
        setUsersList(allUsers.data);
        ans = allUsers.data.find(user =>user.username===username);
        setValue(ans.username);
      });
      localStorage.setItem("authToken", data.token);
      if (type=="Lecturer")
        navigate("/lecturer");
      else
        navigate("/student");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="background-image">
      <div className= "register-screen">
        <form onSubmit={registerHandler} className="register-screen__form">
        <h3 className="register-screen__title">Register</h3>
          {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input 
            type="text" 
            required id="name" 
            placeholder="Enter username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

      <div className="form-group">
        <label htmlFor="type">Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
          <option hidden></option>
          <option value="Student">Student</option>
          <option value="Lecturer">Lecturer</option>
        </select> 
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input 
        type="password" 
        required id="password" 
        placeholder="Enter password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <div className="form-group">
        <label htmlFor="confirmpassword">Confirm Password:</label>
        <input 
        type="password" 
        required id="confirmpassword" 
        placeholder="Confirm password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}/>
      </div>

      <button type= "submit" className= "btn btn-primary">Register</button>

      <span className="register-screen__subtext">Already have an account? <Link to="/login">Login</Link></span>
    </form></div>
      </div>
      );
};

export default RegisterScreen;