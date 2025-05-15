// Simulated database
let database = null;
let collection = null;
let indexes = new Set();

// Sample student data
const sampleStudents = [
    {
        student_id: 1,
        name: "John Smith",
        age: 20,
        gender: "Male",
        department: "Computer Science",
        marks: {
            Math: 85,
            Science: 78,
            English: 92
        },
        enrollment_date: "2024-01-15"
    },
    {
        student_id: 2,
        name: "Emma Wilson",
        age: 22,
        gender: "Female",
        department: "Electrical Engineering",
        marks: {
            Math: 92,
            Science: 88,
            English: 85
        },
        enrollment_date: "2024-01-02"
    },
    {
        student_id: 3,
        name: "Michael Chen",
        age: 21,
        gender: "Male",
        department: "Computer Science",
        marks: {
            Math: 78,
            Science: 82,
            English: 88
        },
        enrollment_date: "2024-01-10"
    },
    {
        student_id: 4,
        name: "Sarah Johnson",
        age: 19,
        gender: "Female",
        department: "Data Science",
        marks: {
            Math: 95,
            Science: 90,
            English: 87
        },
        enrollment_date: "2024-01-20"
    },
    {
        student_id: 5,
        name: "David Brown",
        age: 23,
        gender: "Male",
        department: "Mechanical Engineering",
        marks: {
            Math: 75,
            Science: 68,
            English: 82
        },
        enrollment_date: "2024-01-05"
    },
    {
        student_id: 6,
        name: "Lisa Anderson",
        age: 20,
        gender: "Female",
        department: "Computer Science",
        marks: {
            Math: 88,
            Science: 85,
            English: 90
        },
        enrollment_date: "2024-01-12"
    },
    {
        student_id: 7,
        name: "James Wilson",
        age: 22,
        gender: "Male",
        department: "Electrical Engineering",
        marks: {
            Math: 82,
            Science: 75,
            English: 78
        },
        enrollment_date: "2024-01-01"
    },
    {
        student_id: 8,
        name: "Emily Davis",
        age: 21,
        gender: "Female",
        department: "Data Science",
        marks: {
            Math: 90,
            Science: 92,
            English: 85
        },
        enrollment_date: "2024-01-08"
    },
    {
        student_id: 9,
        name: "Robert Taylor",
        age: 20,
        gender: "Male",
        department: "Computer Science",
        marks: {
            Math: 85,
            Science: 80,
            English: 88
        },
        enrollment_date: "2024-01-18"
    },
    {
        student_id: 10,
        name: "Maria Garcia",
        age: 22,
        gender: "Female",
        department: "Mechanical Engineering",
        marks: {
            Math: 78,
            Science: 85,
            English: 92
        },
        enrollment_date: "2024-01-04"
    }
];

// Helper function to display results
function displayResults(results) {
    document.getElementById('results').innerHTML = JSON.stringify(results, null, 2);
}

// Initialize database with sample data
function initializeDatabase() {
    database = { name: 'StudentRecords' };
    collection = [...sampleStudents];
    displayResults({ 
        message: 'Database initialized with sample data', 
        studentCount: collection.length 
    });
}

// Phase 1: Database & Collection Creation
function createDatabase() {
    database = { name: 'StudentRecords' };
    displayResults({ message: 'Database StudentRecords created successfully' });
}

function createCollection() {
    if (!database) {
        displayResults({ error: 'Please create database first' });
        return;
    }
    collection = [];
    displayResults({ message: 'Collection Students created successfully' });
}

// Phase 2: Query Operations
function getAllStudents() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    displayResults(collection);
}

function getCSStudents() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    const csStudents = collection.filter(s => s.department.toLowerCase() === 'computer science');
    displayResults(csStudents);
}

function getHighMathScorers() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    const highScorers = collection.filter(s => s.marks.Math > 80);
    displayResults(highScorers);
}

function getOlderStudents() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    const olderStudents = collection.filter(s => s.age > 21);
    displayResults(olderStudents);
}

function getRecentEnrollments() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    const recentStudents = collection.filter(s => s.enrollment_date > '2024-01-05');
    displayResults(recentStudents);
}

