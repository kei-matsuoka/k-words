import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthProvider';
import { getCards } from '../../apis/cards';
import { Cards } from '../groups/Cards';

export const Dashboard = ({setTitle}) => {
  const { setLoading } = useContext(AuthContext);
  const [cards, setCards] = useState();
  const handleGetCards = async () => {
    try {
      const res = await getCards();
      if (res?.status === 200) {
        setCards(res?.cards);
      } else {
        console.log('no words');
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCards();
    setTitle("単語カード一覧");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCards]);

  return (
    <>
      <div className='flex w-full h-12 rounded-t bg-gray-50'>
        <button className='flex justify-center items-center w-1/2 h-12 bg-gray-800 text-white rounded-t'>
          おすすめ
        </button>
        <button className='flex justify-center items-center w-1/2 h-12 bg-white border-t border-r rounded-t'>
          マイカード（未実装）
        </button>
      </div>
      <div className="w-full bg-gray-800 rounded-b shadow-sm px-4 pb-4">
        {cards && <Cards cards={cards} />}
      </div>
    </>
  );
}
