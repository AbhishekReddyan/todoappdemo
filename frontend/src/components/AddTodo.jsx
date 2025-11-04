import React, { useState } from 'react';

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  };
  return (
    <form onSubmit={submit} style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a new todo"
        style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #e6edf8' }}
      />
      <button style={{ background: '#0d6efd', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 8 }}>Add</button>
    </form>
  );
}
