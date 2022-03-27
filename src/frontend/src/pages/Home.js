import React from 'react'
import BannerImage from '../assets/computer-dark.jpg';
import '../styles/Home.css';
import SearchBar from '../components/SearchBar';
//import Data from '../Data.json'

function Home() {
  return (
    <div className="home"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      <div className="headerContainer">
        <h1> MentiLeaders </h1>
        <p> LEADERS IN REMOTE STUDENT ENGAGEMENT </p>
        <SearchBar placeholder='Enter a Student/Class Name...' /*{data={Data}}*/ />
      </div>
    </div>
  )
}

export default Home