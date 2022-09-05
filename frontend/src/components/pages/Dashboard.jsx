import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { Link } from 'react-router-dom';
import DashboardHeader from "../groups/DashboardHeader";

export default function Dashboard() {
  const { currentUser, cards } = useContext(AuthContext);

  return (
    <div>
      <DashboardHeader />
      <div className="flex flex-col items-center top-color h-96">
        <div className='m-8 text-color'>
          {currentUser.name}
        </div>
        <div className='flex flex-wrap'>
          {cards.map((card) =>
            <Link to="#">
              <div key={card.id} className='flex flex-col items-center w-60 p-6 m-2 rounded-md border hover:bg-gray-100 bg-white'>
                <div>{card.title}</div>
                <div className='mt-3 text-sm'>{card.text}</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
