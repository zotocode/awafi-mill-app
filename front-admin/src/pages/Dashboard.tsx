import { Line, Pie } from 'react-chartjs-2'; 
import adminDashBoard from '../api/adminDashBoard';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useEffect, useState } from 'react'; // Import hooks
import axios from 'axios'; // Import axios for API calls

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // State to hold order data
  const [orderData, setOrderData] = useState({
    labels: ['Delivered', 'Cancelled', 'shipped'],
    datasets: [
      {
        label: 'Orders',
        data: [0, 0, 0], // Initialize with zeros
        backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
        hoverBackgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
      },
    ],
  });

  // Sample product data
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [5000, 10000, 7500, 12000, 9000, 15000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Fetch order data from the API
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await adminDashBoard.orderStatus() // Adjust the API URL as needed
        const deliveredCount = response.data.delivered; // Assuming the response has a 'delivered' field
        const cancelledCount = response.data.cancelled; // Assuming the response has a 'cancelled' field
        const shippedCount = response.data.shipped; // Assuming the response has a 'pending' field
         console.log('====================================');
         console.log(response);
         console.log('====================================');
        // Update the pie chart data
        setOrderData({
          labels: ['Delivered', 'Cancelled', 'Pending'],
          datasets: [
            {
              label: 'Orders',
              data: [deliveredCount, cancelledCount, shippedCount],
              backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
              hoverBackgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Key Metrics */}
      <div className="p-4 sm:ml-64 mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Delivered</h3>
          <p className="text-2xl">{0}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Cancelled Orders</h3>
          <p className="text-2xl">{0}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Shipped Orders</h3>
          <p className="text-2xl">{0}</p>
        </div>
      </div>

      {/* Sales Graph */}
      <div className="p-4 sm:ml-64">
        <div className="h-64 w-full bg-white shadow-md p-4 rounded-lg">
          <Line data={salesData} />
        </div>
      </div>

      {/* Sales Report */}
      <div className="p-4 sm:ml-64 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Sales Report</h3>
          <p>Total Sales: $150,000</p>
          <p>Average Order Value: $125</p>
          <p>Total Products Sold: 1,200</p>
          <p>Top Performing Product: Apple MacBook Pro</p>
        </div>

        {/* Pie Chart for Orders */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Order Status</h3>
          <Pie data={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
