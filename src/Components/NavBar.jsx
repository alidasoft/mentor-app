import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ userType }) => {
  return (
    <>
       <div className="information-boxes">
        <div className="information-box">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to={`/home/${userType}`}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/home/${userType}/network`}>My Network</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/home/${userType}/notifications`}>Notifications</Link>
                </li>
            </ul>   
        </nav>
    </div>
    </div>
    </>
  )
}

export default NavBar
