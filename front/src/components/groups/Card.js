import { Link } from 'react-router-dom';
export const Card = ({ card }) => {
  return (
    <Link key={card.id} to={`/cards/${card.id}`}>
      <div className='flex flex-col w-full px-8 py-6 mb-3 bg-white relative shadow rounded-sm'>
        <div>{card.title}</div>
        <div className='mt-1 text-sm'>{card.text}</div>
      </div>
    </Link>
  );
}
