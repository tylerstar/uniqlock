import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';
import videojs from 'video.js';
import { playVideo } from "../actions/video";
import { getCurrentVideoURL } from "../selectors";
import Video from './Video';
import './Clock.css';

const Clock = ({ city, country }) => {
  const [time, setTime] = useState("");
  const [slideClass, setSlideClass] = useState("slideDown");
  const [videoIndex, setVideoIndex] = useState(null);
  const [videoSeries, setVideoSeries] = useState("uniqlock2");

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

  const getNextVideoIndex = () => {
    if (videoIndex === 80 || videoIndex === null) {
      return 0;
    } else {
      return videoIndex + 1;
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
    const seconds = date.getSeconds();
    const s = _formatTime(seconds);

    const latestTime = h + " " + m + " " + s;

    if (time !== latestTime) {
      setTime(latestTime);
      const nextAnimClass = getNextAnim(slideClass);
      setSlideClass(nextAnimClass);
    }

    if (seconds % 5 === 0) {
      setVideoIndex(getNextVideoIndex());
    }
  };

  setTimeout(updateTime, 1000);

  return (
    <>
      <div className={`${slideClass} background`}>
        <div className="main-panel">
          <div className='clock'>
            <div className="time">{time}</div>
            <div className="destination">{city} / {country}</div>
          </div>
          <Video series={videoSeries} index={videoIndex} />
        </div>
      </div>
    </>
  );
};

const mapState = state => ({
  city: state.user.city,
  country: state.user.country,
  videoURL: getCurrentVideoURL(state)
});
export default connect(
  mapState,
  { playVideo }
)(Clock);