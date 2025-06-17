import React, { useState, useEffect } from 'react'
import '../stylesheets/HomePage.scss' // Asegúrate de tener este archivo

const HomePage = () => {
  const [postulaciones, setPostulaciones] = useState([])
  const [showDocente, setShowDocente] = useState(true)
  const [showOtras, setShowOtras] = useState(true)
  const [modalInfoVisible, setModalInfoVisible] = useState(false)
  const [postulacionSeleccionada, setPostulacionSeleccionada] = useState(null)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('postulaciones')) || []
    setPostulaciones(data)
  }, [])

  const postulacionesDocente = postulaciones.filter(p => p.tipo === 'Docente')
  const postulacionesOtras = postulaciones.filter(p => p.tipo !== 'Docente')

  const cancelar = (ayudantia) => {
    const anteriores = JSON.parse(localStorage.getItem("postulaciones")) || []
    const actualizadas = anteriores.filter(
      (p) => !(p.ayudantia === ayudantia && p.tipo === "Docente")
    )
    localStorage.setItem("postulaciones", JSON.stringify(actualizadas))
    setPostulaciones(actualizadas) // actualiza el estado en HomePage
  }

  return (
    <div className="home">
      <p>
        ¡Te damos la bienvenida a PAU, la plataforma para postular a diversas ayudantías de nuestra universidad!
      </p>
      <h3>Mis Postulaciones :</h3>
      {modalInfoVisible && postulacionSeleccionada && (
        <div className="overlay" onClick={() => setModalInfoVisible(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Información de Postulación</h2>
            </div>

            <div className="modal-body">
              <div className="datos">
                <div>
                  <p><b>Emplazamiento</b>: San Joaquín</p>
                  <p><b>Departamento</b>: {postulacionSeleccionada.departamento}</p>
                  <p><b>Asignatura</b>: {postulacionSeleccionada.ayudantia}</p>
                  <p><b>Fecha Inicio</b>: 05/08/2024</p>
                  <p><b>Fecha Término</b>: 06/12/2024</p>
                </div>
                <div>
                  <p><b>Profesor: </b>{postulacionSeleccionada.profesor || '-'}</p>
                  <p><b>Categoría Ayudantía</b>: CONTACTO</p>
                  <p><b>Tipo Ayudantía</b>: Docente </p>
                  <p><b>N° Cupos</b>: 2</p>
                  <p><b>N° Horas (por cupo)</b>: {postulacionSeleccionada.horas}</p>
                </div>
              </div>

              <h2>Perfil deseado</h2>
              <div className="requisitos">
                <span className="tag blue">{postulacionSeleccionada.mensaje}</span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn secondary" onClick={() => setModalInfoVisible(false)}>✖ Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Ayudantías Docente */}
      <div className="accordion">
        <button onClick={() => setShowDocente(!showDocente)} className="accordion__toggle">
          {showDocente ? '▼' : '▶'} Postulaciones Ayudantías Docente
        </button>
        {showDocente && (
          <div className="accordion__content">
            {postulacionesDocente.length > 0 ? (
              <table className="tabla-postulaciones">
                <thead>
                  <tr>
                    <th>Departamento</th>
                    <th>Asignatura</th>
                    <th>Estado</th>
                    <th>Profesor</th>
                    <th>Respuesta</th>
                    <th>Fecha postulación</th>
                    <th>Eliminar</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  {postulacionesDocente.length > 0 ? (
                    postulacionesDocente.map((p, i) => (
                      <tr key={i}>
                        <td>{p.departamento || '-'}</td> 
                        <td>{p.ayudantia || '-'}</td>
                        <td><span className="estado estado--pendiente">Postulación realizada</span></td>
                        <td>{p.profesor || '-'}</td>
                        <td>{p.respuesta || '-'}</td>
                        <td>{p.fecha || '-'}</td>
                        <td><button
                            onClick={() => {
                              const confirmar = window.confirm(`¿Estás seguro de que quieres eliminar la postulación a "${p.ayudantia}"?`)
                              if (confirmar) cancelar(p.ayudantia)
                            }}
                          >
                            🗑️
                          </button></td>
                        <td><button onClick={() => {
                          setPostulacionSeleccionada(p)
                          setModalInfoVisible(true)
                        }}>
                          ℹ️
                        </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No se encuentran postulaciones...</td>
                    </tr>
                  )}
                </tbody>
              </table>
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
              <table className="tabla-postulaciones">
                <thead>
                  <tr>
                    <th>Preferencia</th>
                    <th>Departamento</th>
                    <th>Asignatura</th>
                    <th>Horas</th>
                    <th>Estado</th>
                    <th>Respuesta</th>
                    <th>Eliminar</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  {postulacionesOtras.length > 0 ? (
                    postulacionesOtras.map((p, i) => (
                      <tr key={i}>
                        <td>{p.preferencia || '-'}</td>
                        <td>{p.departamento || '-'}</td>
                        <td>{p.ayudantia}</td>
                        <td>{p.horas || '-'}</td>
                        <td><span className="estado estado--pendiente">Postulación realizada</span></td>
                        <td>{p.respuesta || '-'}</td>
                        <td><button>🗑️</button></td>
                        <td><button>ℹ️</button></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No se encuentran postulaciones...</td>
                    </tr>
                  )}
                </tbody>
              </table>
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
