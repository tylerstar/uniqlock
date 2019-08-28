import { createSelector } from 'reselect';

const getCurrentVideoIndex = state => state.video.currentIndex + 1;
const getCurrentVideoSeries = state => state.video.currentSeries;
const getVideoURLs = state => state.video.videoURLs;

export const getCurrentVideoURL = createSelector(
  getCurrentVideoIndex,
  getCurrentVideoSeries,
  getVideoURLs,
  (index, series, videoURLs) => {
    console.log(videoURLs, series, index);
    if (series in videoURLs && index in videoURLs[series]) {
      console.log("hit");
      return videoURLs[series][index];
    }
  }
);