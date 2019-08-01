import produce from 'immer';

const initialState = {};

const reducer = produce((draft, action) => {
  switch (action.type) {
    default:
      return;
  }
}, initialState);

export default reducer;

