import _ from 'lodash';

const videos = {
  "2": _.range(1, 80),
  "3": _.range(1, 70),
  "4": _.range(1, 45),
  "5": _.range(1, 100),
  "6": _.range(1, 100)
};

export const getVideoSeries = series => {
  return videos[series];
};