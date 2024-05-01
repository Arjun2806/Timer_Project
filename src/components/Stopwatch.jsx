import React, { useState, useEffect } from "react";

const StopwatchPage = () => {
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [splits, setSplits] = useState([]);

  const formatTime = (timeInMilliseconds) => {
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = timeInMilliseconds % 1000;
  
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;
  };

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleStart = () => {
    setTimerRunning(true);
  };

const handlePause = () => {
    setTimerRunning(false);
  };

  const handleSplit = () => {
    setSplits((prevSplits) => [...prevSplits, time]);
  };

  const handleReset = () => {
    setTime(0);
    setTimerRunning(false);
    setSplits([]);
  };

  return (
    <div className="stopwatch-page">
      <h1>Stopwatch</h1>
      <h2>{formatTime(time)}</h2>
      <div className="stopwatch-controls">
        {timerRunning ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        <button onClick={handleSplit}>Split</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="split-times">
        <h3>Splits:</h3>
        <ul>
          {splits.map((split, index) => (
            <li key={index}>{formatTime(split)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StopwatchPage;
