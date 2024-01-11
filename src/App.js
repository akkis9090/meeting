
import './App.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Clients from './Component/Clients';
import Packags from './Component/Packags';
import Booking from './Component/Booking';
import Room from './Component/Room';
import User from './Component/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                 <Link className='nav-link' to='/User'>User</Link>
                </li>
                <li className="nav-item">
                 <Link className='nav-link' to='/Clients'>Client</Link>
                </li>
                <li className="nav-item">
                 <Link className='nav-link' to='/Packags'>Packags</Link>
                </li>
                <li className="nav-item">
                 <Link className='nav-link' to='/Booking'>Booking</Link>
                </li>
                <li className="nav-item">
                 <Link className='nav-link' to='/Room'>Room</Link>
                </li>

              </ul>
              
            </div>
          </div>
        </nav>


        <Routes>
          <Route path='/User' element= {<User></User>}></Route>
          <Route path='/Clients' element= {<Clients></Clients>}></Route>
          <Route path='/Packags' element= {<Packags></Packags>}></Route>
          <Route path='/Booking' element= {<Booking></Booking>}></Route>
          <Route path='/Room' element= {<Room></Room>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
