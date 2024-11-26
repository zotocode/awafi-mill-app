import { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import adminDashBoard from '../../api/dashboardapi'; 
import LoadingSpinner from '../../components/Spinner/LoadingSpinner';
import ChartTwo from '../../components/Charts/ChartTwo';
import dashboardapi from '../../api/dashboardapi';


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
  const [totalRevenue,setTotalRevenue]=useState<number>(0)
  const [topSellingProduct,setTopSellingProduct]=useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  
useEffect(()=>{
  const fetchTopSellings = async () => {
    try {
      const response=await dashboardapi.topSellings()
      setTopSellingProduct(response.product)
    } catch (error) {
       console.log(`Erro message:${error}`)
    }
  }

  fetchTopSellings()
},[])
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
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100/75">
        <LoadingSpinner />
      </div>
    );
  }

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
          // rate={`${dashboardData.totalProfit.rate}%`}
          // levelUp
        />
      </div>
      <ChartOne revenue={setTotalRevenue} />
      <ChartTwo  />
    </>
  );
};

export default Dashboard;