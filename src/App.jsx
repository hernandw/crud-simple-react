import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('')

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      return;
    }
    console.log(tarea);
    setTareas([...tareas, { id: nanoid(10), tarea }]);
    setTarea("");
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
    
  };

  const editItem = (item) => {
    console.log(item);
    setEdit(true);
    setTarea(item.tarea);
    setId(item.id)
    
  };
  const editTarea = (e)=>{
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      return;
  }
  const filtradoTarea = tareas.map(item => item.id == id ? {id, tarea} : item)
  setTareas(filtradoTarea)
  console.log('Tareas: ', tareas);
  setEdit(false);
  setTarea('')
  setId('')
  }
  return (
    <div className="container">
      <>
        <h1 className="text-center">CRUD Simple</h1>
        <div className="row mt-4">
          <div className="col-8">
            <h4 className="text-center">Lista de Tareas</h4>
            <ul className="list-group">
              {tareas.map((item) => {
                return (
                  <li className="list-group-item" id={item.id} key={item.id}>
                    <span className="lead">{item.tarea}</span>
                    <button
                      className="btn btn-danger btn-sm float-end mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning btn-sm float-end"
                      onClick={() => editItem(item)}
                    >
                      Editar
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-4">
            {edit ? "Editar Tarea" : "Agregar Tarea"}
            <form className="d-grid" onSubmitCapture={ edit ? editTarea : agregarTarea}>
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Agregar una tarea"
                onChange={(e) => setTarea(e.target.value)}
                value={tarea}
              />
              {edit ? (
                <input
                  className="btn btn-warning"
                  type="submit"
                  value="editar"
                />
              ) : (
                <input className="btn btn-dark" type="submit" value="agregar" />
              )}
            </form>
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
