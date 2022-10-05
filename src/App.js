import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/screens/LoginScreen.js";
import RegisterScreen from "./components/screens/RegisterScreen.js";
import LecturerScreen from "./components/LecturerScreen.js";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { UserContext } from "./UserContext.js";
import { useState, useMemo } from "react";
import StudentsScreen from "./components/StudentsScreen";
import PrivateRoute from "./components/routing/PrivateRoute.js";

const App = () => {
  const [value, setValue] = useState(null);
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <Router>
      <div className="app">
        <UserContext.Provider value={providerValue}>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route element={<StudentsScreen />} path="/student:name" />
            </Route>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/lecturer:name" element={<LecturerScreen />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
