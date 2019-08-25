import { combineReducers } from "redux";
import user from './user';
import media from './media'

export default combineReducers({
  user,
  media
});