import DashboardLayout from './DashboardLayout';
import { Users, GraduationCap, BookOpen, CheckCircle, DollarSign, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statsCards = [
  { title: 'Total Students', value: '1,245', icon: Users, color: 'bg-blue-500', change: '+12%' },
  { title: 'Total Teachers', value: '87', icon: GraduationCap, color: 'bg-green-500', change: '+5%' },
  { title: 'Total Courses', value: '42', icon: BookOpen, color: 'bg-purple-500', change: '+3%' },
  { title: 'Present Today', value: '1,156', icon: CheckCircle, color: 'bg-cyan-500', change: '92.8%' },
  { title: 'Pending Fees', value: '$45,280', icon: DollarSign, color: 'bg-orange-500', change: '-8%' },
  { title: 'Total Revenue', value: '$284,500', icon: TrendingUp, color: 'bg-pink-500', change: '+18%' },
];

const studentGrowthData = [
  { month: 'Jan', students: 980 },
  { month: 'Feb', students: 1020 },
  { month: 'Mar', students: 1050 },
  { month: 'Apr', students: 1100 },
  { month: 'May', students: 1180 },
  { month: 'Jun', students: 1245 },
];

const attendanceData = [
  { day: 'Mon', present: 1150, absent: 95 },
  { day: 'Tue', present: 1160, absent: 85 },
  { day: 'Wed', present: 1140, absent: 105 },
  { day: 'Thu', present: 1170, absent: 75 },
  { day: 'Fri', present: 1156, absent: 89 },
];

const feesData = [
  { name: 'Paid', value: 890, color: '#22c55e' },
  { name: 'Pending', value: 245, color: '#f59e0b' },
  { name: 'Overdue', value: 110, color: '#ef4444' },
];

const recentStudents = [
  { id: 'STU001', name: 'Emma Watson', course: 'Computer Science', class: '10th', status: 'Active' },
  { id: 'STU002', name: 'James Smith', course: 'Mathematics', class: '9th', status: 'Active' },
  { id: 'STU003', name: 'Sophia Johnson', course: 'Physics', class: '11th', status: 'Active' },
  { id: 'STU004', name: 'Michael Brown', course: 'Chemistry', class: '10th', status: 'Active' },
  { id: 'STU005', name: 'Olivia Davis', course: 'Biology', class: '12th', status: 'Active' },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Growth Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studentGrowthData} id="student-growth-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} name="Students" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Attendance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData} id="attendance-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#22c55e" name="Present" />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fees Collection Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fees Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart id="fees-chart">
                <Pie
                  data={feesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {feesData.map((entry) => (
                    <Cell key={`fees-cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Students */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Students</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Course</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Class</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-800">{student.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-800">{student.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{student.course}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{student.class}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
