import React, { useState, useEffect } from 'react';

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
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    setTime(h + ":" + checkTime(m) + ":" + checkTime(s));
  };

  useEffect(() => {
    updateTime(); // Refresh the time immediately
    setInterval(updateTime, 1000); // Refresh the time every second
  });

  return (
    <div>{time}</div>
  );
};

export default Clock;