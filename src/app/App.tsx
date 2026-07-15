import { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import StudentsModule from './components/StudentsModule';
import TeachersModule from './components/TeachersModule';
import CoursesModule from './components/CoursesModule';
import AttendanceModule from './components/AttendanceModule';
import ExamsModule from './components/ExamsModule';
import FeesModule from './components/FeesModule';
import SettingsModule from './components/SettingsModule';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#8b5cf6',
    },
  },
});

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sms_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string, role: string): boolean => {
    // Mock authentication
    const mockUser: User = {
      id: '1',
      name: role === 'admin' ? 'Admin User' : role === 'teacher' ? 'John Teacher' : 'Jane Student',
      email,
      role: role as User['role'],
    };
    setUser(mockUser);
    localStorage.setItem('sms_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute><StudentsModule /></ProtectedRoute>} />
            <Route path="/teachers" element={<ProtectedRoute><TeachersModule /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><CoursesModule /></ProtectedRoute>} />
            <Route path="/attendance" element={<ProtectedRoute><AttendanceModule /></ProtectedRoute>} />
            <Route path="/exams" element={<ProtectedRoute><ExamsModule /></ProtectedRoute>} />
            <Route path="/fees" element={<ProtectedRoute><FeesModule /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsModule /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
