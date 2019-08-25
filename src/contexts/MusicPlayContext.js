import React, { useState, createContext } from 'react';

const MusicPlayerContext = createContext(undefined);

const MusicPlayerProvider = props => {
  const [state, setState] = useState({
    audioPlayer: new Audio(),
    trackSeries: {
      'uniqlock2': [0, 1, 2, 3, 4],
    },
    currentTrackSeries: 'uniqlock2',
    currentTrackIndex: -1,
    isPlaying: false,
    hasPlayed: false,
  });

  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
};

export { MusicPlayerContext, MusicPlayerProvider };