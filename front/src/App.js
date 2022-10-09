import { AuthProvider } from './AuthProvider';
import { Router } from './Router';
import './index.css';

export const App = () => {  
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}