// Update Operations
function increaseMathMarks() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    collection.forEach(s => s.marks.Math += 5);
    displayResults({ message: 'Math marks increased by 5 for all students', collection });
}

function addActiveStatus() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    collection.forEach(s => s.status = 'active');
    displayResults({ message: 'Active status added to all students', collection });
}

function changeDepartment() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    
    // List of all possible departments
    const departments = [
        'Computer Science',
        'Data Science',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Chemical Engineering'
    ];
    
    // Randomly select a student
    const randomIndex = Math.floor(Math.random() * collection.length);
    const student = collection[randomIndex];
    
    // Get current department
    const currentDept = student.department;
    
    // Filter out the current department and randomly select a new one
    const availableDepts = departments.filter(dept => dept !== currentDept);
    const newDept = availableDepts[Math.floor(Math.random() * availableDepts.length)];
    
    // Update the student's department
    student.department = newDept;
    
    displayResults({ 
        message: `Changed department for student ${student.name}`,
        from: currentDept,
        to: newDept,
        updatedStudent: student 
    });
}

// Delete Operations
function deleteLowestScience() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    if (collection.length === 0) return displayResults({ error: 'Collection is empty' });
    
    const lowestScience = collection.reduce((min, student) => 
        student.marks.Science < min.marks.Science ? student : min
    );
    collection = collection.filter(s => s.student_id !== lowestScience.student_id);
    displayResults({ message: 'Student with lowest science marks deleted', deletedStudent: lowestScience });
}

function deleteOldEnrollments() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    const originalLength = collection.length;
    collection = collection.filter(s => s.enrollment_date >= '2024-01-03');
    displayResults({ 
        message: `${originalLength - collection.length} students deleted`,
        remainingStudents: collection 
    });
}

// Aggregation Operations
function getEnglishAverage() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    if (collection.length === 0) return displayResults({ error: 'Collection is empty' });
    
    const avg = collection.reduce((sum, student) => sum + student.marks.English, 0) / collection.length;
    displayResults({ averageEnglishMarks: avg.toFixed(2) });
}

function getDepartmentCount() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    const deptCount = collection.reduce((acc, student) => {
        acc[student.department] = (acc[student.department] || 0) + 1;
        return acc;
    }, {});
    displayResults(deptCount);
}

function getTopStudents() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    const studentsWithTotal = collection.map(student => ({
        ...student,
        totalMarks: student.marks.Math + student.marks.Science + student.marks.English
    }))
    .sort((a, b) => b.totalMarks - a.totalMarks)
    .slice(0, 3);
    displayResults(studentsWithTotal);
}

// Indexing Operations
function createNameIndex() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    indexes.add('name');
    displayResults({ message: 'Index created on name field' });
}

function showIndexes() {
    if (!collection) return displayResults({ error: 'Collection not found' });
    displayResults({ indexes: Array.from(indexes) });
}

// Handle form submission for inserting new student records
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('studentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!collection) {
            displayResults({ error: 'Please initialize database first' });
            return;
        }

        // Get the next available student ID
        const maxId = Math.max(...collection.map(s => s.student_id));
        const newId = document.getElementById('student_id').value || (maxId + 1);

        // Check if ID already exists
        if (collection.some(s => s.student_id === parseInt(newId))) {
            displayResults({ error: 'Student ID already exists' });
            return;
        }

        const newStudent = {
            student_id: parseInt(newId),
            name: document.getElementById('name').value,
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
            department: document.getElementById('department').value,
            marks: {
                Math: parseInt(document.getElementById('mathMarks').value),
                Science: parseInt(document.getElementById('scienceMarks').value),
                English: parseInt(document.getElementById('englishMarks').value)
            },
            enrollment_date: document.getElementById('enrollment_date').value
        };

        // Add the new student to the collection
        collection.push(newStudent);
        
        // Display success message
        displayResults({ 
            message: 'New student added successfully', 
            addedStudent: newStudent,
            totalStudents: collection.length
        });

        // Reset the form
        this.reset();
    });
});
