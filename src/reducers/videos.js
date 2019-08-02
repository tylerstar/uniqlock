import produce from 'immer';
import {FETCH_VIDEO_BEGIN, FETCH_VIDEO_ERROR, FETCH_VIDEO_SUCCESS} from "../actions";

const initialState = {};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_VIDEO_BEGIN:
      return;
    case FETCH_VIDEO_SUCCESS:
      return;
    case FETCH_VIDEO_ERROR:
      return;
    default:
      return;
  }
}, initialState);

export default reducer;

