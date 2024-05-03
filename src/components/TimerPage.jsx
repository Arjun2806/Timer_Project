import React, { useState, useRef } from 'react';

const TimerPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(10);
  const [displayTime, setDisplayTime] = useState(formatTime(totalTime * 1000));
  const [inputTime, setInputTime] = useState('');
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const intervalRef = useRef(null);

  function startTimer() {
    if (!isRunning) {
      const start = new Date();
      let initialTime = totalTime * 1000;
      
      if (inputTime !== '') {
        const [hours, minutes, seconds] = inputTime.split(':').map(Number);
        initialTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
      }
      
      setTotalTime(initialTime / 1000);
      setDisplayTime(formatTime(initialTime));
      
      intervalRef.current = setInterval(() => {
        const elapsedTime = initialTime - (new Date() - start);
        setDisplayTime(formatTime(elapsedTime));
        
        if (elapsedTime <= 0) {
          clearInterval(intervalRef.current);
          setDisplayTime(formatTime(0));
          setIsRunning(false);
          setIsResetDisabled(false);
        }
      }, 100);
      
      setIsRunning(true);
      setIsResetDisabled(true);
    } else {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setIsResetDisabled(false);
    }
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setInputTime('');
    setTotalTime(10);
    setDisplayTime(formatTime(totalTime * 1000));
    setIsResetDisabled(true);
  }

  function handleChange(event) {
    setInputTime(event.target.value);
  }

  
  function formatTime(timeInMilliseconds) {
    const timeInSeconds = timeInMilliseconds / 1000;
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className='timer-page'>
      <div className='display'>
      <h1 >{displayTime}</h1>
      </div>
      <input type="text" value={inputTime} onChange={handleChange} placeholder="Enter time in HH:MM:SS" disabled={isRunning} hidden={isRunning} />
      <div className="controls">
      <button className='start-button' onClick={startTimer} disabled={displayTime === '00:00:00'}>{isRunning ? 'Pause' : 'Start'}</button>
      <button className='reset-button' onClick={resetTimer} disabled={isResetDisabled}>{isRunning ? 'Reset' : 'Reset'}</button>
      </div>
    </div>
  );
};

export default TimerPage;
