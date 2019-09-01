const dayVideos = {
  "2": 79,
  "3": 69,
  "4": 44,
  "5": 106,
  "6": 104,
};

const nightVideos = {
  "2": 39,
  "3": 4,
  "4": 53,
  "5": 48,
};

const midNightVideos = {
  "5": 10,
};

export const getSeriesMaxIndex = (series, time) => {
  switch (time)  {
    case 'day':
      return dayVideos;
    case 'night':
      return nightVideos;
    case 'midnight':
      return midNightVideos;
    default:
      return;
  }
};

// Each series has different postfix
export const getVideoURL = (series, index, time) => {
  const filename = getVideoFilename(series, index, time);

  if (index !== null && index >= 1 ) {
    return "https://uniqlock.s3-ap-northeast-1.amazonaws.com" +
      `/uniqlo_extra/uniqlock${series}/flv/` + filename;
  }
};

const getVideoFilename = (series, index, time) => {
  if (time === 'day') {
    switch (series) {
      case 2:
        return `5sec_${index}.mp4`;
      case 3:
        return `5sec${index}.mp4`;
      case 4:
      case 5:
        return `5sec_uc${series}_${index}.mp4`;
      case 6:
        return `uniqlock6_5sec_${index}.mp4`;
      default:
        return;
    }
  } else if (time === 'night') {
    switch (series) {
      case 2:
        return `5sec_night_${index}.mp4`;
      case 3:
        return `5secN${index}.mp4`;
      case 4:
        return `5sec_uc${series}_N${index}.mp4`;
      case 5:
        return `5sec_uc${series}_N${index}.mp4`;
      default:
        return;
    }
  } else if (time === 'midnight') {
    switch (series) {
      case 5:
        return `5sec_uc${series}_MN${index}.mp4`;
      default:
        return;
    }
  }
};
