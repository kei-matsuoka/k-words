import { useEffect, useReducer } from 'react';
import { initialState, wordsActionTypes, wordsReducer } from '../../reducers/words'
import { Link, useParams } from 'react-router-dom';
import { getCardWords } from '../../apis/cards';
import { LearningButton } from '../buttons/LearningButton';
import { getNewWords } from '../../helper';
import { Words } from '../groups/Words';

export const CardIndex = () => {
  const [state, dispatch] = useReducer(wordsReducer, initialState);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: wordsActionTypes.FETCHING });
    getCardWords(id)
      .then((data) => {
        const new_words = getNewWords(data.words);
        dispatch({
          type: wordsActionTypes.FETCH_SUCCESS,
          payload: {
            card: data.card,
            words: data.words
          }
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      { state.wordsList[0] &&
      <>
        <div className='mt-6 text-gray-800'>
          {state.card.title}
        </div>
        <div className='m-6'>
          <Link to={`/cards/${id}/learning`}><LearningButton text="暗記する" /></Link>
        </div>
        <Words words={state.wordsList} />
      </>
      }
    </>
  );
}
