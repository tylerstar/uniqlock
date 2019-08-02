const PREFIX = './api';

// TODO!!! fetch Video requires parameters to locale the video
export const fetchVideo = () => {

};

const fetchWithData = (
  url = '',
  data = {},
  method = 'POST'
) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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