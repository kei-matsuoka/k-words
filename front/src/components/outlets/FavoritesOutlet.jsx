import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { useOutletContext } from "react-router-dom";
import { getUserFavorites } from '../../apis/favorites';
import { Words } from "../groups/Words";
import { Skeltons } from "../groups/Skeltons";

export const FavoritesOutlet = () => {
  const [userFavorites, setUserFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [handleFlashMessage] = useOutletContext();

  const handleGetUserFavorites = async () => {
    try {
      setLoading(true);
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
  }, []);

  return (
    <>
      {loading ? <Skeltons /> : userFavorites[0] ?
        <Words words={userFavorites} handleWords={handleGetUserFavorites} handleFlashMessage={handleFlashMessage} />
        :
        <p className="text-sm mt-3 p-4 bg-white rounded-sm">お気に入りの用語がありません。</p>
      }
    </>
  );
}
