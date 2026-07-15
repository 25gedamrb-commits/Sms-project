import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Plus, Search, Edit, Trash2, Eye, Download, Upload, Filter } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  course: string;
  class: string;
  rollNumber: string;
  admissionDate: string;
  status: string;
  photo?: string;
}

const initialStudents: Student[] = [
  {
    id: 'STU001',
    firstName: 'Emma',
    lastName: 'Watson',
    email: 'emma.watson@email.com',
    phone: '+1 234 567 8901',
    gender: 'Female',
    dob: '2008-04-15',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    course: 'Computer Science',
    class: '10th',
    rollNumber: '101',
    admissionDate: '2023-09-01',
    status: 'Active',
  },
  {
    id: 'STU002',
    firstName: 'James',
    lastName: 'Smith',
    email: 'james.smith@email.com',
    phone: '+1 234 567 8902',
    gender: 'Male',
    dob: '2009-08-22',
    address: '456 Oak Avenue',
    city: 'Los Angeles',
    state: 'CA',
    course: 'Mathematics',
    class: '9th',
    rollNumber: '102',
    admissionDate: '2023-09-01',
    status: 'Active',
  },
  {
    id: 'STU003',
    firstName: 'Sophia',
    lastName: 'Johnson',
    email: 'sophia.j@email.com',
    phone: '+1 234 567 8903',
    gender: 'Female',
    dob: '2007-11-10',
    address: '789 Pine Road',
    city: 'Chicago',
    state: 'IL',
    course: 'Physics',
    class: '11th',
    rollNumber: '103',
    admissionDate: '2023-09-01',
    status: 'Active',
  },
];

export default function StudentsModule() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Partial<Student>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const handleAddStudent = () => {
    setEditMode(false);
    setViewMode(false);
    setCurrentStudent({
      status: 'Active',
      gender: 'Male',
    });
    setOpenDialog(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditMode(true);
    setViewMode(false);
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleViewStudent = (student: Student) => {
    setViewMode(true);
    setEditMode(false);
    setCurrentStudent(student);
    setOpenDialog(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleSaveStudent = () => {
    if (editMode) {
      setStudents(students.map((s) => (s.id === currentStudent.id ? currentStudent as Student : s)));
    } else {
      const newStudent = {
        ...currentStudent,
        id: `STU${String(students.length + 1).padStart(3, '0')}`,
      } as Student;
      setStudents([...students, newStudent]);
    }
    setOpenDialog(false);
    setCurrentStudent({});
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || student.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const courses = Array.from(new Set(students.map((s) => s.course)));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Students Management</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleAddStudent}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Course</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Class</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Phone</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{student.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {student.firstName.charAt(0)}
                        </div>
                        <div className="text-sm font-medium text-gray-800">
                          {student.firstName} {student.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{student.course}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{student.class}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{student.phone}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{student.email}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, filteredStudents.length)} of{' '}
              {filteredStudents.length} students
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit/View Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {viewMode ? 'View Student' : editMode ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <TextField
              label="First Name"
              value={currentStudent.firstName || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, firstName: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Last Name"
              value={currentStudent.lastName || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, lastName: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Email"
              type="email"
              value={currentStudent.email || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Phone"
              value={currentStudent.phone || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, phone: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <FormControl fullWidth disabled={viewMode}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                value={currentStudent.gender || ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, gender: e.target.value })}
                label="Gender"
              >
                <MenuItem key="gender-male" value="Male">Male</MenuItem>
                <MenuItem key="gender-female" value="Female">Female</MenuItem>
                <MenuItem key="gender-other" value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Date of Birth"
              type="date"
              value={currentStudent.dob || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, dob: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={viewMode}
            />
            <TextField
              label="Address"
              value={currentStudent.address || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, address: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="City"
              value={currentStudent.city || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, city: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="State"
              value={currentStudent.state || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, state: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Course"
              value={currentStudent.course || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, course: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Class"
              value={currentStudent.class || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, class: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Roll Number"
              value={currentStudent.rollNumber || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, rollNumber: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Admission Date"
              type="date"
              value={currentStudent.admissionDate || ''}
              onChange={(e) => setCurrentStudent({ ...currentStudent, admissionDate: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={viewMode}
            />
            <FormControl fullWidth disabled={viewMode}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                value={currentStudent.status || ''}
                onChange={(e) => setCurrentStudent({ ...currentStudent, status: e.target.value })}
                label="Status"
              >
                <MenuItem key="status-active" value="Active">Active</MenuItem>
                <MenuItem key="status-inactive" value="Inactive">Inactive</MenuItem>
                <MenuItem key="status-graduated" value="Graduated">Graduated</MenuItem>
              </Select>
            </FormControl>
          </div>
          {!viewMode && (
            <div className="flex justify-end space-x-2 mt-6">
              <Button onClick={() => setOpenDialog(false)} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSaveStudent} variant="contained">
                {editMode ? 'Update' : 'Save'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
