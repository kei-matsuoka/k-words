import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCardWords } from '../../apis/cards';
import { Words } from '../groups/Words';
import { LearningBar } from '../groups/LearningBar';
import { Skeltons } from '../groups/Skeltons';

export const CardIndex = ({ handleFlashMessage, setTitle }) => {
  const [state, setState] = useState({ card: {}, words: [], length: 0 });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleGetCardWords = async () => {
    try {
      setLoading(true);
      const res = await getCardWords(id);
      if (res?.status === 200) {
        setState({ card: res.card, words: res.words, length: res.words.length });
      } else {
        console.log(res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage("red", e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCardWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {state.words &&
        <>
          <LearningBar url={`/dashboard`} title={state.card.title} />
          <div className='flex justify-center mb-1'>
            <Link to={`/cards/${id}/learning`}>
              <button className="button-learn">暗記する</button>
            </Link>
          </div>
          {loading ? <Skeltons /> :
            <Words words={state.words} />
          }
        </>
      }
    </>
  );
}
