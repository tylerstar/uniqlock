import { useContext } from 'react';
import { MusicPlayerContext } from '../contexts/MusicPlayContext';

const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  const getMusicURL = (series, index) => {
    return "https://uniqlock.s3-ap-northeast-1.amazonaws.com" +
      `/uniqlo_extra/${series}/sound/sound${index}.mp3`
  };

  const playTrack = (series, index) => {
    if (series === state.currentTrackSeries && index === state.currentTrackIndex) {
      togglePlay();
    } else {
      state.audioPlayer.pause();
      state.audioPlayer = new Audio(getMusicURL(series, index));
      state.audioPlayer.onended = () => {
        setState(state => ({
          ...state,
          isPlaying: false,
          hasPlayed: true
        }));
        console.log('onended!');
        console.log(state);
      };
      setState(state => ({
        ...state,
        currentTrackSeries: series,
        currentTrackIndex: index,
        hasPlayed: false,
      }));
      console.log("start to play...");
      console.log(state);
      const playPromise = state.audioPlayer.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
            setState(state => ({
              ...state,
              isPlaying: true
            }));
          })
          .catch(error => {
            console.log(error.message);
        });
      }
    }
  };

  const togglePlay = () => {
    if (state.isPlaying) {
      state.audioPlayer.pause();
    } else {
      state.audioPlayer.play();
    }
    setState(state => ({ ...state, isPlaying: !state.isPlaying }));
  };

  const playNextTrack = () => {
    const newSeries = 'uniqlock2';
    const currentTrackIndexes = state.trackSeries[state.currentTrackSeries];
    if (currentTrackIndexes.indexOf(state.currentTrackIndex) + 1 === currentTrackIndexes.length) {
      playTrack(newSeries, 0);
    } else {
      playTrack(newSeries, state.currentTrackIndex + 1);
    }
  };

  return {
    playTrack,
    togglePlay,
    currentTrackSeries: state.currentTrackSeries,
    currentTrackIndex: state.currentTrackIndex,
    trackList: state.trackSeries[state.currentTrackSeries],
    isPlaying: state.isPlaying,
    playNextTrack
  };
};

export default useMusicPlayer;