import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlusCircle, FaTrash  } from 'react-icons/fa';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../store/todoSlice';

export default function TodoList() {
  const dispatch = useDispatch();
  const { list: tasks, loading: todoLoading, error: todoError } = useSelector((state) => state.todos);
  const [newTask, setNewTask] = React.useState('');

  React.useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);


  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch(createTodo(newTask));
      setNewTask('');
    }
  };


  const toggleTaskCompletion = (task) => {
    dispatch(updateTodo({ todoId: task._id, newData: { completed: !task.completed } }));
  };


  const handleDeleteTask = (task) => {
    dispatch(deleteTodo(task._id));
  };

  return (
    <div className="col-xl-6 col-md-12 mb-4">
      <div className="card bg-primary text-white">
        <div className="card-body">
          <h5>To-Do List</h5>
          <form onSubmit={handleAddTask} className="mt-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ajouter une tâche"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                style={{ marginRight: '10px', border: 'none' }}
              />
              <button
                type="submit"
                className="btn btn-success mt-2 bg-primary"
                style={{ marginBottom: '5px', border: 'none' }}
              >
                <FaPlusCircle size={20} />
              </button>
            </div>
          </form>

          <ul className="list-group list-group-flush mt-3" style={{ borderRadius: '10px' }}>
            {todoLoading ? (
              <li className="list-group-item">Chargement des tâches...</li>
            ) : todoError ? (
              <li className="list-group-item text-danger">Erreur : {todoError}</li>
            ) : tasks.length === 0 ? (
              <li className="list-group-item">Aucune tâche trouvée</li>
            ) : (
              tasks.map((task) => (
                <li
                  key={task._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span className={task.completed ? 'text-decoration-line-through' : ''}>
                    {task.title || 'Tâche sans titre'}
                  </span>
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task)}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task)}
                      className="btn btn-danger btn-sm ms-2"
                    >
                      <FaTrash />
                    </button>

                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
