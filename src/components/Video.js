import React from 'react';
import './Video.css';

const Video = ({ videoURL }) => {
  // Prefetch the video and generate a blob url then pass the url here
  // Just to ensure autoplay can trigger play immediately
  return (
    <video width="100%" autoPlay>
      <source src={ videoURL } type="video/mp4" />
    </video>
  );
};

export default Video;