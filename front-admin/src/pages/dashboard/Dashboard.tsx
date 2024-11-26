import { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import adminDashBoard from '../../api/dashboardapi'; 
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import ChartTwo from '../../components/Charts/ChartTwo';
import dashboardapi from '../../api/dashboardapi';

// Define interfaces for type safety
interface ProductData {
  productName: string;
  totalQuantity: number;
}

interface TopSellingProductResponse {
  products: ProductData[];
}

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
  
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [topSellingProducts, setTopSellingProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Separate function for fetching top-selling products with improved error handling
  const fetchTopSellingProducts = async () => {
    try {
      const response: TopSellingProductResponse = await dashboardapi.topSellings();
      
      // Validate response
      if (!response || !response.products || !Array.isArray(response.products)) {
        throw new Error('Invalid response format for top selling products');
      }

      // Sort products by total quantity in descending order and take top 5
      const sortedProducts = response.products
        .sort((a, b) => b.totalQuantity - a.totalQuantity)
        .slice(0, 5);

      setTopSellingProducts(sortedProducts);
    } catch (error) {
      console.error('Error fetching top selling products:', error);
      // Set a user-friendly error message
      setError('Unable to load top selling products. Please try again later.');
    }
  };

  // Main dashboard data fetching function
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch total views (actual data)
      const viewsData = await adminDashBoard.fetchTotalViews();
      setDashboardData(prevData => ({
        ...prevData,
        totalViews: { total: viewsData.total, rate: viewsData.rate },
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

      // Fetch top selling products
      await fetchTopSellingProducts();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100/75">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 bg-black text-white">
        <p>{error}</p>
        <button 
          onClick={fetchDashboardData} 
          className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Order Status Cards */}
        <CardDataStats 
          title="Shipped Orders" 
          total={dashboardData.orderStatusCounts.shipped.count.toString()} 
          icon="shipped"
        />
        <CardDataStats 
          title="Processing Orders" 
          total={dashboardData.orderStatusCounts.processing.count.toString()} 
          icon="processing"
        />
        <CardDataStats 
          title="Delivered Orders" 
          total={dashboardData.orderStatusCounts.delivered.count.toString()} 
          icon="delivered"
        />
        <CardDataStats 
          title="Total Revenue" 
          total={`$${totalRevenue}`} 
          icon="revenue"
        />
      </div>
      <ChartOne revenue={setTotalRevenue} />
      <ChartTwo topSellingProducts={topSellingProducts} />
    </>
  );
};

export default Dashboard;