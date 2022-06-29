import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginScreen from "./components/screens/LoginScreen.js";
import RegisterScreen from "./components/screens/RegisterScreen.js";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import LecturerScreen from "./components/Lecturer.js";
import StudentsScreen from './components/StudentsScreen';
import { UserContext } from './UserContext.js';
import { useState , useMemo} from 'react';

const App = () => {
  const [value, setValue] = useState(null)
  const providerValue = useMemo(() => ({ value, setValue}), [value, setValue]);

  return (
    <Router>
      <div className="app">
        <UserContext.Provider value={providerValue}>
      <Routes>
        <Route path="/" element={<LecturerScreen/>}/>
        <Route path="/login" element={<LoginScreen/>}/>
        <Route path="/register" element={<RegisterScreen/>}/>
        <Route path="/lecturer" element={<LecturerScreen />}/>
        <Route path="/student" element= {<StudentsScreen/>} />
        <Route path="*" element={<ErrorPage />}/> 
      </Routes>
      </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;