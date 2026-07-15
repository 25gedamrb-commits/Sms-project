import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Save, Building, Lock, User, Bell } from 'lucide-react';
import { TextField, Button, Switch, FormControlLabel } from '@mui/material';

export default function SettingsModule() {
  const [activeTab, setActiveTab] = useState<'institute' | 'account' | 'notifications'>('institute');
  const [instituteData, setInstituteData] = useState({
    name: 'Central High School',
    email: 'admin@centralschool.edu',
    phone: '+1 234 567 8900',
    address: '123 Education Street, New York, NY 10001',
    website: 'www.centralschool.edu',
  });

  const [accountData, setAccountData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    studentAdmission: true,
    feePayment: true,
    attendanceAlert: false,
    examResults: true,
  });

  const handleSaveInstitute = () => {
    alert('Institute settings saved successfully!');
  };

  const handleSavePassword = () => {
    if (accountData.newPassword !== accountData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    setAccountData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSaveNotifications = () => {
    alert('Notification preferences saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('institute')}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === 'institute'
                    ? 'border-blue-500 text-blue-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Institute Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === 'account'
                    ? 'border-blue-500 text-blue-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Account Security</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'institute' && (
              <div className="max-w-2xl space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Building className="w-12 h-12 text-white" />
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Upload Logo
                  </button>
                </div>

                <TextField
                  label="Institute Name"
                  value={instituteData.name}
                  onChange={(e) => setInstituteData({ ...instituteData, name: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Email"
                  type="email"
                  value={instituteData.email}
                  onChange={(e) => setInstituteData({ ...instituteData, email: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Phone"
                  value={instituteData.phone}
                  onChange={(e) => setInstituteData({ ...instituteData, phone: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Address"
                  value={instituteData.address}
                  onChange={(e) => setInstituteData({ ...instituteData, address: e.target.value })}
                  fullWidth
                  multiline
                  rows={2}
                />
                <TextField
                  label="Website"
                  value={instituteData.website}
                  onChange={(e) => setInstituteData({ ...instituteData, website: e.target.value })}
                  fullWidth
                />

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSaveInstitute}
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="max-w-2xl space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    For security reasons, we recommend using a strong password with at least 8 characters,
                    including uppercase, lowercase, numbers, and special characters.
                  </p>
                </div>

                <TextField
                  label="Current Password"
                  type="password"
                  value={accountData.currentPassword}
                  onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="New Password"
                  type="password"
                  value={accountData.newPassword}
                  onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  value={accountData.confirmPassword}
                  onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                  fullWidth
                />

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSavePassword}
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Channels</h3>
                  <div className="space-y-3">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.emailNotifications}
                          onChange={(e) =>
                            setNotifications({ ...notifications, emailNotifications: e.target.checked })
                          }
                        />
                      }
                      label="Email Notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.smsNotifications}
                          onChange={(e) =>
                            setNotifications({ ...notifications, smsNotifications: e.target.checked })
                          }
                        />
                      }
                      label="SMS Notifications"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Notifications</h3>
                  <div className="space-y-3">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.studentAdmission}
                          onChange={(e) =>
                            setNotifications({ ...notifications, studentAdmission: e.target.checked })
                          }
                        />
                      }
                      label="Student Admission"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.feePayment}
                          onChange={(e) => setNotifications({ ...notifications, feePayment: e.target.checked })}
                        />
                      }
                      label="Fee Payment"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.attendanceAlert}
                          onChange={(e) =>
                            setNotifications({ ...notifications, attendanceAlert: e.target.checked })
                          }
                        />
                      }
                      label="Attendance Alerts"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications.examResults}
                          onChange={(e) => setNotifications({ ...notifications, examResults: e.target.checked })}
                        />
                      }
                      label="Exam Results"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSaveNotifications}
                    className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
