import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

const API = import.meta.env.VITE_API_URL || '/api';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Fetch todos failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = async (title) => {
    try {
      const res = await fetch(`${API}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Create failed: ${res.status} ${txt}`);
      }
      await fetchTodos();
    } catch (err) {
      console.error('Add todo error', err);
      alert('Could not add todo. See console for details.');
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await fetch(`${API}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setTodos(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err) {
      console.error('Toggle todo failed', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Delete todo failed', err);
    }
  };

  const editTodo = async (id, title) => {
    try {
      const res = await fetch(`${API}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      if (!res.ok) throw new Error('Edit failed');
      const updated = await res.json();
      setTodos(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err) {
      console.error('Edit todo failed', err);
    }
  };

  const clearCompleted = async () => {
    // confirmation to avoid accidental deletes
    if (!confirm('Delete all completed todos?')) return;
    try {
      const res = await fetch(`${API}/todos/completed`, { method: 'DELETE' });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Clear failed: ${res.status} ${txt}`);
      }
      const json = await res.json();
      console.log('Cleared completed:', json);
      // re-fetch to update UI
      await fetchTodos();
    } catch (err) {
      console.error('Clear completed failed', err);
      alert('Could not clear completed todos. See console for details.');
    }
  };

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="app-root">
      <div className="todo-card">
        <h1 className="title">Todo App</h1>

        <AddTodo onAdd={addTodo} />

        {/* FILTERS under the input */}
        <div className="filter-row">
          <div className="filter-buttons">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-btn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
            <button className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
          </div>
          <div>
            <button className="clear-btn" onClick={clearCompleted}>Clear completed</button>
          </div>
        </div>

        {loading ? <p>Loading...</p> : <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />}
      </div>
    </div>
  );
}
