import { useEffect, useContext, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { initialState, wordsActionTypes, wordsReducer } from '../../reducers/words'
import { fetchWords } from '../../apis/words';
import { getNewWords } from '../../helper';
import DashboardHeader from "../groups/DashboardHeader";
import { Word } from '../groups/Word';

export const Learning = () => {
  const { cards } = useContext(AuthContext);
  const [state, dispatch] = useReducer(wordsReducer, initialState)
  const [word_id, setWordId] = useState(0);
  const { id } = useParams();
  const card = cards[id - 1].title;

  const handleRightClick = () => {
    if (state.wordsList.length - 1 > word_id) {
      setWordId(word_id + 1);
    } else if (state.wordsList.length - 1 === word_id) {
      setWordId(0);
    }
  }

  const handleLeftClick = () => {
    if (word_id === 0) {
      setWordId(state.wordsList.length - 1);
    } else {
      setWordId(word_id - 1);
    }
  }

  useEffect(() => {
    dispatch({ type: wordsActionTypes.FETCHING });
    fetchWords(id)
      .then((data) => {
        const new_words = getNewWords(data);
        dispatch({
          type: wordsActionTypes.FETCH_SUCCESS,
          payload: {
            words: new_words
          }
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="flex flex-col items-center top-color h-96">
        <div className='mt-6 text-color'>
          カード名: {card}<br />
          カードid: {id}
        </div>
        <div className='mt-4 w-full'>
          {state.wordsList[0] ?
            <Word word={state.wordsList[word_id]}
              onClick={{ handleRightClick: handleRightClick, handleLeftClick: handleLeftClick }} />
            : null}
        </div>
      </div>
    </div>
  );
}
