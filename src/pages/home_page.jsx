import React, { useState, useEffect } from 'react'
import '../stylesheets/HomePage.scss' // Asegúrate de tener este archivo

const HomePage = () => {
  const [postulaciones, setPostulaciones] = useState([])
  const [showDocente, setShowDocente] = useState(false)
  const [showOtras, setShowOtras] = useState(false)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('postulaciones')) || []
    setPostulaciones(data)
  }, [])

  const postulacionesDocente = postulaciones.filter(p => p.tipo === 'Docente')
  const postulacionesOtras = postulaciones.filter(p => p.tipo !== 'Docente')

  return (
    <div className="home">
      <p>
        ¡Te damos la bienvenida a PAU, la plataforma para postular a diversas ayudantías de nuestra universidad!
      </p>

      {/* Ayudantías Docente */}
      <div className="accordion">
        <button onClick={() => setShowDocente(!showDocente)} className="accordion__toggle">
          {showDocente ? '▼' : '▶'} Postulaciones Ayudantías Docente
        </button>
        {showDocente && (
          <div className="accordion__content">
            {postulacionesDocente.length > 0 ? (
              <ul>
                {postulacionesDocente.map((p, i) => (
                  <li key={i}>
                    {p.ayudantia} – {new Date(p.fecha).toLocaleDateString()}
                    <span className="estado estado--pendiente">Postulación realizada</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se ha registrado ninguna postulación.</p>
            )}
          </div>
        )}
      </div>

      {/* Ayudantías Administrativas / Investigación */}
      <div className="accordion">
        <button onClick={() => setShowOtras(!showOtras)} className="accordion__toggle">
          {showOtras ? '▼' : '▶'} Postulaciones Ayudantías Administrativas / Investigación
        </button>
        {showOtras && (
          <div className="accordion__content">
            {postulacionesOtras.length > 0 ? (
              <ul>
                {postulacionesOtras.map((p, i) => (
                  <li key={i}>
                    {p.ayudantia} – {new Date(p.fecha).toLocaleDateString()} ({p.tipo})
                    <span className="estado estado--pendiente">Postulación realizada</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No se ha registrado ninguna postulación.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
