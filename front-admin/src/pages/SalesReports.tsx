import { useState } from 'react';
import salesReportApiInstance from '../api/SalesApi';
import { ClipLoader } from 'react-spinners'; // You can install this package if you prefer a spinner

const SalesReportPage = () => {
  const [reportType, setReportType] = useState('weekly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesSummary, setSalesSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [downloadloading, setDownloadLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await salesReportApiInstance.generateSalesReport({ reportType, startDate, endDate });
      setSalesSummary(data);
    } catch (err) {
      setError('Failed to fetch the sales report.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {

    setDownloadLoading(true);
    setError('');

    try {
      const blobData = await salesReportApiInstance.downloadSalesReport({ reportType, startDate, endDate });
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sales_report.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Failed to download the report.');
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Sales Report Generator</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
              <option value="yearly">Yearly Report</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Custom Date Range */}
          {reportType === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Generate Report Button */}
        <div className="mt-6">
          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <ClipLoader size={20} color="#fff" loading={loading} />
            ) : (
              'Generate Sales Report'
            )}
          </button>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Sales Summary Preview */}
        {salesSummary && (
          <div className="mt-6 bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Sales Summary</h2>

            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800">Report Period</h3>
              <p className="text-sm text-gray-600">
                {new Date(salesSummary.reportPeriod.startDate).toLocaleDateString()} to{' '}
                {new Date(salesSummary.reportPeriod.endDate).toLocaleDateString()}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800">Sales Overview</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li>Total Revenue: ${salesSummary.totalRevenue}</li>
                <li>Total Quantity Sold: {salesSummary.totalQuantitySold}</li>
                <li>Average Order Value: ${salesSummary.averageOrderValue.toFixed(2)}</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800">Top Selling Products</h3>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Product Name</th>
                    <th className="px-4 py-2 border-b text-left">Quantity Sold</th>
                    <th className="px-4 py-2 border-b text-left">Total Revenue</th>
                    <th className="px-4 py-2 border-b text-left">Average Price</th>
                  </tr>
                </thead>
                <tbody>
                  {salesSummary.topSellingProducts.map((product: any) => (
                    <tr key={product.productId}>
                      <td className="px-4 py-2 border-b">{product.productName}</td>
                      <td className="px-4 py-2 border-b">{product.quantity}</td>
                      <td className="px-4 py-2 border-b">${product.totalRevenue}</td>
                      <td className="px-4 py-2 border-b">${product.averagePrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              {/* <button
                onClick={handleDownloadReport}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Download Report as Excel
              </button> */}
              <div className="mt-6">
                <button
                  onClick={handleDownloadReport}
                  disabled={downloadloading}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  {downloadloading ? (
                    <ClipLoader size={20} color="#fff" loading={downloadloading} />
                  ) : (
                    'Download Sales Report'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReportPage;
