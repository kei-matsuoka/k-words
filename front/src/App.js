import { AuthProvider } from './AuthProvider';
import Router from './Router';
import './index.css';

export default function App() {  
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}
