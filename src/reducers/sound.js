import produce from 'immer';
import {
  CREATE_AUDIO_PLAYER,
  PLAY_MUSIC_BEGIN,
  PLAY_MUSIC_SUCCESS,
  PLAY_MUSIC_ERROR,
} from '../actions/sound';

const initialState = {
  audioContext: null,
  currentSeries: null,
  currentIndex: -1,
  error: null,
  sounds: {
    'uniqlock2': [0, 1, 2, 3, 4]
  }
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    case CREATE_AUDIO_PLAYER:
      draft.audioContext = action.payload.audioContext;
      return;
    case PLAY_MUSIC_BEGIN:
      draft.error = null;
      return;
    case PLAY_MUSIC_SUCCESS:
      draft.currentIndex = action.payload.index;
      draft.currentSeries = action.payload.series;
      return;
    case PLAY_MUSIC_ERROR:
      draft.error = action.error;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;