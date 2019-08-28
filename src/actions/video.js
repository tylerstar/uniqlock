import { fetchVideo } from "../api";

export const PLAY_VIDEO = 'PLAY_VIDEO';

export const playVideo = () => {
  return dispatch => {
    dispatch({ type: PLAY_VIDEO });
  };
};