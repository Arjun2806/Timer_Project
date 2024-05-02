import React, { useState, useRef, useEffect } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [splitTimes, setSplitTimes] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startStopwatch = () => {
    if (!isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        setElapsedTime(elapsed);
      }, 1000);
      setIsRunning(true);
    } else {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setSplitTimes([]);
  };

  const recordSplitTime = () => {
    setSplitTimes([...splitTimes, elapsedTime]);
  };

  const formatTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch">
      <div className="display">
        <h1>{formatTime(elapsedTime)}</h1>
      </div>
      <div className="controls">
        <button className="start-button" onClick={startStopwatch}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="reset-button" onClick={resetStopwatch} disabled={isRunning || splitTimes.length === 0}>
          Reset
        </button>
        <button className="split-button" onClick={recordSplitTime} disabled={!isRunning}>
          Split
        </button>
      </div>
      <div className="split-times">
        <h3>Split Times</h3>
        <ol type="1">
          {splitTimes.map((time, index) => (
            <li key={index}>{formatTime(time)}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Stopwatch;
