import {Navigate, Outlet} from 'react-router-dom';
import Spinner from './Spinner.jsx';
import {useAuthStatus} from '../hooks/useAuthStatus';

function PrivateRoute() {
  const {loggedIn, loading} = useAuthStatus();

  if(loading) {
    return <><Spinner></Spinner></>
  }

  return loggedIn ? <Outlet></Outlet> : <Navigate to="/sign-in"></Navigate>
}
export default PrivateRoute