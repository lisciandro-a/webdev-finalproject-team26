import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { accountLogoutThunk } from "../services/accounts/accountThunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Navbar() {

  const { loggedIn } = useSelector(state => state.account);

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(accountLogoutThunk());
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">WatchIt</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
          </div>
          <div className="navbar-nav ms-auto">
            <div className="nav-link">
              <Link to="/search" className=" text-decoration-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} />&nbsp;Search
              </Link>
            </div>
          { loggedIn ? (
              <>
                <Link className="nav-link" onClick={logoutHandler}>Logout</Link>
              </>
            ) : (
              <>
                <Link 
                  className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} 
                  to="/login">
                    Login
                </Link>
                <Link 
                  className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} 
                  to="/register">
                    Register
                </Link>
              </>
            )
          }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;