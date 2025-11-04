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
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a new todo"
        style={{ padding: '8px', width: '70%' }}
      />
      <button style={{ padding: '8px 12px', marginLeft: 8 }} type="submit">Add</button>
    </form>
  );
}
