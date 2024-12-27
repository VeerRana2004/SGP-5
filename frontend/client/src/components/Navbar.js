import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Login from './Login';
// import './Create.css';
const Navbar = () => {
  return (
    <div className='nav-main'>
      <nav>
        <img className='img' src='/logo192.png' alt='Logo' />
        <p className='nav-head'>DSNV</p>
        <ul className='nav-options'>
          <li className='option1'>About</li>
          <li className='option1'>Help</li>
          <li className='option1'>Resources</li>
        </ul>
        <ul className='nav-sub'>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      < Login/>
    </div>  
  );
}

// const Createroom = () => {
//   return (
//     <div className="container">
//       <form className="form">
//         <h2>Create New Room</h2>
//         <input
//           type="text"
//           placeholder='Room ID'
//           className="input"
//         />
//         <input
//           type="text"
//           placeholder="Username or email"
//           className="input"
//         />
//         <button type="submit" className="button">Create</button>
//         <a href="#" className="forgot-username">Join Using Room ID...</a>
//       </form>
//     </div>
//   );
// }

 export default Navbar;
