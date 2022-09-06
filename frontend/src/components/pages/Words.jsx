import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider';
import { Link, useParams } from 'react-router-dom';
import DashboardHeader from "../groups/DashboardHeader";
import { getWords } from '../../apis/getWords';

export const Words = () => {
  const { id } = useParams();
  const { setLoading, cards } = useContext(AuthContext);
  const [words, setWords] = useState([]);
  const card = cards[id - 1].title;

  const handleGetWords = async () => {
    try {
      const res = await getWords(id);
      if (res?.data.status === 200) {
        setWords(res?.data.words);
      } else {
        console.log('no words');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="flex flex-col items-center top-color h-96">
        <div className='m-8 text-color'>
          カード名: {card}<br/>
          id: {id}
        </div>
        { words ?
        <div className='flex flex-wrap'>
          {words.map((word) =>
            <Link key={word.id} to="#">
              <div className='flex flex-col items-center w-60 p-6 m-2 rounded-md border hover:bg-gray-100 bg-white'>
                <div className='text-sm'>{word.question}</div>
                <div className='mt-3 text-sm'>{word.answer}</div>
                <div className='mt-3 text-sm'>{word.text}</div>
              </div>
            </Link>
          )}
        </div>
        :
        <></> }
      </div>
    </div>
  );
}
