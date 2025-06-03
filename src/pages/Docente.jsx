import React, { useState, useEffect } from 'react'
import '../stylesheets/Docente.scss'
import PostulacionExitosa from '../components/Postulacion_exitosa'

const AYUDANTIAS_POR_DEPTO = {
  Informática: [
    "Programación",
    "Estructuras de Datos",
    "Bases de Datos",
    "Sistemas Operativos",
    "Inteligencia Artificial"
  ],
  Mecánica: [],
  Eléctrica: [],
  Química: []
}

const Docente = () => {
  const [departamento, setDepartamento] = useState("")
  const [postuladas, setPostuladas] = useState([])
  const [desplegado, setDesplegado] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [ramoSeleccionado, setRamoSeleccionado] = useState("")
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("")

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("postulaciones")) || []
    const soloDocentes = guardadas
      .filter(p => p.tipo === "Docente")
      .map(p => p.ayudantia)
    setPostuladas(soloDocentes)
  }, [])

  const postular = (ayudantia) => {
    const nueva = {
      nombre: "ALONSO AARON TIRADO",
      rol: "202223617-4",
      ayudantia,
      tipo: "Docente",
      fecha: new Date().toISOString()
    }

    const anteriores = JSON.parse(localStorage.getItem("postulaciones")) || []
    const actualizadas = [...anteriores, nueva]
    localStorage.setItem("postulaciones", JSON.stringify(actualizadas))
    setPostuladas(prev => [...prev, ayudantia])
  }

  const cancelar = (ayudantia) => {
    const anteriores = JSON.parse(localStorage.getItem("postulaciones")) || []
    const actualizadas = anteriores.filter(
      (p) => !(p.ayudantia === ayudantia && p.tipo === "Docente")
    )
    localStorage.setItem("postulaciones", JSON.stringify(actualizadas))
    setPostuladas(prev => prev.filter(p => p !== ayudantia))
  }

  const ayudantiasDisponibles = AYUDANTIAS_POR_DEPTO[departamento] || []

  return (
    <div className="docente">
      <h2>Postulación a Ayudantías Docentes</h2>

      <label>
        Selecciona departamento:{" "}
        <select
          value={departamento}
          onChange={(e) => {
            setDepartamento(e.target.value)
            setDesplegado(true)
          }}
        >
          <option value="">-- Selecciona --</option>
          {Object.keys(AYUDANTIAS_POR_DEPTO).map((depto, idx) => (
            <option key={idx} value={depto}>{depto}</option>
          ))}
        </select>
      </label>

      {departamento && desplegado && (
        <div className="ayudantias-menu">
          <h3>Ramos del departamento: {departamento}</h3>
          {ayudantiasDisponibles.length > 0 ? (
            <ul>
              {ayudantiasDisponibles.map((ay, idx) => (
                <li key={idx}>
                  {ay}{" "}
                  {postuladas.includes(ay) ? (
                    <>
                      <span>✅ Postulado</span>{" "}
                      <button onClick={() => cancelar(ay)}>Eliminar</button>
                    </>
                  ) : (
                    <button onClick={() => {
                    setRamoSeleccionado(ay)
                    setDepartamentoSeleccionado(departamento)
                    setModalVisible(true)
                    }}>
                    Postular
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay ramos disponibles en este departamento.</p>
          )}
        </div>
      )}
        <PostulacionExitosa
    visible={modalVisible}
    onClose={() => setModalVisible(false)}
    ramo={ramoSeleccionado}
    departamento={departamentoSeleccionado}
    />
    </div>
  )
}

export default Docente
