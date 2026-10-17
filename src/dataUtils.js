/**
 * DIWA2110: Web Application Development
 * Data Utilities & Initial Mock Data
 */

// 1. Array of Objects: Non-primitive structure containing initial student records
export const INITIAL_STUDENTS = [
  {
    id: "STU-2026-001",           // String: Unique Identifier
    fullName: "Thabo Mofokeng",   // String
    age: 21,                      // Number
    email: "thabo.mofokeng@limkokwing.ac.ls", // String
    course: "Diploma in Information Technology", // String
    isEnrolled: true              // Boolean: Active status
  },
  {
    id: "STU-2026-002",
    fullName: "Lindiwe Khaketla",
    age: 20,
    email: "lindi.k@limkokwing.ac.ls",
    course: "Diploma in Business Information Technology",
    isEnrolled: true
  },
  {
    id: "STU-2026-003",
    fullName: "Lerato Molapo",
    age: 23,
    email: "lerato.m@gmail.com",
    course: "Diploma in Information Technology",
    isEnrolled: false // Boolean
  }
];

// 2. LocalStorage Persistence Functions
export const loadStudents = () => {
  const savedData = localStorage.getItem('student_records');
  if (savedData) {
    return JSON.parse(savedData);
  }
  saveStudents(INITIAL_STUDENTS);
  return INITIAL_STUDENTS;
};

export const saveStudents = (studentsList) => {
  localStorage.setItem('student_records', JSON.stringify(studentsList));
};
