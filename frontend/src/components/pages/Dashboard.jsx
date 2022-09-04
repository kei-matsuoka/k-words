import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';

export default function Dashboard() {
  const { currentUser, cards } = useContext(AuthContext);

  return (
    <div>
      <p>{currentUser.name}</p>
      <ul className='flex items-center'>
        {cards.map((card) =>
          <li key={card.id} className='flex flex-col items-center w-80 p-6 m-4 rounded-md border bg-white'>
            <p>{card.title}</p>
            <p>{card.text}</p>
          </li>
        )}
      </ul>
    </div>
  );
}
