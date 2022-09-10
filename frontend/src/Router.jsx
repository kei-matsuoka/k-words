import { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './AuthProvider';
import { getCurrentUser } from './apis/login';
import Top from './components/pages/Top';
import Dashboard from './components/pages/Dashboard';
import { Words } from './components/pages/Words';
import { Learning } from './components/pages/Learning';

export default function Router() {
  const { loading, setLoading, isSignedIn, setIsSignedIn, setCurrentUser, setCards } = useContext(AuthContext);

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data.logged_in === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.user);
        setCards(res?.data.cards);
      } else {
        console.log('no current user');
      }
    } catch (err) {
      console.log(err);
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
        return children;
      } else {
        return <Navigate to='/' />;
      }
    } else {
      return <></>;
    }
  };

  const LoggedInRoute = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return <Navigate to='/dashboard' />;
      } else {
        return children;
      }
    } else {
      return <></>;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoggedInRoute><Top /></LoggedInRoute>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/cards/:id' element={<PrivateRoute><Words /></PrivateRoute>} />
        <Route path='/cards/:id/learning' element={<PrivateRoute><Learning /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
