import React from 'react';

export default function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) return <p>No todos yet</p>;
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map(t => (
        <li key={t.id} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 0', borderBottom: '1px solid #eee'
        }}>
          <div>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={e => onToggle(t.id, e.target.checked)}
            />
            <span style={{ marginLeft: 8, textDecoration: t.completed ? 'line-through' : 'none' }}>
              {t.title}
            </span>
          </div>
          <button onClick={() => onDelete(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
