import React, { useState } from "react";

const SetTimer = ({ initialValue, onDoneClick }) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleDoneClick = () => {
    const newTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    onDoneClick(newTime);
  };

const handleClose = () => {
  setIsOpen(false);
};

  return (
    <main className="box">
      <div className='heading'>
        <h1>Set Timer</h1>
       
      </div>
      <div className='input-container'>
        <input type="number" id="hours" name="hours" min="0" max="23" value={hours} onChange={(e) => setHours(e.target.value)} onFocus={(e) => e.target.style.borderWidth = "2px"} onBlur={(e) => e.target.style.borderWidth = "1px"} style={{width: "60px"}} placeholder="Hrs" /> :
        <input type="number" id="minutes" name="minutes" min="0" max="59" value={minutes} onChange={(e) => setMinutes(e.target.value)} onFocus={(e) => e.target.style.borderWidth = "2px"} onBlur={(e) => e.target.style.borderWidth = "1px"} style={{width: "60px"}} placeholder="Mins" /> :
        <input type="number" id="seconds" name="seconds" min="0" max="59" value={seconds} onChange={(e) => setSeconds(e.target.value)} onFocus={(e) => e.target.style.borderWidth = "2px"} onBlur={(e) => e.target.style.borderWidth = "1px"} style={{width: "60px"}} placeholder="Secs" />
      </div>
      <div className='ending'>
        <button onClick={handleDoneClick}>Done</button>
      </div>
    </main>
  );
};

export default SetTimer;
