export const fetchUserLocation = () => {
  return fetchWithData("https://api.ipdata.co?api-key=fb9dfde35d54ee96cbb2abfa8a573182071cf91c14bc89dc7248a6c5");
};

export const fetchSoundList = () => {
  return fetchWithData();
};

export const fetchSound = () => {
  return fetchWithData();
};

const fetchWithData = (
  url = '',
  method = 'GET',
) => {
  return fetch(url, {
    method,
  })
    .then(handleErrors)
    .then(response => response.json());
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