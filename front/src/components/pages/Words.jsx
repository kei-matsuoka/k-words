import { useContext, useEffect, useReducer } from 'react';
import { AuthContext } from '../../AuthProvider';
import { initialState, wordsActionTypes, wordsReducer } from '../../reducers/words'
import { Link, useParams } from 'react-router-dom';
import { getWords } from '../../apis/words';
import { Header } from "../groups/Header";
import { LearningButton } from '../buttons/LearningButton';
import { getNewWords } from '../../helper';

export const Words = () => {
  const { cards } = useContext(AuthContext);
  const [state, dispatch] = useReducer(wordsReducer, initialState);
  const { id } = useParams();
  const card = cards[id - 1].title;

  useEffect(() => {
    dispatch({ type: wordsActionTypes.FETCHING });
    getWords(id)
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
      <Header />
      <div className="flex flex-col items-center top-color h-96">
        <div className='mt-6 text-color'>
          カード名: {card}<br />
          id: {id}
        </div>
        <div className='m-6'>
          <Link to={`/cards/${id}/learning`}><LearningButton text="暗記する" /></Link>
        </div>
        <div className='flex flex-col'>
          {state.wordsList.map((word) =>
            <div key={word.id} className='flex flex-col items-center w-60 p-6 m-2 rounded-md border bg-white'>
              <div className="">{word.title}</div>
              <div className='text-sm'>{word.text}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
