import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [time, setTime] = useState("");
  const [slideClass, setSlideClass] = useState("slideDown");

  const slideAnimLoop = [
    "slideDown",
    "slideLeft",
    "slideUp",
    "slideRight"
  ];

  const getNextAnim = currAnim => {
    const currAnimIndex = slideAnimLoop.indexOf(currAnim);
    if (currAnimIndex + 1 === slideAnimLoop.length) {
      return slideAnimLoop[0];
    } else {
      return slideAnimLoop[currAnimIndex + 1];
    }
  };

  const _formatTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  const updateTime = () => {
    const date = new Date();
    const h = _formatTime(date.getHours());
    const m = _formatTime(date.getMinutes());
    const s = _formatTime(date.getSeconds());

    const latestTime = h + ":" + m + ":" + s;

    if (time !== latestTime) {
      const nextAnimClass = getNextAnim(slideClass);
      setSlideClass(nextAnimClass);
      setTime(latestTime);
    }
  };

  setTimeout(updateTime, 1000);

  return (
    <div className={slideClass}>
      <div className="clock">
        {time}
      </div>
    </div>
  );
};

export default Clock;