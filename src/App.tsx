import './App.css'
import { useState } from 'react';

interface Task {
  id: number;
  name: string;
  done: boolean;
}

const Tasks = () => {
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [nextId, setNextId] = useState<number>(0);

  const addTask = () => {
    setTasks([
      ...tasks,
      { id: nextId, name: name, done: false }
    ]);
    setNextId(nextId + 1);
    setName('');
  }

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  const editTask = (id: number, name:string) => {
    setEditId(id);
    setEditName(name);
  }

  const editTaskCancel = () => {
    setEditId(null);
    setEditName('');
  }

  const editTaskSave = (id: number) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, name: editName } : task));
    setTasks(updatedTasks);
    setEditId(null);
    setEditName('');
  };

  const completeTask = (id: number) => {
    const updatedTasks = tasks.map((task) => task.id === id ? {...task, done: !task.done} : task);
    setTasks(updatedTasks);
  }

  return (
    <div className='add-task--wrapper'>
      <h1 className='heading1'>Add your task:</h1>
      <div className='input--wrapper'>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className='button' onClick={addTask}>
          Add
        </button>
      </div>
      <ul className='toDo--wrapper'>
        {tasks.map(task => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            {editId === task.id ? (
              
            <div className='toDo-item--wrapper'>
              <hr></hr>
              <input value={editName} onChange={(e) => setEditName(e.target.value)}/>
              <button className='button' onClick={() => editTaskSave(task.id)}>Save</button>
              <button className='button' onClick={editTaskCancel}>Cancel</button>
            </div>

            ) : (

            <div className='toDo-item--wrapper'>
              <hr></hr>
              <h2>{task.name}</h2>
              <div className='interact--wrapper'>

              </div>
              <button className='button' onClick={() => deleteTask(task.id)}>Delete</button>
              <button className='button' onClick={() => editTask(task.id, task.name)}>Edit</button>
              <input type="checkbox" checked={task.done} onChange={() => completeTask(task.id)}/>
            </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    Tasks()
  )
}

export default App;
