import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { useOutletContext } from "react-router-dom";
import { getUserFavorites } from '../../apis/favorites';
import { Words } from "../groups/Words";

export const FavoritesOutlet = () => {
  const [userFavorites, setUserFavorites] = useState([]);
  const { setLoading, currentUser } = useContext(AuthContext);
  const [handleFlashMessage] = useOutletContext();

  const handleGetUserFavorites = async () => {
    try {
      const res = await getUserFavorites(currentUser.id);
      if (res?.status === 200) {
        setUserFavorites(res.words);
      } else {
        console.log(res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage("red", e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetUserFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserFavorites]);

  return (
    <>
      {userFavorites[0] ?
        <Words words={userFavorites} />
        :
        <p className="text-white text-sm mt-3">お気に入りの用語がありません。</p>
      }
    </>
  );
}
