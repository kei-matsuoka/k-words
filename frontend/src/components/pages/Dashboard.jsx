import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';

export default function Dashboard() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{currentUser.name}さんのダッシュボード</p>
    </div>
  );
}
