import React, { useState } from 'react';
import SalesApi from '../api/SalesApi';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const SalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('weekly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to generate the report
  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await SalesApi.generateSalesReport(reportType, startDate, endDate);
      setChartData(data.salesData);
      console.log(`Generated ${reportType} report from ${startDate} to ${endDate}`);
    } catch (err) {
    //   setError('Failed to fetch sales report. Please try again.');
    
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (format:any) => {
    console.log(`Downloading report in ${format} format`);
    // Implement download functionality here if needed
  };

  const handleReportTypeChange = (e:any) => {
    const value = e.target.value;
    setReportType(value);
    if (value === 'custom') {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Report</h1>
          <p className="text-gray-500 mt-1">View and analyze your sales data</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleDownload('excel')} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Export to Excel
          </button>
          <button onClick={() => handleDownload('pdf')} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Export to PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Report Settings</h2>
            <p className="text-sm text-gray-500">Configure your report parameters</p>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select value={reportType} onChange={handleReportTypeChange} className="w-full border border-gray-300 rounded-lg p-2">
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleGenerateReport}>
              Generate Report
            </button>
          </div>
        </div>

        {/* Summary Statistics Cards */}
        {/* Additional summary cards can be placed here */}  
        
        {/* Summary Statistics Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Total Sales</h2>
            <p className="text-sm text-gray-500">Current period</p>
          </div>
          <div className="text-3xl font-bold text-gray-900">$12,345.67</div>
          <p className="text-sm text-green-600 mt-2">↑ 12.5% from last period</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
            <p className="text-sm text-gray-500">Current period</p>
          </div>
          <div className="text-3xl font-bold text-gray-900">456</div>
          <p className="text-sm text-green-600 mt-2">↑ 8.3% from last period</p>
        </div>
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-lg shadow p-6 md:col-span-3">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sales Trend</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Select Custom Date Range</h3>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
            <label className="block text-sm font-medium text-gray-700 mt-4">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
              <button onClick={() => { handleGenerateReport(); setIsModalOpen(false); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Apply Range</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesReport;
