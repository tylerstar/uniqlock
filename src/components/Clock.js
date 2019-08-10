import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [time, setTime] = useState("");

  const checkTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  const updateTime = () => {
    const date = new Date();
    const h = checkTime(date.getHours());
    const m = checkTime(date.getMinutes());
    const s = checkTime(date.getSeconds());

    setTime(h + ":" + m + ":" + s);
  };

  useEffect(() => {
    updateTime(); // Refresh the time immediately
    setInterval(updateTime, 1000); // Refresh the time every second
  });

  return (
    <div className="slider">
      <div className="clock">
        {time}
      </div>
    </div>
  );
};

export default Clock;