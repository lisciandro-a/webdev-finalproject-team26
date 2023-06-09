import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { accountLogoutThunk } from "../services/accounts/accountThunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/js/src/collapse.js";

function Navbar() {

  const { loggedIn, profile } = useSelector(state => state.account);

  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await dispatch(accountLogoutThunk()).unwrap();
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">WatchIt</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
          </div>
          {loggedIn && !profile?.isMemberAccount ? 
          <></>
          :
          <div className="navbar-nav">
            <Link className={`nav-link ${location.pathname === '/clubs' ? 'active' : ''}`} to="/clubs">Clubs</Link>
          </div>
          }
          <div className="navbar-nav ms-auto">
            <div className="nav-link">
              <Link to="/search" className=" text-decoration-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} />&nbsp;Search
              </Link>
            </div>
          { loggedIn ? (
              <>
                <div>
                  <Link 
                    className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} 
                    to="/profile">
                    Profile
                  </Link>
                </div>
                <Link className="nav-link" onClick={logoutHandler}>Logout</Link>
              </>
            ) : (
              <>
                <Link 
                  className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} 
                  to="/login">
                    Login
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