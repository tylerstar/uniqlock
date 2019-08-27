import {
  fetchSound,
  fetchUserLocation,
} from '../api';
export const LOAD_USER_LOCATION_BEGIN = 'LOAD_USER_LOCATION_BEGIN';
export const LOAD_USER_LOCATION_SUCCESS = 'LOAD_USER_LOCATION_SUCCESS';
export const LOAD_USER_LOCATION_ERROR = 'LOAD_USER_LOCATION_ERROR';
export const PLAY_MUSIC_BEGIN = 'PLAY_MUSIC_BEGIN';
export const PLAY_MUSIC_SUCCESS = 'PLAY_MUSIC_SUCCESS';
export const PLAY_MUSIC_ERROR = 'PLAY_MUSIC_ERROR';
export const CREATE_AUDIO_PLAYER = 'CREATE_AUDIO_PLAYER';

const queryUserLocation = () => {
  return dispatch => {
    dispatch({ type: LOAD_USER_LOCATION_BEGIN });
    fetchUserLocation()
      .then(resp => {
        if (resp.time_zone && resp.time_zone.name && resp.country_name) {
          const payload = {
            city: resp.time_zone.name.split("/")[1].toUpperCase(),
            country: resp.country_name.toUpperCase()
          };
          localStorage.setItem(
            'currentUser',
            JSON.stringify(payload)
          );
          dispatch({
            type: LOAD_USER_LOCATION_SUCCESS,
            payload: payload
          })
        } else {
          dispatch({
            type: LOAD_USER_LOCATION_ERROR,
            error: "Response doesn't contains necessary keys."
          })
        }
      })
      .catch(error => {
        dispatch({ type: LOAD_USER_LOCATION_ERROR, error });
      });
  };
};

export const loadUserLocation = () => {
  return dispatch => {
    const json = localStorage.getItem('currentUser');
    try {
      const user = JSON.parse(json);
      dispatch({ type: LOAD_USER_LOCATION_SUCCESS, payload: user });
    } catch (e) {
      dispatch(queryUserLocation());
    }
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

export const playNextTrack = () => {
  return (dispatch, getState) => {
    dispatch({ type: PLAY_MUSIC_BEGIN });
    const context = getState().media.audioContext;
    const currentIndex = getState().media.currentTrackIndex;
    const trackSeries = getState().media.trackSeries['uniqlock2'];
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

