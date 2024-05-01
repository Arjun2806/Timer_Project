import React, { useState, useRef, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const [startTime, setStartTime] = useState(null);
  const [displayTime, setDisplayTime] = useState(null);

  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [time]);

  function start() {
    setIsRunning(true);

    clearInterval(intervalRef.current);
    // intervalRef.current = setInterval(() => {
    //   setTime(prevTime => prevTime - 1);
    // }, 1000);
  }

  const start1 = () => {
    setStartTime(new Date());
    startTimer(new Date());
  }

  const startTimer = (start) => {
    intervalRef.current = setInterval(() => {
      setDisplayTime((time*1000) - (new Date() - start));
      console.log(start);
    }, 100);
  }

  function stop() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function reset() {
    setTime(10);
    setIsRunning(false);
  }

  function formatTime(timeInmSeconds) {
    const timeInSeconds = timeInmSeconds/1000;
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className='timer'>
      <div className='display'>{formatTime(displayTime)}</div>
      <div className='controls'>
      <button onClick={() => start1()}>Start1</button>

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
