import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Course {
  id: string;
  name: string;
  duration: string;
  fees: string;
  description: string;
  teacher: string;
  status: string;
}

const initialCourses: Course[] = [
  {
    id: 'CRS001',
    name: 'Computer Science',
    duration: '4 years',
    fees: '$15,000',
    description: 'Complete program in Computer Science covering programming, algorithms, and more',
    teacher: 'Dr. Robert Johnson',
    status: 'Active',
  },
  {
    id: 'CRS002',
    name: 'Mathematics',
    duration: '4 years',
    fees: '$12,000',
    description: 'Advanced mathematics program with focus on applied and pure mathematics',
    teacher: 'Prof. Sarah Williams',
    status: 'Active',
  },
  {
    id: 'CRS003',
    name: 'Physics',
    duration: '4 years',
    fees: '$13,500',
    description: 'Comprehensive physics program including theoretical and practical physics',
    teacher: 'Mr. David Brown',
    status: 'Active',
  },
];

export default function CoursesModule() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({});

  const handleAddCourse = () => {
    setEditMode(false);
    setViewMode(false);
    setCurrentCourse({ status: 'Active' });
    setOpenDialog(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditMode(true);
    setViewMode(false);
    setCurrentCourse(course);
    setOpenDialog(true);
  };

  const handleViewCourse = (course: Course) => {
    setViewMode(true);
    setEditMode(false);
    setCurrentCourse(course);
    setOpenDialog(true);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const handleSaveCourse = () => {
    if (editMode) {
      setCourses(courses.map((c) => (c.id === currentCourse.id ? currentCourse as Course : c)));
    } else {
      const newCourse = {
        ...currentCourse,
        id: `CRS${String(courses.length + 1).padStart(3, '0')}`,
      } as Course;
      setCourses([...courses, newCourse]);
    }
    setOpenDialog(false);
    setCurrentCourse({});
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Courses Management</h1>
          <button
            onClick={handleAddCourse}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.id}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {course.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium text-gray-800">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Fees:</span>
                    <span className="font-medium text-gray-800">{course.fees}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Teacher:</span>
                    <span className="font-medium text-gray-800">{course.teacher}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleViewCourse(course)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="inline-flex items-center justify-center px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {viewMode ? 'View Course' : editMode ? 'Edit Course' : 'Add New Course'}
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <TextField
              label="Course Name"
              value={currentCourse.name || ''}
              onChange={(e) => setCurrentCourse({ ...currentCourse, name: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Duration"
                value={currentCourse.duration || ''}
                onChange={(e) => setCurrentCourse({ ...currentCourse, duration: e.target.value })}
                fullWidth
                disabled={viewMode}
              />
              <TextField
                label="Fees"
                value={currentCourse.fees || ''}
                onChange={(e) => setCurrentCourse({ ...currentCourse, fees: e.target.value })}
                fullWidth
                disabled={viewMode}
              />
            </div>
            <TextField
              label="Assigned Teacher"
              value={currentCourse.teacher || ''}
              onChange={(e) => setCurrentCourse({ ...currentCourse, teacher: e.target.value })}
              fullWidth
              disabled={viewMode}
            />
            <TextField
              label="Description"
              value={currentCourse.description || ''}
              onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
              disabled={viewMode}
            />
            <FormControl fullWidth disabled={viewMode}>
              <InputLabel id="course-status-label">Status</InputLabel>
              <Select
                labelId="course-status-label"
                value={currentCourse.status || ''}
                onChange={(e) => setCurrentCourse({ ...currentCourse, status: e.target.value })}
                label="Status"
              >
                <MenuItem key="course-active" value="Active">Active</MenuItem>
                <MenuItem key="course-inactive" value="Inactive">Inactive</MenuItem>
                <MenuItem key="course-upcoming" value="Upcoming">Upcoming</MenuItem>
              </Select>
            </FormControl>
          </div>
          {!viewMode && (
            <div className="flex justify-end space-x-2 mt-6">
              <Button onClick={() => setOpenDialog(false)} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSaveCourse} variant="contained">
                {editMode ? 'Update' : 'Save'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
