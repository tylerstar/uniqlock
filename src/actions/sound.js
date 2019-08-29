import { fetchSound } from '../api';
import { getSoundSeries } from "../constant/tracks";

export const PLAY_MUSIC_BEGIN = 'PLAY_MUSIC_BEGIN';
export const PLAY_MUSIC_SUCCESS = 'PLAY_MUSIC_SUCCESS';
export const PLAY_MUSIC_ERROR = 'PLAY_MUSIC_ERROR';
export const CREATE_AUDIO_PLAYER = 'CREATE_AUDIO_PLAYER';

export const createAudioPlayer = () => {
  return dispatch => {
    const audioContext = new AudioContext();
    dispatch({
      type: CREATE_AUDIO_PLAYER,
      payload: {
        audioContext
      }
    })
  };
};

export const playNextTrack = () => {
  return (dispatch, getState) => {
    dispatch({ type: PLAY_MUSIC_BEGIN });
    const context = getState().sound.audioContext;
    const currentIndex = getState().sound.currentIndex;
    const trackSeries = getState().sound.sounds['uniqlock2'];
    const source = context.createBufferSource();

    const getNextTrackIndex = (trackIndexes, currentIndex) => {
      const currentSoundIndex = trackIndexes.indexOf(currentIndex);
      if (currentSoundIndex + 1 === trackIndexes.length) {
        return 0;
      } else {
        return currentIndex + 1;
      }
    };

    const newSeries = 'uniqlock2';
    const newIndex = getNextTrackIndex(trackSeries, currentIndex);

    fetchSound(newSeries, newIndex)
      .then(resp => resp.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(buffer => {
        source.buffer = buffer;
        source.connect(context.destination);
        source.onended = () => dispatch(playNextTrack());
        source.start(0);
        dispatch({
          type: PLAY_MUSIC_SUCCESS,
          payload: {
            index: newIndex,
            series: newSeries
          }
        })
      })
      .catch(error => {
        dispatch({
          type: PLAY_MUSIC_ERROR,
          error
        })
      })
  };
};

