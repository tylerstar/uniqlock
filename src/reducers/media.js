import produce from 'immer';
import {
  CREATE_AUDIO_PLAYER,
  PLAY_MUSIC_BEGIN,
  PLAY_MUSIC_SUCCESS,
  PLAY_MUSIC_ERROR,
  PICK_RANDOM_SERIES,
  PICK_RANDOM_COLOUR,
  PICK_RANDOM_SOUND_INDEX
} from '../actions/media';

const initialState = {
  audioContext: null,
  currentSeries: null,
  currentSoundIndex: -1,
  error: null
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
      draft.currentSoundIndex = action.payload.index;
      return;
    case PLAY_MUSIC_ERROR:
      draft.error = action.error;
      return;
    case PICK_RANDOM_SERIES:
      draft.currentSeries = action.payload.series;
      return;
    case PICK_RANDOM_COLOUR:
      draft.currentColour = action.payload.colour;
      return;
    case PICK_RANDOM_SOUND_INDEX:
      draft.currentSoundIndex = action.payload.soundIndex;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;