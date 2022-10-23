import { Link, Outlet } from 'react-router-dom';

export const Settings = () => {
  return (
    <>
      <div className='flex flex-col items-center bg-white pt-4 pb-4 rounded-sm shadow w-full'>
        <Link to='/settings/profile' className='hover:bg-gray-100 p-4 w-full'>プロフィール</Link>
        <Link to='/settings/password' className='hover:bg-gray-100 p-4 w-full'>パスワード</Link>
        <Link to='/settings/password' className='hover:bg-gray-100 p-4 w-full'>アカウント削除</Link>
      </div>
      <div className='flex flex-col items-center bg-white p-4 rounded-sm shadow w-full mt-4'>
        <Outlet />
      </div>
    </>
  );
}
