// import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route} from "react-router";
import Home from './home';
import Login from './login';
import Register from './login/register';
import Search from './search';
import WatchDetails from './watchDetails';
import NotFound from './common/notFound';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
        <div className='container'>
          <Routes>
          <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/:mediaType/:searchTerm" element={<Search />} />
            <Route path="/watchDetails/:mediaType/:simklID" element={<WatchDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
