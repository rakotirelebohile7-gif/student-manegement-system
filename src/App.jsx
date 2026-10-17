import React, { useState } from 'react';
import { loadStudents, saveStudents } from './dataUtils';
import StudentTable from './components/StudentTable';
import StudentModal from './components/StudentModal';
import './App.css';

function App() {
  // State management vectors
  const [students, setStudents] = useState(loadStudents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'delete'
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Reusable tracking triggers mapping state states
  const openModal = (mode, student = null) => {
    setModalMode(mode);
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Reusable data application logical updates (Adds or Edits)
  const handleSaveStudent = (formData) => {
    let updatedStudentsList;

    if (modalMode === 'add') {
      // Create Operation: Generate random unique baseline id mapping tracking strings
      const newIdString = `STU-2026-${Math.floor(100 + Math.random() * 900)}`;
      const newStudentRecord = { id: newIdString, ...formData };
      
      // Use clean non-primitive concatenation patterns instead of direct mutations
      updatedStudentsList = [...students, newStudentRecord];
    } else if (modalMode === 'edit') {
      // Update Operation: Map across array matching records by state key identifiers
      updatedStudentsList = students.map((item) => 
        item.id === selectedStudent.id ? { ...item, ...formData } : item
      );
    }

    // Perform instantaneous synchronous UI rendering update and persist directly to memory block
    setStudents(updatedStudentsList);
    saveStudents(updatedStudentsList);
    closeModal();
  };

  // Delete Confirmation execution handler
  const handleDeleteConfirm = (studentId) => {
    // Array methods: Filter operator drops target records while retaining matching blocks
    const filteredList = students.filter((item) => item.id !== studentId);
    
    setStudents(filteredList);
    saveStudents(filteredList);
    closeModal();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-brand">
          <h1>Limkokwing Dashboard</h1>
          <p>DIWA2110 Web Application Development System</p>
        </div>
        <div className="header-stats">
          <button className="btn-add-primary" onClick={() => openModal('add')}>
            + Add New Student
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="card-wrapper">
          <div className="card-header">
            <h2>Active Student Registry ({students.length})</h2>
          </div>
          
          <StudentTable 
            students={students} 
            onEdit={(student) => openModal('edit', student)} 
            onDelete={(id) => openModal('delete', students.find(s => s.id === id))} 
          />
        </div>
      </main>

      {/* Mounting our unified structural layout Modal system configuration */}
      <StudentModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        studentData={selectedStudent}
        onSave={handleSaveStudent}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default App;
