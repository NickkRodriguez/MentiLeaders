import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import '../styles/Navbar.css';

export default function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  
  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className='leftSide' id={openLinks ? "open" : "close"}>
        <div className='Logo'> MentiLeaders </div>
        <div className='hiddenLinks'>
          <Link to='/'> Home </Link>
          <Link to='/leaderboard'> Leaderboard </Link>
          <Link to='/about'> About </Link>
          <Link to='/contact'> Contact </Link>
        </div>
      </div>
      <div className='rightSide'>
        <Link to='/'> Home </Link>
        <Link to='/leaderboard'> Leaderboard </Link>
        <Link to='/about'> About </Link>
        <Link to='/contact'> Contact </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
        
      </div>
    </div>
  )
}
