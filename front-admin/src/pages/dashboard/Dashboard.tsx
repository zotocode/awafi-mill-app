import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChartThree from '../../components/Charts/ChartThree';
import adminDashBoard from '../../api/adminDashBoard';

const Dashboard = () => {
  // State to store fetched data
  const [dashboardData, setDashboardData] = useState({
    totalViews: { total: 0, rate: 0 },
    totalProfit: { total: 0, rate: 0 },
    totalProducts: { total: 0, rate: 0 },
    orderStatusCounts: {
      shipped: { count: 0, amount: 0 },
      processing: { count: 0, amount: 0 },
      delivered: { count: 0, amount: 0 },
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors before a new request

      // Fetch total views (actual data)
      const viewsData = await adminDashBoard.fetchTotalViews();
      setDashboardData(prevData => ({
        ...prevData,
        totalViews: { total: viewsData.total, rate: viewsData.rate },
      }));

      // Dummy data for total profit and products
      setDashboardData(prevData => ({
        ...prevData,
        totalProfit: { total: 5000, rate: 10 },
        totalProducts: { total: 200, rate: 5 },
      }));

      // Fetch order status data
      const orderStatusResponse = await adminDashBoard.fetchTotalViews();
      const orderStatusTypes = ['shipped', 'processing', 'delivered'] as const;
      type OrderStatusType = typeof orderStatusTypes[number];
      interface Order {
        orderStatus: OrderStatusType;
        totalCount: number;
        totalAmount: number;
      }
      const orderCounts: Record<OrderStatusType, { count: number; amount: number }> = {
        shipped: { count: 0, amount: 0 },
        processing: { count: 0, amount: 0 },
        delivered: { count: 0, amount: 0 },
      };

      orderStatusResponse.data.forEach((order: Order) => {
        if (orderStatusTypes.includes(order.orderStatus)) {
          orderCounts[order.orderStatus].count += order.totalCount;
          orderCounts[order.orderStatus].amount += order.totalAmount;
        }
      });

      // Update order status counts in state
      setDashboardData(prevData => ({
        ...prevData,
        orderStatusCounts: orderCounts,
      }));
    } catch (error) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Order Status Cards */}
        <CardDataStats title="Shipped Orders" total={dashboardData.orderStatusCounts.shipped.count.toString()} />
        <CardDataStats title="Processing Orders" total={dashboardData.orderStatusCounts.processing.count.toString()} />
        <CardDataStats title="Delivered Orders" total={dashboardData.orderStatusCounts.delivered.count.toString()} />
      </div>
      <ChartOne />
      <ChartTwo />
      <ChartThree />
    </>
  );
};

export default Dashboard;
