import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import {
  getSeriesMaxIndex,
  getVideoURL
} from "../constants/videos";
import './ClockAnimation.css';
import './Clock.css';

const Clock = ({ city, country, series, currentColour }) => {
  const [time, setTime] = useState("");
  const [currentAnimation, setCurrentAnimation] = useState(null);
  const [videoIndex, setVideoIndex] = useState(1);
  const [isVideoPlay, setIsVideoPlay] = useState('hide-video');
  const [player, setPlayer] = useState(null);
  const playerRef = useRef();
  const animation = useRef();

  // Animation
  const getAnimationStyleByColour = (currentColour) => {
    const colourName = currentColour.slice(1);
    return [
      `slideDown-${colourName}`,
      `slideLeft-${colourName}`,
      `slideUp-${colourName}`,
      `slideRight-${colourName}`,
    ];
  };

  useEffect(() => {
    const animationStyle = getAnimationStyleByColour(currentColour);
    animation.current = animationStyle;
    setCurrentAnimation(animationStyle[0]);
  }, [currentColour]);

  // Videos
  const getNextAnim = currAnim => {
    const currAnimIndex = animation.current.indexOf(currAnim);
    if (currAnimIndex + 1 === animation.current.length) {
      return animation.current[0];
    } else {
      return animation.current[currAnimIndex + 1];
    }
  };

  const getNextVideoIndex = () => {
    if (videoIndex === getSeriesMaxIndex(series, 'day') || videoIndex === null) {
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

  // Animation & video preloading trigger
  const updateTime = () => {
    const date = new Date();
    const h = _formatTime(date.getHours());
    const m = _formatTime(date.getMinutes());
    const seconds = date.getSeconds();
    const s = _formatTime(seconds);

    const latestTime = h + " " + m + " " + s;

    if (time !== latestTime) {
      setTime(latestTime);
      const nextAnimClass = getNextAnim(currentAnimation);
      setCurrentAnimation(nextAnimClass);
    }

    if (seconds.toString().endsWith('1')) {
      setIsVideoPlay('hide-video');
      // Initialise next video tag with preload='auto' as to preload video while ticking
      setVideoIndex(getNextVideoIndex());
    } else if (seconds.toString().endsWith('6')) {
      setIsVideoPlay('play-video');
      playerRef.current.play();
    }
  };

  // Refresh this component after 1 second in order to apply new animation or video
  setTimeout(updateTime, 1000);

  // Initialise the video if videoIndex and series changed
  useEffect(() => {
    const createPlayer = index => {
      return (
        <video ref={playerRef} src={getVideoURL(series, index, 'day')} width="100%" height="auto" preload="auto"/>
      );
    };

    const player = createPlayer(videoIndex);
    setPlayer(player);
  }, [videoIndex, series]);

  return (
    <>
      <div className={`video-panel ${isVideoPlay}`}>
        <Video player={player} />
      </div>
      <div className={`${currentAnimation} background`}>
        <div className="main-panel">
          <div className='clock'>
            <div className="time">{time}</div>
            <div className="destination">{city} / {country}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapState = state => ({
  city: state.user.city,
  country: state.user.country,
  series: state.media.currentSeries,
  currentColour: state.media.currentColour
});
export default connect(
  mapState,
)(Clock);