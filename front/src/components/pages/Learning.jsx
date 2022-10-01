import { useEffect, useContext, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { AuthContext } from '../../AuthProvider';
import { initialState, wordsActionTypes, wordsReducer } from '../../reducers/words'
import { fetchWords } from '../../apis/words';
import { getNewWords } from '../../helper';
import { Header } from "../groups/Header";

export const Learning = () => {
  const { cards } = useContext(AuthContext);
  const [state, dispatch] = useReducer(wordsReducer, initialState)
  const [[word_id, direction], setWordId] = useState([0, 1]);
  const { id } = useParams();
  const card = cards[id - 1].title;

  const handleOnClick = (newDirection) => {
    if (newDirection > 0) {
      if (state.wordsList.length - 1 > word_id) {
        setWordId([word_id + newDirection, newDirection]);
      } else if (state.wordsList.length - 1 === word_id) {
        setWordId([0, 1]);
      }
    } else {
      if (word_id === 0) {
        setWordId([state.wordsList.length - 1, 1]);
      } else {
        setWordId([word_id + newDirection, newDirection]);
      }
    }
  };

  const variants = {
    enter: (direction) => { return { x: direction > 0 ? 0 : -2000 } },
    center: { x: 0 },
    exit: (direction) => { return { x: direction > 0 ? -2000 : 0 } }
  };

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
      <Header />
      <div className="flex flex-col items-center top-color">
        <div className='mt-6 text-color'>
          カード名: {card}<br />
          カードid: {id}
        </div>
        <div className='mt-4 w-full'>
          {state.wordsList[0] ?
            <AnimatePresence initial={false} custom={direction}>
              <motion.div key={state.wordsList[word_id].id} variants={variants} initial="enter" custom={direction}
                animate="center" exit="exit" transition={{ type: "tween", duration: 0.4 }} className="relative">
                <div className="absolute right-0 w-1/2 h-96" onClick={() => handleOnClick(1)}></div>
                <div className="absolute w-1/2 h-96" onClick={() => handleOnClick(-1)}></div>
                <div className="flex justify-center items-center absolute -z-10 w-full h-96 shadow text-6xl bg-white">
                  {state.wordsList[word_id].title}
                </div>
              </motion.div>
            </AnimatePresence>
            : null}
        </div>
      </div>
    </div>
  );
}
