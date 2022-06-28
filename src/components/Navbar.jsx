import {useNavigate, useLocation} from 'react-router-dom';
import {GiMuscleUp} from 'react-icons/gi'
import {BsPersonLinesFill} from 'react-icons/bs';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if(route === location.pathname) {
      return true
    }
  }
  return (
    <footer className='navbar'>
      <nav className="navbar-nav">
        <ul className="navbar-list-items">
          <li className="navbar-item" onClick={() => navigate('/')}>
            <GiMuscleUp fill={pathMatchRoute('/') ? 'var(--main-theme-color)' : 'var(--grey)'}/>
            <p className={pathMatchRoute('/') ? 'primaryColor' : 'greyColor'}>Exercises</p>
          </li>
          <li className="navbar-item" onClick={() => navigate('/profile')}>
            <BsPersonLinesFill fill={pathMatchRoute('/profile') ? 'var(--main-theme-color)' : 'var(--grey)'}/>
            <p className={pathMatchRoute('/profile') ? 'primaryColor' : 'greyColor'}>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
export default Navbar