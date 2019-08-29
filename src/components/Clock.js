import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';
import { playVideo } from "../actions/video";
import { getCurrentVideoURL } from "../selectors";
import Video from './Video';
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

    if (seconds.toString().endsWith('1')) {
      setIsVideoPlay('hide-video');
    } else if (seconds.toString().endsWith('6')) {
      setIsVideoPlay('play-video');
      playerRef.current.play();
      setVideoIndex(getNextVideoIndex());
      // setPlayer(createPlayer(videoIndex));
    }
  };

  const getVideoURL = (series, index) => {
    if (index !== null && index >= 1 ) {
      return "https://uniqlock.s3-ap-northeast-1.amazonaws.com" +
        `/uniqlo_extra/uniqlock${series}/flv/5sec_${index}.mp4`;
    }
  };

  const createPlayer = index => {
    return (
      <video ref={playerRef} src={getVideoURL(series, index)} width="100%" height="auto" preload="auto"/>
    );
  };

  setTimeout(updateTime, 1000);

  useEffect(() => {
    const player = createPlayer(videoIndex);
    setPlayer(player);
  }, [videoIndex]);

  console.log(player);

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
  videoURL: getCurrentVideoURL(state),
  series: props.series
});
export default connect(
  mapState,
  { playVideo }
)(Clock);