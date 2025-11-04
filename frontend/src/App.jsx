import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

const API = import.meta.env.VITE_API_URL || 'http://192.168.31.51:4000/api';

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
      if (!res.ok) throw new Error('Create failed');
      await fetchTodos();
    } catch (err) {
      console.error('Add todo error', err);
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
    try {
      const res = await fetch(`${API}/todos/completed`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Clear completed failed');
      await fetchTodos();
    } catch (err) {
      console.error('Clear completed failed', err);
    }
  };

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Todo App</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <button onClick={() => setFilter('all')} style={{ marginRight: 8, padding: '6px 10px' }}>All</button>
          <button onClick={() => setFilter('active')} style={{ marginRight: 8, padding: '6px 10px' }}>Active</button>
          <button onClick={() => setFilter('completed')} style={{ padding: '6px 10px' }}>Completed</button>
        </div>
        <div>
          <button onClick={clearCompleted} style={{ padding: '6px 10px' }}>Clear completed</button>
        </div>
      </div>

      <AddTodo onAdd={addTodo} />
      {loading ? <p>Loading...</p> : <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />}
    </div>
  );
}
