import React, { useState, useEffect } from "react";

const TimerPage = () => {
  const [time, setTime] = useState(20); 
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setTimerRunning(false);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleToggle = () => {
    setTimerRunning((prevRunning) => !prevRunning);
  };

  const handleReset = () => {
    setTime(20); 
    setTimerRunning(false);
  };

  return (
    <div className="timer-page">
      <h1>Timer</h1>
      <h2>{formatTime(time)}</h2>
      <div className="timer-controls">
        <button onClick={handleToggle} disabled={time === 0}>{timerRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default TimerPage;
