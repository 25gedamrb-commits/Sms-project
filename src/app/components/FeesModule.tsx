import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Plus, Search, Download, CreditCard } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  totalFees: number;
  paidAmount: number;
  remainingAmount: number;
  lastPaymentDate: string;
  paymentMethod: string;
  status: string;
}

const initialFees: FeeRecord[] = [
  {
    id: 'FEE001',
    studentId: 'STU001',
    studentName: 'Emma Watson',
    course: 'Computer Science',
    totalFees: 15000,
    paidAmount: 10000,
    remainingAmount: 5000,
    lastPaymentDate: '2026-05-15',
    paymentMethod: 'Credit Card',
    status: 'Partial',
  },
  {
    id: 'FEE002',
    studentId: 'STU002',
    studentName: 'James Smith',
    course: 'Mathematics',
    totalFees: 12000,
    paidAmount: 12000,
    remainingAmount: 0,
    lastPaymentDate: '2026-05-01',
    paymentMethod: 'Bank Transfer',
    status: 'Paid',
  },
  {
    id: 'FEE003',
    studentId: 'STU003',
    studentName: 'Sophia Johnson',
    course: 'Physics',
    totalFees: 13500,
    paidAmount: 5000,
    remainingAmount: 8500,
    lastPaymentDate: '2026-04-20',
    paymentMethod: 'Cash',
    status: 'Partial',
  },
];

export default function FeesModule() {
  const [fees, setFees] = useState<FeeRecord[]>(initialFees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<{
    feeId: string;
    amount: number;
    method: string;
    date: string;
  }>({
    feeId: '',
    amount: 0,
    method: 'Cash',
    date: new Date().toISOString().split('T')[0],
  });

  const handleAddPayment = (feeRecord: FeeRecord) => {
    setCurrentPayment({
      feeId: feeRecord.id,
      amount: 0,
      method: 'Cash',
      date: new Date().toISOString().split('T')[0],
    });
    setOpenDialog(true);
  };

  const handleSavePayment = () => {
    setFees(
      fees.map((fee) => {
        if (fee.id === currentPayment.feeId) {
          const newPaidAmount = fee.paidAmount + currentPayment.amount;
          const newRemainingAmount = fee.totalFees - newPaidAmount;
          return {
            ...fee,
            paidAmount: newPaidAmount,
            remainingAmount: newRemainingAmount,
            lastPaymentDate: currentPayment.date,
            paymentMethod: currentPayment.method,
            status: newRemainingAmount === 0 ? 'Paid' : 'Partial',
          };
        }
        return fee;
      })
    );
    setOpenDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFees = fees.filter((fee) => {
    const matchesSearch =
      fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || fee.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = fees.reduce((sum, fee) => sum + fee.paidAmount, 0);
  const totalPending = fees.reduce((sum, fee) => sum + fee.remainingAmount, 0);
  const totalFees = fees.reduce((sum, fee) => sum + fee.totalFees, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Fees Management</h1>
          <button className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Fees</p>
                <p className="text-3xl font-bold text-blue-600">${totalFees.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Collected</p>
                <p className="text-3xl font-bold text-green-600">${totalCollected.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-orange-600">${totalPending.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by student name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Course</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Total Fees</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Paid</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Remaining</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Last Payment</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFees.map((fee) => (
                  <tr key={fee.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{fee.studentId}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {fee.studentName.charAt(0)}
                        </div>
                        <div className="text-sm font-medium text-gray-800">{fee.studentName}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{fee.course}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">${fee.totalFees.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-green-600">${fee.paidAmount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-orange-600">${fee.remainingAmount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{fee.lastPaymentDate}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(fee.status)}`}>
                        {fee.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleAddPayment(fee)}
                        disabled={fee.remainingAmount === 0}
                        className="inline-flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Payment</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-4">
            <TextField
              label="Payment Amount"
              type="number"
              value={currentPayment.amount}
              onChange={(e) =>
                setCurrentPayment({ ...currentPayment, amount: parseFloat(e.target.value) || 0 })
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="payment-method-label">Payment Method</InputLabel>
              <Select
                labelId="payment-method-label"
                value={currentPayment.method}
                onChange={(e) => setCurrentPayment({ ...currentPayment, method: e.target.value })}
                label="Payment Method"
              >
                <MenuItem key="method-cash" value="Cash">Cash</MenuItem>
                <MenuItem key="method-credit" value="Credit Card">Credit Card</MenuItem>
                <MenuItem key="method-debit" value="Debit Card">Debit Card</MenuItem>
                <MenuItem key="method-bank" value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem key="method-online" value="Online Payment">Online Payment</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Payment Date"
              type="date"
              value={currentPayment.date}
              onChange={(e) => setCurrentPayment({ ...currentPayment, date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button onClick={() => setOpenDialog(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSavePayment} variant="contained">
              Save Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
