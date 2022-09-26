import { Link } from 'react-router-dom';
import { Dropdown } from './Dropdown';
import dashboard_icon from '../../dashboard_icon.png'

export default function DashboardHeader() {
  return (
    <>
      <nav className='flex items-center justify-between sticky top-0 left-0 z-10 bg-white shadow'>
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
