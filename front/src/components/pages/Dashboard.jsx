import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthProvider';
import { getCards } from '../../apis/cards';
import { Cards } from '../groups/Cards';

export const Dashboard = () => {
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
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCards]);

  return (
    <div className="pt-[12px]">
      {cards ? <Cards cards={cards} /> : null}
    </div>
  );
}
