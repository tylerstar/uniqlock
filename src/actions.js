import {
  fetchVideo
} from './api';

export const FETCH_VIDEO_BEGIN = 'FETCH_VIDEO_BEGIN';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_ERROR = 'FETCH_VIDEO_ERROR';

export const ftechVideo = () => {
  return dispatch => {
    dispatch({ type: FETCH_VIDEO_BEGIN });
    fetchVideo()
      .then(video => {
        dispatch({
          type: FETCH_VIDEO_SUCCESS,
          payload: video
        });
      })
      .catch(error => {
        dispatch({ type: FETCH_VIDEO_ERROR, error });
      });
  };
};