// const handleGenerateReport = async () => {
//   // Validate that the date range is selected for custom reports
//   if (reportType === 'custom' && (!startDate || !endDate)) {
//     setError('Please select both start and end dates.');
//     return;
//   }

//   setLoading(true);
//   setError(null); // Clear any previous errors
//   try {
//     // Fetch the sales report file from the backend
//     const response = await SalesApi.generateSalesReport(reportType, startDate, endDate, { responseType: 'blob' });

//     // Create a URL for the file blob
//     const url = window.URL.createObjectURL(new Blob([response]));

//     // Create an anchor tag to trigger the file download
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'sales_report.xlsx'; // The file name you want the download to have
//     a.click(); // Trigger the download

//     // Revoke the object URL after download
//     window.URL.revokeObjectURL(url);
//   } catch (err) {
//     setError('Failed to fetch sales report. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };


