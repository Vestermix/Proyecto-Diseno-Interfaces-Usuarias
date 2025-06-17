// src/components/PostulacionExitosa.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../stylesheets/PostulacionExitosa.scss'

const PostulacionExitosa = ({ visible, onClose, ramo, departamento, profe , mensaje}) => {
  const navigate = useNavigate()

  const handlePostular = () => {
    const nueva = {
      nombre: "ALONSO AARON TIRADO",
      rol: "202223617-4",
      ayudantia: ramo,
      departamento,
      profesor: profe,
      tipo: "Docente",
      mensaje: mensaje,
      fecha: new Date().toLocaleString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      horas: 15
    }

    const anteriores = JSON.parse(localStorage.getItem("postulaciones")) || []
    const actualizadas = [...anteriores, nueva]
    localStorage.setItem("postulaciones", JSON.stringify(actualizadas))

    alert('✅ Postulación enviada')
    onClose()
    navigate('/')
  }

  if (!visible) return null

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Postular Ayudantía Docente</h2>
        </div>
          <h3>Información: </h3>
        <div className="modal-body">
          <div className="datos">
            <div>
              <p><b>Emplazamiento</b>: San Joaquín</p>
              <p><b>Departamento</b>: {departamento}</p>
              <p><b>Asignatura</b>: {ramo}</p>
              <p><b>Fecha Inicio</b>: 05/08/2024</p>
              <p><b>Fecha Término</b>: 06/12/2024</p>
            </div>
            <div>
              <p><b>Profesor: </b>{profe}</p>
              <p><b>Categoría Ayudantía</b>: CONTACTO</p>
              <p><b>Tipo Ayudantía</b>: DOCENTE</p>
              <p><b>N° Cupos</b>: 2</p>
              <p><b>N° Horas (por cupo)</b>: 15</p>
            </div>
          </div>

          <h2>Perfil deseado</h2>
          <div className="requisitos">
            <span className="tag blue">{mensaje}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn primary" onClick={handlePostular}>✔ Postular</button>
          <button className="btn secondary" onClick={onClose}>✖ Cerrar</button>
        </div>
      </div>
    </div>
  )
}

export default PostulacionExitosa
