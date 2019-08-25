import {
  fetchUserLocation,
} from './api';

export const LOAD_USER_LOCATION_BEGIN = 'LOAD_USER_LOCATION_BEGIN';
export const LOAD_USER_LOCATION_SUCCESS = 'LOAD_USER_LOCATION_SUCCESS';
export const LOAD_USER_LOCATION_ERROR = 'LOAD_USER_LOCATION_ERROR';

const queryUserLocation = () => {
  return dispatch => {
    dispatch({ type: LOAD_USER_LOCATION_BEGIN });
    fetchUserLocation()
      .then(resp => {
        if (resp.time_zone && resp.time_zone.name && resp.country_name) {
          const payload = {
            city: resp.time_zone.name.split("/")[1].toUpperCase(),
            country: resp.country_name.toUpperCase()
          };
          localStorage.setItem(
            'currentUser',
            JSON.stringify(payload)
          );
          dispatch({
            type: LOAD_USER_LOCATION_SUCCESS,
            payload: payload
          })
        } else {
          dispatch({
            type: LOAD_USER_LOCATION_ERROR,
            payload: {
              error: "Response doesn't contains necessary keys."
            }
          })
        }
      })
      .catch(error => {
        dispatch({ type: LOAD_USER_LOCATION_ERROR, error });
      });
  };
};

export const loadUserLocation = () => {
  return dispatch => {
    const json = localStorage.getItem('currentUser');
    try {
      const user = JSON.parse(json);
      dispatch({ type: LOAD_USER_LOCATION_SUCCESS, payload: user });
    } catch (e) {
      dispatch(queryUserLocation());
    }
  };
};

