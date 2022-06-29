import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import "./LoginScreen.css";
import "./background.css";
import { UserContext } from '../../UserContext';

  const LoginScreen = ({history})=> {
  let navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usersList, setUsersList] = useState([]);

  let ans;
  const {value, setValue} = useContext(UserContext);

  useEffect(() => {
    if(localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json"
      },
    };
    try {

      const {data} = await axios.post("https://mern-grade.herokuapp.com/api/auth/login", {username, password}, config);

      axios.get('https://mern-grade.herokuapp.com/api/auth/login').then((allUsers) => {
      setUsersList(allUsers.data);
      ans = allUsers.data.find(user =>user.username===username);
      setValue(ans.username);
      localStorage.setItem("authToken", data.token);
      if (ans.type=="Lecturer")
        navigate("/lecturer");
      else
        navigate("/student");
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
    <div className= "login-screen">
    <form onSubmit={loginHandler} className="login-screen__form">
      <h3 className="login-screen__title">Login</h3>
      {error && <span className="error-message">{error}</span>}
      <div className="form-group">
        <label htmlFor="name">Username:</label>
        <input type="text" 
        required id="name" 
        placeholder="Enter username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}/>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" 
        required id="password" 
        placeholder="Enter password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <button type= "submit" className= "btn btn-primary">Login</button>
      <span className="login-screen__subtext">Don't have an account? <Link to="/register">Register</Link></span>
      </form></div>
      </div>
      );
};
export default LoginScreen;