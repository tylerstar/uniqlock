import React, { useState, useEffect } from 'react';
import { fetchUserLocation } from "../api";
import Menu from './Menu';
import './Clock.css';

const Clock = () => {
  const [time, setTime] = useState("");
  const [slideClass, setSlideClass] = useState("slideDown");
  const [userLocation, setUserLocation] = useState({
    country: "JAPAN",
    city: "TOKYO"
  });

  useEffect(async () => {
    // const result = await fetchUserLocation(setUserLocation);
    // console.log(result);
    // if (result.time_zone && result.time_zone.name && result.country_name) {
    //   setUserLocation({
    //     city: result.time_zone.name.split("/")[1].toUpperCase(),
    //     country: result.country_name.toUpperCase()
    //   })
    // }
  }, []);

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
      <Menu/>
      <div className={`${slideClass} background`}>
        <div className="clock">
          <div className="time">{time}</div>
          <div className="destination">{userLocation.city} / {userLocation.country}</div>
        </div>
      </div>
    </>
  );
};

export default Clock;