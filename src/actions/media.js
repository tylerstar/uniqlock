import { fetchSound } from '../api';
import { getSoundMaxIndexBySeries } from "../constant/tracks";

export const PICK_RANDOM_SERIES = 'PICK_RANDOM_SERIES';
export const CREATE_AUDIO_PLAYER = 'CREATE_AUDIO_PLAYER';
export const PLAY_MUSIC_BEGIN = 'PLAY_MUSIC_BEGIN';
export const PLAY_MUSIC_SUCCESS = 'PLAY_MUSIC_SUCCESS';
export const PLAY_MUSIC_ERROR = 'PLAY_MUSIC_ERROR';

export const pickRandomSeries = () => {
  return dispatch => {
    const allVideoSeries = [2, 3, 4, 5, 6];
    dispatch({
      type: PICK_RANDOM_SERIES,
      payload: {
        series: allVideoSeries[Math.floor(Math.random() * allVideoSeries.length)],
      }
    });
  };
};

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

export const playSoundTrack = series => {
  return (dispatch, getState) => {
    dispatch({ type: PLAY_MUSIC_BEGIN });
    const context = getState().media.audioContext;
    const currentSoundIndex = getState().media.currentSoundIndex;
    const currentSeries = getState().media.currentSeries;
    const seriesMaxIndex = getSoundMaxIndexBySeries(currentSeries);
    const source = context.createBufferSource();

    const getNextIndex = (maxIndex, currentIndex) => {
      if (currentIndex === maxIndex) {
        return 0;
      } else {
        return currentIndex + 1;
      }
    };

    const newIndex = getNextIndex(seriesMaxIndex, currentSoundIndex);

    fetchSound(currentSeries, newIndex)
      .then(resp => resp.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(buffer => {
        source.buffer = buffer;
        source.connect(context.destination);
        source.onended = () => dispatch(playSoundTrack(series));
        source.start(0);
        dispatch({
          type: PLAY_MUSIC_SUCCESS,
          payload: {
            index: newIndex,
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
