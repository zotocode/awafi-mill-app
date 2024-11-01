import { useEffect, useState } from 'react';
import Table, { TableColumn } from '../../components/Tables/Table';
import OrderApi from '../../api/orderapi';
import { OrderStatus, OrderType } from '../../types/orderTypes';
import {
  Trash2,
  Eye,
  Package,
  AlertCircle
} from "lucide-react";
import OrderPreviewModal from '../../components/Modals/Order/OrderPreviewModal';
import { Alert, AlertDescription } from '../../components/Alerts/Alert';

const OrderManagementPage = () => {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [trackingId, setTrackingId] = useState<string>('');

  const getAvailableStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
    switch (currentStatus) {
      case 'processing':
        return ['processing', 'cancelled'];
      case 'shipped':
        return ['shipped', 'delivered'];
      case 'delivered':
        return ['delivered'];
      case 'cancelled':
        return ['cancelled'];
      default:
        return ['processing'];
    }
  };

  const statusStyles = {
    processing: 'bg-amber-100 text-amber-800 border border-amber-200',
    shipped: 'bg-blue-100 text-blue-800 border border-blue-200',
    delivered: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    cancelled: 'bg-red-100 text-red-800 border border-red-200',
  };

  const paymentStatusStyles = {
    pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    completed: 'bg-green-100 text-green-800 border border-green-200',
    failed: 'bg-red-100 text-red-800 border border-red-200',
  };

  const handleStatusChange = async (
    orderId: string, 
    newStatus: OrderStatus,
    trackingId?: string
  ) => {
    try {
      console.log('Updating status:', { orderId, newStatus, trackingId });
      
      const response = await OrderApi.updateOrderStatus(
        orderId, 
        newStatus, 
        trackingId
      );

      if (response.status === 200) {
        console.log("Order status updated successfully:", response.data);
        setOrderData(prevOrders =>
          prevOrders.map(order =>
            order._id.toString() === orderId
              ? { ...order, orderStatus: newStatus }
              : order
          )
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const columns: TableColumn[] = [
    { 
      header: "Order ID", 
      accessor: "_id",
      render: (row: { [key: string]: any }) => (
        <span className="font-mono text-sm text-gray-700">
          {row._id.toString().slice(-8).toUpperCase()}
        </span>
      )
    },
    { 
      header: "Amount", 
      accessor: "amount",
      render: (row: { [key: string]: any }) => (
        <span className="font-mono text-sm font-medium">
          ${row.amount.toFixed(2)}
        </span>
      )
    },
    {
      header: 'Payment Status',
      accessor: 'paymentStatus',
      render: (row: { [key: string]: any }) => (
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${paymentStatusStyles[row.paymentStatus as keyof typeof paymentStatusStyles]}`}>
            {row.paymentStatus.charAt(0).toUpperCase() + row.paymentStatus.slice(1)}
          </span>
        </div>
      )
    },
    {
      header: 'Order Status',
      accessor: 'orderStatus',
      render: (row: { [key: string]: any }) => (
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[row.orderStatus as OrderStatus]}`}>
            <Package className="inline-block w-4 h-4 mr-1 -mt-1" />
            {row.orderStatus.charAt(0).toUpperCase() + row.orderStatus.slice(1)}
          </span>
        </div>
      )
    },
  ];

  const actions = (row: { [key: string]: any }): JSX.Element => {
    const typedRow = row as OrderType;
    const availableStatuses = getAvailableStatuses(typedRow.orderStatus);
    const isProcessingToShipped = typedRow.orderStatus === 'processing';
    
    const [localTrackingId, setLocalTrackingId] = useState('');
    
    const handleStatusChangeWithTracking = async (newStatus: OrderStatus) => {
      if (newStatus === 'shipped' && !localTrackingId.trim()) {
        alert('Please enter a tracking ID');
        return;
      }
      await handleStatusChange(
        typedRow._id.toString(), 
        newStatus, 
        newStatus === 'shipped' ? localTrackingId : undefined
      );
    };

    return (
      <div className="flex items-center gap-3">
        {isProcessingToShipped ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={localTrackingId}
              onChange={(e) => {
                console.log('Tracking ID changed:', e.target.value);
                setLocalTrackingId(e.target.value);
                setTrackingId(e.target.value);
              }}
              placeholder="Enter Tracking ID"
              className="px-3 py-1.5 text-sm border rounded-lg"
            />
            <button
              onClick={() => {
                console.log('Shipping confirmation clicked', {
                  orderId: typedRow._id.toString(),
                  trackingId: localTrackingId
                });
                handleStatusChange(typedRow._id.toString(), 'shipped');
              }}
              disabled={!localTrackingId.trim()}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors
                ${localTrackingId.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              Confirm Shipping
            </button>
          </div>
        ) : (
          <select
            value={typedRow.orderStatus}
            onChange={(e) => {
              const newStatus = e.target.value as OrderStatus;
              console.log('Status change selected:', newStatus);
              handleStatusChangeWithTracking(newStatus);
            }}
            className="rounded-lg px-3 py-1.5 text-sm border border-gray-300 bg-white text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:bg-gray-50 disabled:text-gray-500"
            disabled={availableStatuses.length === 1}
          >
            {availableStatuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => {
            setSelectedOrder(typedRow);
            setIsPreviewModalOpen(true);
          }}
          className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
          title="Preview Order"
        >
          <Eye className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this order?')) {
              // handleDeleteOrder(typedRow._id.toString())
            }
          }}
          className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
          title="Delete Order"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderApi.getAllOrders();
        if (response.status === 200) {
          console.log(response.data.orders)
          setOrderData(response.data.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Order Management</h1>
        <p className="text-sm text-gray-600">Manage and track all orders in one place</p>
      </div>

      {orderData.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No orders found. New orders will appear here when customers place them.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <Table 
            data={orderData} 
            columns={columns}
            actions={actions}
          />
        </div>
      )}

      <OrderPreviewModal
        order={selectedOrder}
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
};

export default OrderManagementPage;