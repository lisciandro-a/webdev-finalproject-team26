import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from './home';
import Login from './login';
import Register from './login/register';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './services/accounts/accountReducer';

const store = configureStore({ reducer: { account: accountReducer }});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
