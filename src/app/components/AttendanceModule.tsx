import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Calendar, Save, FileText } from 'lucide-react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late';
}

const students = [
  { id: 'STU001', name: 'Emma Watson', course: 'Computer Science', class: '10th' },
  { id: 'STU002', name: 'James Smith', course: 'Mathematics', class: '9th' },
  { id: 'STU003', name: 'Sophia Johnson', course: 'Physics', class: '11th' },
  { id: 'STU004', name: 'Michael Brown', course: 'Chemistry', class: '10th' },
  { id: 'STU005', name: 'Olivia Davis', course: 'Biology', class: '12th' },
];

export default function AttendanceModule() {
  const [selectedCourse, setSelectedCourse] = useState('Computer Science');
  const [selectedClass, setSelectedClass] = useState('10th');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(
    students.map((s) => ({
      studentId: s.id,
      studentName: s.name,
      status: 'present' as const,
    }))
  );

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(
      attendance.map((record) =>
        record.studentId === studentId ? { ...record, status } : record
      )
    );
  };

  const handleSaveAttendance = () => {
    alert('Attendance saved successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const absentCount = attendance.filter((a) => a.status === 'absent').length;
  const lateCount = attendance.filter((a) => a.status === 'late').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
          <button className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            View Reports
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Class & Date</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormControl fullWidth>
              <InputLabel id="attendance-course-label">Course</InputLabel>
              <Select
                labelId="attendance-course-label"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                label="Course"
              >
                <MenuItem key="course-cs" value="Computer Science">Computer Science</MenuItem>
                <MenuItem key="course-math" value="Mathematics">Mathematics</MenuItem>
                <MenuItem key="course-physics" value="Physics">Physics</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="attendance-class-label">Class</InputLabel>
              <Select
                labelId="attendance-class-label"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                label="Class"
              >
                <MenuItem key="class-9" value="9th">9th Grade</MenuItem>
                <MenuItem key="class-10" value="10th">10th Grade</MenuItem>
                <MenuItem key="class-11" value="11th">11th Grade</MenuItem>
                <MenuItem key="class-12" value="12th">12th Grade</MenuItem>
              </Select>
            </FormControl>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Present</p>
                <p className="text-3xl font-bold text-green-600">{presentCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Absent</p>
                <p className="text-3xl font-bold text-red-600">{absentCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-red-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Late</p>
                <p className="text-3xl font-bold text-yellow-600">{lateCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Mark Attendance</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.studentId} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{record.studentId}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {record.studentName.charAt(0)}
                        </div>
                        <div className="text-sm font-medium text-gray-800">{record.studentName}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(record.studentId, 'present')}
                          className={`px-3 py-1 text-xs rounded ${
                            record.status === 'present'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleStatusChange(record.studentId, 'absent')}
                          className={`px-3 py-1 text-xs rounded ${
                            record.status === 'absent'
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(record.studentId, 'late')}
                          className={`px-3 py-1 text-xs rounded ${
                            record.status === 'late'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleSaveAttendance}
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
