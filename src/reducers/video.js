import produce from 'immer';
import {
  FETCH_VIDEO_BEGIN,
  FETCH_VIDEO_SUCCESS,
  FETCH_VIDEO_ERROR,
  PLAY_VIDEO_BEGIN,
  PLAY_VIDEO_SUCCESS,
  PLAY_VIDEO_ERROR
} from '../actions/video';

const initialState = {
  currentIndex: null,
  currentSeries: null,
  error: null,
  videos: {
    'uniqlock2': [...Array(80).keys()]
  }
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    default:
      return;
  }
}, initialState);

export default reducer;