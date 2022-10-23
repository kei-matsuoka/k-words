import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { initialState, wordsActionTypes, wordsReducer } from '../../reducers/words'
import { getCardWords } from '../../apis/cards';
import { getNewWords } from '../../helper';
import { LearningWord } from '../groups/LeaningWord';
import { LearningBar } from '../groups/LearningBar';

export const Learning = () => {
  const [state, dispatch] = useReducer(wordsReducer, initialState)
  const [[word_id, direction], setWordId] = useState([0, 1]);
  const { id } = useParams();
  const variants = {
    enter: (direction) => { return { x: direction > 0 ? 0 : -2000 } },
    center: { x: 0 },
    exit: (direction) => { return { x: direction > 0 ? -2000 : 0 } }
  };
  
  const handleOnClick = (newDirection) => {
    if (newDirection > 0) {
      if (state.length - 1 > word_id) {
        setWordId([word_id + newDirection, newDirection]);
      } else if (state.length - 1 === word_id) {
        setWordId([0, 1]);
      }
    } else {
      if (word_id !== 0) {
        setWordId([word_id + newDirection, newDirection]);
      } else {
        setWordId([state.length - 1, -1]);
      }
    }
  };

  useEffect(() => {
    dispatch({ type: wordsActionTypes.FETCHING });
    getCardWords(id)
      .then((data) => {
        const new_words = getNewWords(data.words);
        dispatch({
          type: wordsActionTypes.FETCH_SUCCESS,
          payload: {
            card: data.card,
            words: new_words,
            length: new_words.length
          }
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {state.wordsList[0] ?
      <div className='h-full w-full'>
        <LearningBar id={id} title={state.card.title}/>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={state.wordsList[word_id].id}
            variants={variants}
            initial="enter"
            custom={direction}
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.4 }}
            className='top-[40px] sp:left-0 relative'>
            <LearningWord
              title={state.wordsList[word_id].title}
              handleOnClick={handleOnClick} />
          </motion.div>
        </AnimatePresence>
        </div>
        : null}
    </>
  );
}
