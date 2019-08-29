import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import { getVideoMaxIndexBySeries } from "../constants/videos";
import './Clock.css';

const Clock = ({ city, country, series }) => {
  const [time, setTime] = useState("");
  const [slideClass, setSlideClass] = useState("slideDown");
  const [videoIndex, setVideoIndex] = useState(1);
  const [isVideoPlay, setIsVideoPlay] = useState('hide-video');
  const [player, setPlayer] = useState(null);
  const playerRef = useRef();

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
    if (videoIndex === getVideoMaxIndexBySeries(series) || videoIndex === null) {
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

    if (seconds.toString().endsWith('1')) {
      setIsVideoPlay('hide-video');
      setVideoIndex(getNextVideoIndex());
    } else if (seconds.toString().endsWith('6')) {
      setIsVideoPlay('play-video');
      playerRef.current.play();
    }
  };

  const getVideoURL = (series, index) => {
    let filename;
    if (series === 2) {
      filename = `5sec_${index}.mp4`;
    } else if (series === 3) {
      filename = `5sec${index}.mp4`;
    } else if (series === 4 ||  series === 5) {
      filename = `5sec_uc${series}_${index}.mp4`;
    } else if (series === 6) {
      filename = `uniqlock6_5sec_${index}.mp4`;
    }

    if (index !== null && index >= 1 ) {
      return "https://uniqlock.s3-ap-northeast-1.amazonaws.com" +
        `/uniqlo_extra/uniqlock${series}/flv/` + filename;
    }
  };

  setTimeout(updateTime, 1000);

  useEffect(() => {
    const createPlayer = index => {
      return (
        <video ref={playerRef} src={getVideoURL(series, index)} width="100%" height="auto" preload="auto"/>
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
      <div className={`${slideClass} background`}>
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

const mapState = (state, props) => ({
  city: state.user.city,
  country: state.user.country,
  series: props.series
});
export default connect(
  mapState,
)(Clock);