import React from 'react';

// Reusable Sub-component for individual table rows
// Demonstrates structural use of React props
const StudentRow = ({ student, onEdit, onDelete }) => {
  // Arrow function signature using parameters
  return (
    <tr>
      <td><strong>{student.id}</strong></td>
      <td>{student.fullName}</td>
      <td>{student.age}</td>
      <td>{student.email}</td>
      <td>{student.course}</td>
      <td>
        <span className={`status-badge ${student.isEnrolled ? 'active' : 'inactive'}`}>
          {student.isEnrolled ? 'Enrolled' : 'Suspended'}
        </span>
      </td>
      <td>
        <div className="action-buttons">
          <button className="btn-edit" onClick={() => onEdit(student)}>Edit</button>
          <button className="btn-delete" onClick={() => onDelete(student.id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

// Main Exported Student Table Component
const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Course of Study</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            // JavaScript Array Map Method to dynamically generate structural rows
            students.map((student) => (
              <StudentRow 
                key={student.id} 
                student={student} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="empty-state">
                No student records found. Click "Add New Student" to begin.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
