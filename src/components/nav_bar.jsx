import React from 'react'
import { NavLink } from 'react-router-dom'
import '../stylesheets/nav-bar/nav-bar.scss'

export const NavBar = () => {
  const navLinkClass = ({ isActive }) => {
    const classes = ['nav-bar__link']
    if (isActive) classes.push('nav-bar__link--active')
    return classes.join(' ')
  }
  return (
    <nav className='nav-bar'>
      <NavLink
        className={navLinkClass}
        to='/'
      >
        Inicio
      </NavLink>
      <NavLink
        className={navLinkClass}
        to='/Docente'
      >
        Ayudantías Docente
      </NavLink>
      <NavLink 
      className={navLinkClass}
      to = '/Administrativa'>
        Ayudantías Administrativas
      </NavLink>
      <NavLink
      className={navLinkClass}
      to = '/Investigacion'>
        Ayudantías de Investigación
      </NavLink>
    </nav>
  )
}
 
export default NavBar
