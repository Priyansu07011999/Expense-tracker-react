import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../../assets/logoo.png'

function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-3  text-black">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-12 mr-1" />
            <NavLink to="/" className="text-lg text-blue-500 font-semibold">MyWebLink</NavLink>
          </div>
          <nav className="flex">
            <NavLink to="/" className="mx-2">Home</NavLink>
            <NavLink to="/products" className="mx-2">Products</NavLink>
            <NavLink to="/about" className="mx-2">About us</NavLink>
          </nav>
        </header>
      );
}

export default Header