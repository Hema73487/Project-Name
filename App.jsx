import React, { useState, useMemo } from 'react';
import './App.css';

const AssignmentTracker = () => {
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ title: '', subject: '', dueDate: '' });

  const subjects = ['Mathematics', 'Physics', 'Computer Science', 'History'];

  const addAssignment = (e) => {
    e.preventDefault();
    if (!form.title || !form.subject || !form.dueDate) return;
    
    const newEntry = {
      ...form,
      id: Date.now(),
      status: 'Pending'
    };
    setAssignments([...assignments, newEntry]);
    setForm({ title: '', subject: '', dueDate: '' });
  };

  const updateStatus = (id, newStatus) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const stats = useMemo(() => ({
    total: assignments.length,
    submitted: assignments.filter(a => a.status === 'Submitted').length,
    pending: assignments.filter(a => a.status === 'Pending').length,
    late: assignments.filter(a => a.status === 'Late').length,
  }), [assignments]);

  const filteredList = filter === 'All' ? assignments : assignments.filter(a => a.subject === filter);

  return (
    <div className="container">
      <h1>College Assignment Tracker</h1>

      <div className="dashboard">
        <div className="stat-card">Total: {stats.total}</div>
        <div className="stat-card green">Submitted: {stats.submitted}</div>
        <div className="stat-card yellow">Pending: {stats.pending}</div>
        <div className="stat-card red">Late: {stats.late}</div>
      </div>

      <form onSubmit={addAssignment} className="assignment-form">
        <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
          <option value="">Select Subject</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input type="date" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} />
        <button type="submit">Add Assignment</button>
      </form>

      <div className="filter-section">
        <label>Filter by Subject: </label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Subjects</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <table className="assignment-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.subject}</td>
              <td>{a.dueDate}</td>
              <td><span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span></td>
              <td>
                <select value={a.status} onChange={(e) => updateStatus(a.id, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Late">Late</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTracker;