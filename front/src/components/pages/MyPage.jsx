import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export const MyPage = ({ handleFlashMessage, setTitle }) => {
  const [index, setIndex] = useState(0);
  const location = useLocation();
  const tab_list = [
    { url: '/mypage/words', title: "マイ用語" },
    { url: '/mypage/favorites', title: "お気に入り" },
    { url: '/mypage/comments', title: "コメント" }
  ];

  const handleLocation = () => {
    if (location.pathname === '/mypage') {
      setIndex(0);
    } else {
      const tab_index = tab_list.findIndex((tab) => { return tab.url === location.pathname });
      setIndex(tab_index);
    }
  };

  const handleOnClick = (i) => {
    setIndex(i);
  };

  useEffect(() => {
    setTitle("マイページ");
    handleLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTitle]);

  return (
    <>
      <div className='flex w-full h-12 rounded-t bg-gray-50 text-sm'>
        {tab_list.map((tab) =>
          <Link
            to={tab.url}
            key={tab_list.indexOf(tab)}
            onClick={() => handleOnClick(tab_list.indexOf(tab))}
            className={`flex justify-center items-center w-1/3 h-12 rounded-t border-t border-r duration-200 hover:bg-gray-100 ${tab_list.indexOf(tab) === 0 && "border-l"} ${tab_list.indexOf(tab) === index && "bg-gray-800 text-white border-none hover:bg-gray-800 "}`}
          >{tab.title}</Link>
        )}
      </div>
      <div className="w-full bg-gray-800 rounded-b shadow-sm px-4 pb-4 pt-1">
        <Outlet context={[handleFlashMessage]} />
      </div>
    </>
  );
}
