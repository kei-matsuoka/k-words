import { Link } from 'react-router-dom';

export const HeaderLogo = ({ resetWords }) => {
  return (
    <Link
      to="/"
      onClick={resetWords}
    >
      <div className='flex items-center ml-0.5'>
        <p className='text-lg font-bold text-gray-800 min-w-[134px]'>霞が関用語辞典</p>
      </div>
    </Link>
  );
}
