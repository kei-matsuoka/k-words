import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  wordsList: []
};

export const wordsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const wordsReducer = (state, action) => {
  switch (action.type) {
    case wordsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING
      };
    case wordsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        card: action.payload.card,
        wordsList: action.payload.words,
        length: action.payload.length
      };
    default:
      throw new Error();
  }
}
