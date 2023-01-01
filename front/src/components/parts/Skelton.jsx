import { useLocation } from "react-router-dom";

export const Skelton = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className='flex flex-col w-full px-8 pt-6 pb-5 mt-3 bg-white relative shadow rounded-sm animate-pulse'>
      {(path === '/mypage' || path === '/mypage/words') &&
        <div className='flex absolute top-4 right-6'>
          <div className="bg-gray-200 rounded-full h-4 w-4 mr-1"></div>
          <div className="bg-gray-200 rounded-full h-4 w-4"></div>
        </div>
      }

      <div className="bg-gray-200 rounded-full h-5 w-32 mb-2.5"></div>
      <div className="bg-gray-200 rounded-full h-4"></div>
      <div className="bg-gray-200 rounded-full h-4 mt-1.5"></div>

      {(path === '/' || path.indexOf("mypage") !== -1) &&
        <div className="flex justify-between mt-3.5">
          <div className="bg-gray-200 rounded-full h-3.5 w-24"></div>
          <div className="flex">
            <div className="bg-gray-200 rounded-full h-3.5 w-7 mr-3"></div>
            <div className="bg-gray-200 rounded-full h-3.5 w-7"></div>
          </div>
        </div>
      }
    </div>
  );
}
