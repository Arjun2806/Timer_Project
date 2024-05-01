import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import TimerPage from "./components/TimerPage"
import Stopwatch from "./components/Stopwatch"
import Welcome from "./components/WelcomePage";


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/timer" element={<TimerPage/>}/>
          <Route path="/stopwatch" element={<Stopwatch/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
