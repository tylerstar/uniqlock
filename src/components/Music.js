import React, { useState, useEffect } from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import './Music.css';

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // const audio = new Audio(soundFiles);
    // audio.play();
  }, []);

  return (
    <div>
      <VolumeUpIcon className="volume" onClick={toggleMusic} />
    </div>
  );
};

export default Music;