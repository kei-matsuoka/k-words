import { AuthProvider } from './AuthProvider';
import Router from './Router';

export default function App() {  
  // const handleLogin = (user_data) => {
  //   setLoggedInStatus("ログインなう")
  //   setUser(user_data.user)
  // }

  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}

// '/'にアクセスがあった場合
// ブラウザのsession_idがredisにもあれば、'/dashboard'にリダイレクト

// '/dashboard'（認証必須ページ）にアクセスがあった場合
// ブラウザのsession_idがredisになければ、'/'にリダイレクト

// Signup、Loginが成功した場合
// ブラウザとredisにsesion_idを保存し、'/dashboard'にリダイレクト
