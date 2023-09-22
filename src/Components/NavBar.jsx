import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
       <div className="information-boxes">
        <div className="information-box">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/mentor/profile">My Network</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/mentee/mentor">Post Notifications</Link>
                </li>
            </ul>   
        </nav>
    </div>
    </div>
    </>
  )
}

export default NavBar
