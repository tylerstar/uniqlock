import produce from 'immer';
import {
  LOAD_USER_LOCATION_BEGIN,
  LOAD_USER_LOCATION_SUCCESS,
  LOAD_USER_LOCATION_ERROR
} from '../actions/actions';

const initialState = {
  country: 'JAPAN',
  city: 'TOKYO',
  loading: false,
  error: null
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    case LOAD_USER_LOCATION_BEGIN:
      draft.loading = true;
      draft.error = null;
      return;
    case LOAD_USER_LOCATION_SUCCESS:
      draft.city = action.payload.city;
      draft.country = action.payload.country;
      draft.loading = false;
      return;
    case LOAD_USER_LOCATION_ERROR:
      draft.error = action.error;
      draft.loading = false;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;