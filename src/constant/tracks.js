import _ from 'lodash';

const sounds = {
  "2": _.range(0, 5),
  "3": _.range(0, 8),
  "4": _.range(0, 8),
  "5": _.range(0, 11),
  "6": _.range(0, 14)
};

export const getSoundSeries = series => {
  return sounds[series];
};