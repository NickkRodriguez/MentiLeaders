import React from 'react'
import AboutUs from '../assets/teamwork.jpg';
import '../styles/About.css'

function About() {
    return (
        <div className='about'>
            <div className='aboutTop'
                style={{ backgroundImage: `url(${AboutUs})` }}
            ></div>
            <div className='aboutBottom'>
                <h1> ABOUT US </h1>
                <p>
                    Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random paragraph random paragraph. Random paragraph random.
                </p>
            </div>
        </div>
    )
}

export default About