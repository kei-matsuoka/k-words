import { Link, Outlet } from 'react-router-dom';
import { Header } from "../groups/Header";

export const Settings = () => {

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center top-color h-screen p-4">
        <div className='flex flex-col items-center bg-white pt-4 pb-4 rounded shadow w-full'>
          <Link to='/settings/profile' className='hover:bg-gray-100 p-4 w-full'>プロフィール</Link>
          <Link to='/settings/password' className='hover:bg-gray-100 p-4 w-full'>パスワード</Link>
        </div>
        <div className='flex flex-col items-center bg-white pt-4 pb-4 rounded shadow w-full mt-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
