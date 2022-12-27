import { Link } from 'react-router-dom';

export const Card = ({ card }) => {
  return (
    <div className='mt-4'>
      <Link key={card.id} to={`/cards/${card.id}`}>
        <div className='flex items-center w-full pl-6 pr-8 py-6 bg-white shadow rounded-sm duration-200 hover:translate-x-1'>
          <div className='text-gray-800 text-lg mr-5'>●</div>
          <div className='flex flex-col'>
            <div>{card.title}</div>
            <div className='mt-1 text-sm'>{card.text}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
