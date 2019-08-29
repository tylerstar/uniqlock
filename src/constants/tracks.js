const soundsMaxIndex = {
  "2": 4,
  "3": 7,
  "4": 7,
  "5": 10,
  "6": 13,
};

export const getSoundMaxIndexBySeries = series => {
  return soundsMaxIndex[series];
};