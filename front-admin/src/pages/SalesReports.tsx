// import { useState } from 'react';
// import SalesApi from '../api/SalesApi';

// const SalesReport = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [reportType, setReportType] = useState('weekly');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>('');

//   // Function to generate the report and get the download link
//   const handleGenerateReport = async () => {
//     // Validate that the date range is selected for custom reports
//     if (reportType === 'custom' && (!startDate || !endDate)) {
//       setError('Please select both start and end dates.');
//       return;
//     }

//     setLoading(true);
//     setError(null); // Clear any previous errors
//     try {
//       // Fetch the sales report file from the backend
//       const response = await SalesApi.generateSalesReport(reportType, startDate, endDate, { responseType: 'blob' });

//       // Create a URL for the file blob
//       const url = window.URL.createObjectURL(new Blob([response.data]));
      
//       // Create an anchor tag to trigger the file download
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'sales_report.xlsx'; // The file name you want the download to have
//       a.click(); // Trigger the download

//       // Revoke the object URL after download
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       setError('Failed to fetch sales report. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReportTypeChange = (e: any) => {
//     const value = e.target.value;
//     setReportType(value);
//   };

//   return (
//     <div className="p-8 max-w-7xl mx-auto space-y-8">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Sales Report</h1>
//           <p className="text-gray-500 mt-1">Select the date range and report type to generate a report</p>
//         </div>
//       </div>

//       {/* Report Settings */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold text-gray-900">Report Settings</h2>
//             <p className="text-sm text-gray-500">Configure your report parameters</p>
//           </div>
//           <div className="space-y-4">
//             <label className="block text-sm font-medium text-gray-700">Report Type</label>
//             <select value={reportType} onChange={handleReportTypeChange} className="w-full border border-gray-300 rounded-lg p-2">
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//               <option value="custom">Custom Range</option>
//             </select>

//             {/* Custom Date Range */}
//             {reportType === 'custom' && (
//               <div className="space-y-4 mt-4">
//                 <label className="block text-sm font-medium text-gray-700">Start Date</label>
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 />
//                 <label className="block text-sm font-medium text-gray-700">End Date</label>
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 />
//               </div>
//             )}

//             <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg mt-4" onClick={handleGenerateReport}>
//               {loading ? 'Generating...' : 'Generate Report'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Error or Success */}
//       {error && <p className="text-red-500">{error}</p>}
//     </div>
//   );
// };

// export default SalesReport;

// import React from "react";

function SalesReports() {
  return <div>SalesReports</div>;
}

export default SalesReports;
