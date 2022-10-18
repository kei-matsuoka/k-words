import { Link } from 'react-router-dom';
import { FiBook } from 'react-icons/fi';

export const HeaderLogo = ({ resetWords }) => {
  return (
    <Link
      to="/"
      className='flex items-center'
      onClick={resetWords}>
      <FiBook />
      <p className='text-lg font-bold text-gray-800 min-w-[126px]'>霞が関用語辞典</p>
    </Link>
  );
}
