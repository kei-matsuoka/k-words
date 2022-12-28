import { Link } from "react-router-dom";

export const SideBarLink = ({ handleOnClick, url, children, title }) => {
  return (
    <Link to={url} className='pt-4 pb-4 hover:bg-gray-100 duration-200' onClick={handleOnClick}>
      <div className="flex flex-col items-center text-gray-800">{children}</div>
      <div className="text-[11px]">{title}</div>
    </Link>
  );
}
