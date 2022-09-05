import { Link } from 'react-router-dom';
import dashboard_icon from '../../dashboard_icon.png'
import { Dropdown } from './Dropdown';

export default function DashboardHeader() {
  return (
    <>
      <nav className='flex items-center justify-between sticky top-0 z-10 shadow'>
        <div>
          <Link to="/dashboard">
            <img className="h-12" src={dashboard_icon} alt="アイコン" />
          </Link>
        </div>
        <div>
          <Dropdown />
        </div>
      </nav>
    </>
  );
}
