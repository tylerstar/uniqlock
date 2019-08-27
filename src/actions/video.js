import { fetchVideo } from "../api";

export const UPDATE_PLAYING_VIDEO = '';
export const PLAY_VIDEO_SUCCESS = 'PLAY_VIDEO_SUCCESS';
export const PLAY_VIDEO_ERROR = 'PLAY_VIDEO_ERROR';

export const getNextVideoURL = () => {
  return (dispatch, getState) => {
    const videoState = getState().video;
    const currentVideoIndex = videoState.currentIndex;
    const currentVideoSeries = videoState.currentSeries;
    const videos = videoState.videos;

    let nextVideoIndex = null;
    let nextVideoSeries = null;

    if (currentVideoIndex + 1 === videos.length) {
      nextVideoSeries = currentVideoSeries;
      nextVideoIndex = 0;
    } else {
      nextVideoSeries = currentVideoSeries;
      nextVideoIndex = currentVideoIndex + 1;
    }

    return "https://uniqlock.s3-ap-northeast-1.amazonaws.com" +
      `/uniqlo_extra/${nextVideoSeries}/flv/5sec_${nextVideoIndex}.mp4`;
  };
};