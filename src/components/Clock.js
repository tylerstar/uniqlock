import React, { useState } from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import  Music from './Music';
import './Clock.css';

const Clock = ({ city, country }) => {
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

    const latestTime = h + " " + m + " " + s;

    if (time !== latestTime) {
      setTime(latestTime);
      const nextAnimClass = getNextAnim(slideClass);
      setSlideClass(nextAnimClass);
    }
  };

  setTimeout(updateTime, 1000);

  return (
    <>
      <div className={`${slideClass} background`}>
        <div className="clock">
          <div className="time">{time}</div>
          <div className="destination">{city} / {country}</div>
        </div>
      </div>
    </>
  );
};

const mapState = state => ({
  city: state.user.city,
  country: state.user.country
});
export default connect(
  mapState,
)(Clock);