import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Plus, Search, Edit, Trash2, FileText } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  time: string;
  totalMarks: number;
  passingMarks: number;
  duration: string;
  status: string;
}

interface Result {
  id: string;
  studentName: string;
  examName: string;
  subject: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  status: string;
}

const initialExams: Exam[] = [
  {
    id: 'EXM001',
    name: 'Mid Term Exam',
    subject: 'Computer Science',
    date: '2026-06-15',
    time: '10:00 AM',
    totalMarks: 100,
    passingMarks: 40,
    duration: '3 hours',
    status: 'Scheduled',
  },
  {
    id: 'EXM002',
    name: 'Final Exam',
    subject: 'Mathematics',
    date: '2026-06-20',
    time: '09:00 AM',
    totalMarks: 100,
    passingMarks: 40,
    duration: '3 hours',
    status: 'Scheduled',
  },
];

const initialResults: Result[] = [
  {
    id: 'RES001',
    studentName: 'Emma Watson',
    examName: 'Mid Term Exam',
    subject: 'Computer Science',
    totalMarks: 100,
    obtainedMarks: 85,
    percentage: 85,
    grade: 'A',
    status: 'Pass',
  },
  {
    id: 'RES002',
    studentName: 'James Smith',
    examName: 'Mid Term Exam',
    subject: 'Mathematics',
    totalMarks: 100,
    obtainedMarks: 72,
    percentage: 72,
    grade: 'B',
    status: 'Pass',
  },
];

export default function ExamsModule() {
  const [activeTab, setActiveTab] = useState<'exams' | 'results'>('exams');
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [results, setResults] = useState<Result[]>(initialResults);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentExam, setCurrentExam] = useState<Partial<Exam>>({});

  const handleAddExam = () => {
    setEditMode(false);
    setCurrentExam({ status: 'Scheduled' });
    setOpenDialog(true);
  };

  const handleEditExam = (exam: Exam) => {
    setEditMode(true);
    setCurrentExam(exam);
    setOpenDialog(true);
  };

  const handleDeleteExam = (id: string) => {
    if (confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter((e) => e.id !== id));
    }
  };

  const handleSaveExam = () => {
    if (editMode) {
      setExams(exams.map((e) => (e.id === currentExam.id ? currentExam as Exam : e)));
    } else {
      const newExam = {
        ...currentExam,
        id: `EXM${String(exams.length + 1).padStart(3, '0')}`,
      } as Exam;
      setExams([...exams, newExam]);
    }
    setOpenDialog(false);
    setCurrentExam({});
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C':
        return 'bg-yellow-100 text-yellow-800';
      case 'D':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const filteredExams = exams.filter((exam) =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredResults = results.filter((result) =>
    result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Exams & Results</h1>
          {activeTab === 'exams' && (
            <button
              onClick={handleAddExam}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Exam
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('exams')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'exams'
                    ? 'border-blue-500 text-blue-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Exams
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === 'results'
                    ? 'border-blue-500 text-blue-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Results
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="relative max-w-md mb-6">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {activeTab === 'exams' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Exam ID</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Exam Name</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Subject</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Date</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Time</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Total Marks</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExams.map((exam) => (
                      <tr key={exam.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6 text-sm font-medium text-gray-800">{exam.id}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-800">{exam.name}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{exam.subject}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{exam.date}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{exam.time}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{exam.totalMarks}</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {exam.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditExam(exam)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteExam(exam.id)}
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
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student Name</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Exam</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Subject</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Obtained</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Total</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Percentage</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Grade</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((result) => (
                      <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                              {result.studentName.charAt(0)}
                            </div>
                            <div className="text-sm font-medium text-gray-800">{result.studentName}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-800">{result.examName}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{result.subject}</td>
                        <td className="py-4 px-6 text-sm text-gray-800">{result.obtainedMarks}</td>
                        <td className="py-4 px-6 text-sm text-gray-600">{result.totalMarks}</td>
                        <td className="py-4 px-6 text-sm text-gray-800">{result.percentage}%</td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(
                              result.grade
                            )}`}
                          >
                            {result.grade}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              result.status === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Exam' : 'Create New Exam'}</DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <TextField
              label="Exam Name"
              value={currentExam.name || ''}
              onChange={(e) => setCurrentExam({ ...currentExam, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Subject"
              value={currentExam.subject || ''}
              onChange={(e) => setCurrentExam({ ...currentExam, subject: e.target.value })}
              fullWidth
            />
            <TextField
              label="Date"
              type="date"
              value={currentExam.date || ''}
              onChange={(e) => setCurrentExam({ ...currentExam, date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Time"
              value={currentExam.time || ''}
              onChange={(e) => setCurrentExam({ ...currentExam, time: e.target.value })}
              fullWidth
            />
            <TextField
              label="Total Marks"
              type="number"
              value={currentExam.totalMarks || ''}
              onChange={(e) => setCurrentExam({ ...currentExam, totalMarks: parseInt(e.target.value) })}
              fullWidth
            />
            <TextField
              label="Passing Marks"
              type="number"
              value={currentExam.passingMarks || ''}
              onChange={(e) => setCurrentExam({ ...currentExam, passingMarks: parseInt(e.target.value) })}
              fullWidth
            />
            <TextField
              label="Duration"
              value={currentExam.duration || ''}
              onChange={(e) => setCurrentExam({ ...currentExam, duration: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="exam-status-label">Status</InputLabel>
              <Select
                labelId="exam-status-label"
                value={currentExam.status || ''}
                onChange={(e) => setCurrentExam({ ...currentExam, status: e.target.value })}
                label="Status"
              >
                <MenuItem key="exam-scheduled" value="Scheduled">Scheduled</MenuItem>
                <MenuItem key="exam-ongoing" value="Ongoing">Ongoing</MenuItem>
                <MenuItem key="exam-completed" value="Completed">Completed</MenuItem>
                <MenuItem key="exam-cancelled" value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button onClick={() => setOpenDialog(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSaveExam} variant="contained">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
