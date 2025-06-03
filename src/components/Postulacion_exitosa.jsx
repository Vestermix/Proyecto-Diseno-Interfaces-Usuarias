// src/components/PostulacionExitosa.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../stylesheets/PostulacionExitosa.scss'

const PostulacionExitosa = ({ visible, onClose, ramo, departamento }) => {
  const [modoConfirmacion, setModoConfirmacion] = useState(false)
  const [popupConfirmacion, setPopupConfirmacion] = useState(false)
  const navigate = useNavigate()

  const handlePostular = () => {
    const nueva = {
      nombre: "ALONSO AARON TIRADO",
      rol: "202223617-4",
      ayudantia: ramo,
      departamento,
      tipo: "Docente",
      fecha: new Date().toISOString()
    }

    const anteriores = JSON.parse(localStorage.getItem("postulaciones")) || []
    const actualizadas = [...anteriores, nueva]
    localStorage.setItem("postulaciones", JSON.stringify(actualizadas))

    alert('✅ Postulación enviada')
    setPopupConfirmacion(false)
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
              <p><b>Categoría Ayudantía</b>: CONTACTO</p>
              <p><b>Tipo Ayudantía</b>: DOCENTE</p>
              <p><b>N° Cupos</b>: 2</p>
              <p><b>N° Horas (por cupo)</b>: 15</p>
            </div>
          </div>

          <h3>Requisitos</h3>
          <div className="requisitos">
            <span className="tag red">Promedio &gt; 80</span>
            <span className="tag green">Asistencia &gt; 50</span>
          </div>
        </div>

        <div className="modal-footer">
          {!modoConfirmacion ? (
            <button className="btn primary" onClick={handlePostular}>✔ Postular</button>
          ) : (
            <button className="btn warning" onClick={() => setPopupConfirmacion(true)}>
              ⚠ Postular sin requisitos
            </button>
          )}
          <button className="btn secondary" onClick={onClose}>✖ Cerrar</button>
        </div>

        {popupConfirmacion && (
          <div className="confirm-box">
            <p>¿Estás seguro de postular aunque no cumplas los requisitos?</p>
            <div className="modal-footer">
              <button className="btn primary" onClick={handlePostular}>✔ Sí, postular</button>
              <button className="btn secondary" onClick={() => setPopupConfirmacion(false)}>✖ Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostulacionExitosa
