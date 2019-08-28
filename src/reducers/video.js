import produce from 'immer';
import {
  PLAY_VIDEO
} from '../actions/video';

const initialState = {
  isLoading: false,
  currentIndex: 0,
  currentSeries: 'uniqlock2',
  error: null,
  videos: {
    'uniqlock2': [...Array(80).keys()]
  },
  videoURLs: {}
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    case PLAY_VIDEO:
      draft.currentIndex += 1;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;