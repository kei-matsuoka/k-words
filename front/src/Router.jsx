import { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './AuthProvider';
import { Top } from './components/pages/Top';
import { CardIndex } from './components/pages/CardIndex';
import { Dashboard } from './components/pages/Dashboard';
import { Learning } from './components/pages/Learning';
import { Settings } from './components/pages/Settings';
import { Valid } from './components/pages/Valid';
import { Password } from './components/pages/Password';
import { MyPage } from './components/pages/MyPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { DefaultPage } from './components/pages/DefaultPage';
import { Policy } from './components/pages/Policy';
import { Privacy } from './components/pages/Privacy';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact';
import { ProfileOutlet } from "./components/outlets/ProfileOutlet";
import { AccountDestroyOutlet } from './components/outlets/AccountDestroyOutlet';
import { TokenResetOutlet } from './components/outlets/TokenResetOutlet';
import { WordsOutlet } from './components/outlets/WordsOutlet';
import { FavoritesOutlet } from './components/outlets/FavoritesOutlet';
import { CommentsOutlet } from './components/outlets/CommentsOutlet';
import { getCurrentUser } from './apis/login';

export const Router = () => {
  const { loading, setLoading, isSignedIn, setIsSignedIn, setCurrentUser, logoutMessage, setLogoutMessage } = useContext(AuthContext);

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.status === 200) {
        setIsSignedIn(true);
        setCurrentUser(res?.user);
      } else {
        console.log(res?.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentUser]);

  const PrivateRoute = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return <DefaultPage>{children}</DefaultPage>;
      } else {
        !logoutMessage.message && setTimeout(() => setLogoutMessage({ color: "red", message: "ログインしてください" }), 500)
        return <Navigate to='/' />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Top />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/cards/:id' element={<PrivateRoute><CardIndex /></PrivateRoute>} />
        <Route path='/cards/:id/learning' element={<PrivateRoute><Learning /></PrivateRoute>} />
        <Route path='/mypage' element={<PrivateRoute><MyPage /></PrivateRoute>} >
          <Route path='' element={<WordsOutlet />} />
          <Route path='words' element={<WordsOutlet />} />
          <Route path='favorites' element={<FavoritesOutlet />} />
          <Route path='comments' element={<CommentsOutlet />} />
        </Route>
        <Route path='/valid/:id/:email' element={<DefaultPage><Valid /></DefaultPage>} />
        <Route path='/password/:id/:email' element={<DefaultPage><Password /></DefaultPage>} />
        <Route path='/settings' element={<PrivateRoute><Settings /></PrivateRoute>} >
          <Route path='' element={<ProfileOutlet />} />
          <Route path='profile' element={<ProfileOutlet />} />
          <Route path='password' element={<TokenResetOutlet />} />
          <Route path='account' element={<AccountDestroyOutlet />} />
        </Route>
        <Route path='/policy' element={<DefaultPage><Policy /></DefaultPage>} />
        <Route path='/privacy' element={<DefaultPage><Privacy /></DefaultPage>} />
        <Route path='/contact' element={<DefaultPage><Contact /></DefaultPage>} />
        <Route path='/about' element={<DefaultPage><About /></DefaultPage>} />
        <Route path="*" element={<DefaultPage><NotFoundPage /></DefaultPage>} />
      </Routes>
    </BrowserRouter>
  );
}
