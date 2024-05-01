import React, { useState, useRef, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [time]);

  function start() {
    setIsRunning(true);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
  }

  function stop() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function reset() {
    setTime(10);
    setIsRunning(false);
  }

  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className='timer'>
      <div className='display'>{formatTime(time)}</div>
      <div className='controls'>
        {!isRunning ? (
          <button onClick={start} className='start-button' disabled={time === 0}>Start</button>
        ) : (
          <button onClick={stop} className='stop-button'>Stop</button>
        )}
        <button onClick={reset} className='reset-button' disabled={isRunning}>Reset</button>
      </div>
    </div>
  );
}

export default Timer;
