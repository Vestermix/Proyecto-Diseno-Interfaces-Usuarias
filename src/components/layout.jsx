import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/home_page'
import Administrativa from '../pages/Administrativa'
import Investigacion from '../pages/Investigacion'
import Docente from '../pages/Docente'

import USM from '../assets/usm.jpg'
import NavBar from '../components/nav_bar'

const Layout = () => {
  return (
    <BrowserRouter>
      <div className='layout'>
        <h1 className='layout__title'>Plataforma Ayudantía Unificada</h1>

        <div className='imagen_usm'>  
          <img src={USM} height={80} alt="usm" />
        </div>

        <div className="info">
          <table>
            <tbody>
              <tr>
                <td><strong>Nombre</strong></td><td>: ALONSO AARON TIRADO</td>
                <td><strong>Rol</strong></td><td>: 202222222-2</td>
              </tr>
              <tr>
                <td><strong>Emplazamiento</strong></td><td>: Santiago San Joaquín</td>
                <td><strong>Calidad</strong></td><td>: Regular</td>
              </tr>
              <tr>
                <td><strong>Carrera</strong></td><td>: INGENIERÍA CIVIL EN INFORMÁTICA</td>
                <td><strong>Última Matrícula *</strong></td><td>: 2025-1</td>
              </tr>
              <tr>
                <td><strong>Nivel *</strong></td><td>: C</td>
                <td><strong>Periodo</strong></td><td>: 2025-1</td>
              </tr>
            </tbody>
          </table>
        </div>

        <NavBar />

        <div className='layout__page'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/Administrativa' element={<Administrativa />} />
            <Route path='/Investigacion' element={<Investigacion />} />
            <Route path='/Docente' element={<Docente />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Layout
