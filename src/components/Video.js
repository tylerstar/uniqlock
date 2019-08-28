import React, { useState, useEffect, useRef } from 'react';
import videojs from 'video.js';
import { connect } from 'react-redux';

const Video = ({ series, index }) => {
  const getVideoURL = (series, index) => {
    if (index !== null && index >= 1 ) {
      return "https://uniqlock.s3-ap-northeast-1.amazonaws.com" +
        `/uniqlo_extra/${series}/flv/5sec_${index}.mp4`;
    }
  };

  // useEffect(() => {
    // const player = videojs(playerRef.current,
    //   { muted: true, controls: false, autoplay: true },
    //   () => player.src(getVideoURL(series, index)));
  // }, [series, index]);

  return (
    <video autoPlay src={getVideoURL(series, index)}/>
  );
};

export default Video;