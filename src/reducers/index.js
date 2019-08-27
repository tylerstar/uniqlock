import { combineReducers } from "redux";
import user from './user';
import sound from './sound';
import video from './video';

export default combineReducers({
  user,
  sound,
  video
});