import React, { useState } from 'react';

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) return;
    await onEdit(id, editingText.trim());
    cancelEdit();
  };

  if (!todos.length) return <p>No todos yet</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map(t => (
        <li key={t.id} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 0',
          borderBottom: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={e => onToggle(t.id, e.target.checked)}
            />
            {editingId === t.id ? (
              <input
                value={editingText}
                onChange={e => setEditingText(e.target.value)}
                style={{ padding: 6, minWidth: 240 }}
              />
            ) : (
              <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                {t.title}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {editingId === t.id ? (
              <>
                <button onClick={() => saveEdit(t.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => startEdit(t)}>Edit</button>
                <button onClick={() => onDelete(t.id)}>Delete</button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
