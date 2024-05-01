import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [splitTimes, setSplitTimes] = useState([]);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    setSplitTimes([]);
  }

  function split() {
    setSplitTimes([...splitTimes, elapsedTime]);
  }

  function formatTime(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor(time / 1000 % 60);
    let milliseconds = Math.floor((time % 1000) / 10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  return (
    <div className='stopwatch'>
      <div className='display'>{formatTime(elapsedTime)}</div>
      <div className='controls'>
        {isRunning ? (
          <button onClick={stop} className='stop-button'>Stop</button>
        ) : (
          <button onClick={start} className='start-button'>Start</button>
        )}
        <button onClick={reset} className='reset-button' disabled={isRunning}>Reset</button>
        <button onClick={split} className='split-button' disabled={!isRunning}>Split</button>
      </div>
      <div className='split-times'>
        <h3>Split Times</h3>
        <ol type='1'>
          {splitTimes.map((time, index) => (
            <li key={index}>{formatTime(time)}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Stopwatch;
