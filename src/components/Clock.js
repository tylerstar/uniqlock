import React, { useState } from 'react';

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

  setInterval(updateTime, 1000);

  return (
    <div>{time}</div>
  );
};

export default Clock;