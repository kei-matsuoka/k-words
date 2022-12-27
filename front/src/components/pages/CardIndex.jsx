import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { Link, useParams } from 'react-router-dom';
import { getCardWords } from '../../apis/cards';
import { LearningButton } from '../buttons/LearningButton';
import { Words } from '../groups/Words';
import { LearningBar } from '../groups/LearningBar';

export const CardIndex = ({handleFlashMessage, setTitle}) => {
  const [state, setState] = useState({card: {}, words: [], length: 0});
  const { setLoading } = useContext(AuthContext);
  const { id } = useParams();

  const handleGetCardWords = async () => {
    try {
      const res = await getCardWords(id);
      if (res?.status === 200) {
        setState({card: res.card, words: res.words, length: res.words.length});
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
      { state.words &&
      <>
        <LearningBar url={`/dashboard`} title={state.card.title} />
        <div className='flex justify-center mb-1'>
          <Link to={`/cards/${id}/learning`}><LearningButton text="暗記する" /></Link>
        </div>
        <Words words={state.words} />
      </>
      }
    </>
  );
}
