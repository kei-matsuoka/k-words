import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { getCardWords } from '../../apis/cards';
import { getNewWords } from '../../helper';
import { LearningWord } from '../groups/LeaningWord';
import { LearningBar } from '../groups/LearningBar';
import { flash_red } from '../../constants';

export const Learning = ({ handleFlashMessage, setTitle }) => {
  const [state, setState] = useState({ card: {}, words: [], length: 0 });
  const [[word_id, direction], setWordId] = useState([0, 1]);
  const { setLoading } = useContext(AuthContext);
  const { id } = useParams();
  const variants = {
    enter: (direction) => { return { x: direction > 0 ? 0 : -2000 } },
    center: { x: 0 },
    exit: (direction) => { return { x: direction > 0 ? -2000 : 0 } }
  };

  const handleGetCardWords = async () => {
    try {
      const res = await getCardWords(id);
      if (res?.status === 200) {
        const new_words = getNewWords(res.words);
        setState({ card: res.card, words: new_words, length: new_words.length });
      } else {
        console.log(res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage(flash_red, e.message);
    }
    setLoading(false);
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
    handleGetCardWords();
    setTitle("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {state.words[0] ?
        <>
          <LearningBar url={`/cards/${id}`} title={state.card.title} />
          <div className='fixed w-full h-[450px] bg-gray-50 -z-20 -m-4 border-b'></div>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={state.words[word_id].id}
              variants={variants}
              initial="enter"
              custom={direction}
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.4 }}
              className='relative top-4'
            >
              <LearningWord
                word_id={word_id}
                state={state}
                handleOnClick={handleOnClick}
              />
            </motion.div>
          </AnimatePresence>
        </>
        : null}
    </>
  );
}
