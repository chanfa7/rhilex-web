import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_PATH } from '@/utils/constant';

const AuthGuard: React.FC = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
