import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon } from '@blueprintjs/core';
import './Music.css';

const Music = ({ context }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const togglePlay = () => {
    if (context.state === 'running') {
      context.suspend();
      setIsPlaying(false);
    } else {
      context.resume();
      setIsPlaying(true);
    }
  };

  let icon;
  if (isPlaying) {
    icon = <Icon icon="volume-up" className="volume" onClick={togglePlay} />;
  } else {
    icon = <Icon icon="volume-off" className="volume" onClick={togglePlay} />
  }

  useEffect(() => {
  }, [isPlaying]);

  return icon;
};

const mapState = state => ({
  context: state.media.audioContext,
});
export default connect(
  mapState,
)(Music);