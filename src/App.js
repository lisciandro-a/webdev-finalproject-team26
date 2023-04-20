import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route} from "react-router";
import Home from './home';
import Login from './login';
import Register from './login/register';
import Search from './search';
import WatchDetails from './watchDetails';
import NotFound from './common/notFound';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { accountLoginThunk } from './services/accounts/accountThunks';
import Navbar from './navbar';
import Profile from './profile';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(accountLoginThunk());
  })
  return (
    <div className="App">
      <BrowserRouter>
        <div className='container'>
          <Navbar/>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:mediaType/:searchTerm" element={<Search />} />
            <Route path="/details/:mediaType/:simklID" element={<WatchDetails />} />
            <Route path="/profile/:profileID?" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
