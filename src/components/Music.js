import React, { useState, useEffect } from 'react';
import { playNextTrack } from "../actions";
import { connect } from 'react-redux';
import { Icon } from '@blueprintjs/core';
import './Music.css';

const Music = ({ context, playNextTrack }) => {
  const togglePlay = () => {
    if (context.state === 'running') {
      context.suspend();
    } else {
      context.resume();
    }
  };

  useEffect(() => {
    playNextTrack();
  }, []);

  return (
    <Icon icon="volume-up" className="volume" onClick={togglePlay} />
  );
};

const mapState = state => ({
  context: state.media.audioContext,
});
export default connect(
  mapState,
  { playNextTrack }
)(Music);