import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Plus, Search, Edit, Trash2, Eye, Download } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: string;
  subject: string;
  salary: string;
  joiningDate: string;
  address: string;
  status: string;
}

const initialTeachers: Teacher[] = [
  {
    id: 'TCH001',
    name: 'Dr. Robert Johnson',
    email: 'robert.j@school.com',
    phone: '+1 234 567 8910',
    qualification: 'PhD in Computer Science',
    experience: '15 years',
    subject: 'Computer Science',
    salary: '$85,000',
    joiningDate: '2015-08-15',
    address: '123 Teacher Lane, NY',
    status: 'Active',
  },
  {
    id: 'TCH002',
    name: 'Prof. Sarah Williams',
    email: 'sarah.w@school.com',
    phone: '+1 234 567 8911',
    qualification: 'MSc Mathematics',
    experience: '12 years',
    subject: 'Mathematics',
    salary: '$75,000',
    joiningDate: '2016-09-01',
    address: '456 Education St, CA',
    status: 'Active',
  },
  {
    id: 'TCH003',
    name: 'Mr. David Brown',
    email: 'david.b@school.com',
    phone: '+1 234 567 8912',
    qualification: 'MSc Physics',
    experience: '10 years',
    subject: 'Physics',
    salary: '$70,000',
    joiningDate: '2017-01-10',
    address: '789 Academy Rd, IL',
    status: 'Active',
  },
];

export default function TeachersModule() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Partial<Teacher>>({});

  const handleAddTeacher = () => {
    setEditMode(false);
    setViewMode(false);
    setCurrentTeacher({ status: 'Active' });
    setOpenDialog(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditMode(true);
    setViewMode(false);
    setCurrentTeacher(teacher);
    setOpenDialog(true);
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setViewMode(true);
    setEditMode(false);
    setCurrentTeacher(teacher);
    setOpenDialog(true);
  };

  const handleDeleteTeacher = (id: string) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const handleSaveTeacher = () => {
    if (editMode) {
      setTeachers(teachers.map((t) => (t.id === currentTeacher.id ? currentTeacher as Teacher : t)));
    } else {
      const newTeacher = {
        ...currentTeacher,
        id: `TCH${String(teachers.length + 1).padStart(3, '0')}`,
      } as Teacher;
      setTeachers([...teachers, newTeacher]);
    }
    setOpenDialog(false);
    setCurrentTeacher({});
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Teachers Management</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleAddTeacher}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Teacher ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Subject</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Qualification</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Experience</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Phone</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{teacher.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-medium">
                          {teacher.name.charAt(0)}
                        </div>
                        <div className="text-sm font-medium text-gray-800">{teacher.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{teacher.subject}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{teacher.qualification}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{teacher.experience}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{teacher.phone}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {teacher.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewTeacher(teacher)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditTeacher(teacher)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(teacher.id)}
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
        </div>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {viewMode ? 'View Teacher' : editMode ? 'Edit Teacher' : 'Add New Teacher'}
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <TextField
              label="Full Name"
              value={currentTeacher.name || ''}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Email"
              type="email"
              value={currentTeacher.email || ''}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, email: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Phone"
              value={currentTeacher.phone || ''}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, phone: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Subject"
              value={currentTeacher.subject || ''}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, subject: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Qualification"
              value={currentTeacher.qualification || ''}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, qualification: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Experience"
              value={currentTeacher.experience || ''}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, experience: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Salary"
              value={currentTeacher.salary || ''}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, salary: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Joining Date"
              type="date"
              value={currentTeacher.joiningDate || ''}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, joiningDate: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={viewMode}
            />
            <TextField
              label="Address"
              value={currentTeacher.address || ''}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, address: e.target.value })}
              fullWidth
              className="md:col-span-2"
              disabled={viewMode}
            />
            <FormControl fullWidth disabled={viewMode}>
              <InputLabel id="teacher-status-label">Status</InputLabel>
              <Select
                labelId="teacher-status-label"
                value={currentTeacher.status || ''}
                onChange={(e) => setCurrentTeacher({ ...currentTeacher, status: e.target.value })}
                label="Status"
              >
                <MenuItem key="teacher-active" value="Active">Active</MenuItem>
                <MenuItem key="teacher-leave" value="On Leave">On Leave</MenuItem>
                <MenuItem key="teacher-inactive" value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </div>
          {!viewMode && (
            <div className="flex justify-end space-x-2 mt-6">
              <Button onClick={() => setOpenDialog(false)} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSaveTeacher} variant="contained">
                {editMode ? 'Update' : 'Save'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
