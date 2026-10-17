import React, { useState, useEffect } from 'react';

const StudentModal = ({ isOpen, onClose, mode, studentData, onSave, onDeleteConfirm }) => {
  // Local state variables managing controlled input forms
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('Diploma in Information Technology');
  const [isEnrolled, setIsEnrolled] = useState(true);
  
  // Validation local tracking error message state
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize modal input states when editing an existing profile record
  useEffect(() => {
    if (mode === 'edit' && studentData) {
      setFullName(studentData.fullName);
      setAge(studentData.age);
      setEmail(studentData.email);
      setCourse(studentData.course);
      setIsEnrolled(studentData.isEnrolled);
      setErrorMessage('');
    } else {
      // Clear form inputs for blank add modes
      setFullName('');
      setAge('');
      setEmail('');
      setCourse('Diploma in Information Technology');
      setIsEnrolled(true);
      setErrorMessage('');
    }
  }, [mode, studentData, isOpen]);

  // If modal state visibility is false, do not render layout structures
  if (!isOpen) return null;

  // Intercepting submission event handler to run Phase 6 validatory testing
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Required field checks
    if (!fullName.trim() || !email.trim() || !age) {
      setErrorMessage('All input fields are required.');
      return;
    }

    // 2. Comprehensive Email structural check using standard regex match
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please provide a valid formatting email pattern.');
      return;
    }

    // 3. Sensible age integer testing range check
    const numericAge = parseInt(age, 10);
    if (isNaN(numericAge) || numericAge < 16 || numericAge > 100) {
      setErrorMessage('Please enter a sensible student age range (16 - 100).');
      return;
    }

    // Clear operational messages and bundle records
    setErrorMessage('');
    
    const recordPayload = {
      fullName: fullName.trim(),
      age: numericAge,
      email: email.trim().toLowerCase(),
      course: course,
      isEnrolled: isEnrolled
    };

    onSave(recordPayload);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>
            {mode === 'add' && '➕ Add New Student Profile'}
            {mode === 'edit' && '📝 Edit Student Profile'}
            {mode === 'delete' && '⚠️ Confirm Deletion'}
          </h3>
          <button className="modal-close-times" onClick={onClose}>&times;</button>
        </div>

        {errorMessage && <div className="validation-error-banner">{errorMessage}</div>}

        {mode === 'delete' ? (
          <div className="modal-body text-center">
            <p>Are you sure you want to permanently delete <strong>{studentData?.fullName}</strong>?</p>
            <p className="text-muted">This transaction cannot be undone inside local cache frames.</p>
            <div className="modal-actions-wrapper">
              <button className="btn-cancel" onClick={onClose}>Cancel</button>
              <button className="btn-danger-confirm" onClick={() => onDeleteConfirm(studentData.id)}>
                Confirm Delete
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label>Full Name:</label>
              <input 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="e.g. Thabo Mofokeng"
              />
            </div>

            <div className="form-group">
              <label>Age:</label>
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                placeholder="e.g. 21"
              />
            </div>

            <div className="form-group">
              <label>Email Address:</label>
              <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="e.g. user@limkokwing.ac.ls"
              />
            </div>

            <div className="form-group">
              <label>Course of Study:</label>
              <select value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="Diploma in Information Technology">Diploma in Information Technology</option>
                <option value="Diploma in Business Information Technology">Diploma in Business Information Technology</option>
              </select>
            </div>

            <div className="form-group row-inline">
              <label>
                <input 
                  type="checkbox" 
                  checked={isEnrolled} 
                  onChange={(e) => setIsEnrolled(e.target.checked)} 
                />
                Mark as Actively Enrolled
              </label>
            </div>

            <div className="modal-actions-wrapper">
              <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-save-confirm">Save Record</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentModal;
