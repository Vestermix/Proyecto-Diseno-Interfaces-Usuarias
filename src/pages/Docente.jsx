import React, { useState, useEffect } from 'react'
import '../stylesheets/Docente.scss'
import PostulacionExitosa from '../components/Postulacion_exitosa'

const AYUDANTIAS_POR_DEPTO = {
  Informática: [
   { 
    nombre: "[IWI-131] - Programación",
    profesor: "Daniel Flores",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
   },
    {
    nombre: "[INF-134] - Estructuras de Datos",
    profesor: "Juan Pablo",
    mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
    },
    {
      nombre: "[INF-239] - Bases de Datos",
      profesor: "Richard Rooms",
      mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
    },
    {
      nombre: "[INF-246] - Sistemas Operativos",
      profesor: "Vitor Tap",
      mensaje:"Cercano al estudiante, Buena disposición, Comunicación clara."
    },
    {
    nombre: "[INF-295] - Inteligencia Artificial",
    profesor: "Ely Montero",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
  }
  ],
  Física: [
    {
      nombre:"[FIS-141] - Física General IV-A",
      profesor: "Fabian Mendizabal",
    mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
    },
    {
      nombre:"[FIS-131] - Física General III",
      profesor: "Alonso Days",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
    },
    {
    nombre:"[FIS-121] - Física General II",
    profesor: "Clark Kent",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
    },
    {
      nombre:"[FIS-210] - Mecanica Intermedia I",
      profesor:"Gonzalo Gutierrez",
    mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
    },
    {
    nombre:"[FIS-245] - Métodos de la Física Matemática",
    profesor: "Matias Ramirez",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
  }
  ],
  Telematica: [
   { 
    nombre: "[ELO-320] - Estructura de datos y Algoritmos",
    profesor: "Richard Watterson",
    mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
   },
    {
    nombre: "[TEL-222] - Fundamentos de transmisión de señales",
    profesor: "Mike Wasowski",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
    },
    {
      nombre: "[TEL-335] - Diseño de aplicaciones web y móviles",
      profesor: "Mark Zuckerberg",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
    },
    {
      nombre: "[TEL-315] - Redes inalámbricas",
      profesor: "R2D2",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
    },
    {
    nombre: "[ELO-322] - Redes de computadores I",
    profesor: "Lain Iwakura",
    mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
  }
  ],
  Eléctrica: [
   { 
    nombre: "[ELI-211] - Redes Eléctricas I",
    profesor: "El Papu",
    mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
   },
    {
    nombre: "[ELI-212] - Redes Eléctricas II",
    profesor: "El Super Papu",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
    },
    {
      nombre: "[ELI-215] - Campos Electromagnéticos",
      profesor: "Magneto",
    mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
    },
    {
      nombre: "[ELI-216] - Electrónica General I",
      profesor: "Mago Eléctrico Clash Royale",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
    },
    {
    nombre: "[ELI-110] - Introducción a la Electrotecnia",
    profesor: "Pikachu",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
    }
  ],
  Matemática: [
   { 
    nombre: "[MAT-024] - Matemáticas 4",
    profesor: "Bulma",
    mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
   },
    {
    nombre: "[MAT-270] - Análisis Numérico",
    profesor: "Don Francisco",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
    },
    {
      nombre: "[MAT-235] - Variable Compleja",
      profesor: "Doctor Eggman",
    mensaje: "Cercano al estudiante, Buena disposición, Comunicación clara."
    },
    {
      nombre: "[MAT-243] - EDO",
      profesor: "Tony Stark",
    mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
    },
    {
    nombre: "[MAT-214] - Estructuras Algebraicas",
    profesor: "Profesor Doofenshmirtz",
    mensaje: "Responsable y puntual, Explicación precisa, Seguimiento de pautas"
    }
  ]
}

const Docente = () => {
  const [departamento, setDepartamento] = useState("")
  const [postuladas, setPostuladas] = useState([])
  const [desplegado, setDesplegado] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [ramoSeleccionado, setRamoSeleccionado] = useState("")
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("")
  const [profesorSeleccionado, setProfesorSeleccionado] = useState("")
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState("")


  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("postulaciones")) || []
    const soloDocentes = guardadas
      .filter(p => p.tipo === "Docente")
      .map(p => p.ayudantia)
    setPostuladas(soloDocentes)
  }, [])



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
                  {ay.nombre}
                  {postuladas.includes(ay.nombre) ? (
                    <>
                      <span>✅ Postulación realizada</span>{" "}
                      <button
                        onClick={() => {
                          const confirmar = window.confirm(`¿Estás seguro de que quieres eliminar la postulación a "${ay.nombre}"?`)
                          if (confirmar) cancelar(ay.nombre)
                        }}
                      >
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <button onClick={() => {
                      setRamoSeleccionado(ay.nombre)
                      setProfesorSeleccionado(ay.profesor) // <-- aquí extraemos el profe
                      setMensajeSeleccionado(ay.mensaje) 
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
      mensaje={mensajeSeleccionado}
      profe={profesorSeleccionado}
    />
    </div>
  )
}

export default Docente
