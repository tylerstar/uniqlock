export const fetchUserLocation = () => {
  return fetchWithData("https://api.ipdata.co?api-key=" +
    "fb9dfde35d54ee96cbb2abfa8a573182071cf91c14bc89dc7248a6c5");
};

export const fetchSound = (soundSeries, soundIndex) => {
  // https://uniqlock.s3-ap-northeast-1.amazonaws.com/uniqlo_extra/uniqlock2/sound/sound${index}.mp3
  return fetch("https://uniqlock.s3-ap-northeast-1.amazonaws.com" +
    `/uniqlo_extra/${soundSeries}/sound/sound${soundIndex}.mp3`, {
    method: 'GET'
  });
};

const fetchWithData = (
  url = '',
  method = 'GET',
  json = true
) => {
  return fetch(url, { method })
    .then(handleErrors)
    .then(response => {
      if (json) {
        return response.json();
      } else {
        return response;
      }
    });
};

const handleErrors = response => {
  if (!response.ok) {
    return response.json().then(body => {
      throw new Error(body.message);
    });
  } else {
    return response;
  }
};