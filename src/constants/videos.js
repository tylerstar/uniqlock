const videos = {
  "2": 79,
  "3": 69,
  "4": 44,
  "5": 106,
  "6": 104,
};

export const getVideoMaxIndexBySeries = series => {
  return videos[series];
};