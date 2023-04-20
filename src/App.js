import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from './home';
import Login from './login';
import Register from './login/register';
import Search from './search';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { accountLoginThunk } from './services/accounts/accountThunks';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(accountLoginThunk());
  }
  )
  return (
    <div className="App">
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:searchTerm" element={<Search />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
