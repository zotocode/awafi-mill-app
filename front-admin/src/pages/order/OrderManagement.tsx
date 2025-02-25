import { useEffect, useState } from 'react';
import Table, { TableColumn } from '../../components/Tables/Table';
import OrderApi from '../../api/orderapi';
import { OrderStatus, OrderType } from '../../types/orderTypes';
import {
  Eye,
  Package,
  AlertCircle,
  TruckIcon,
  BoxIcon,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
  
} from "lucide-react";
import OrderPreviewModal from '../../components/Modals/OrderPreviewModal';
import { Alert, AlertDescription } from '../../components/Alerts/Alert';
import { toast } from 'react-toastify';
import orderapi from '../../api/orderapi';
import SearchBar from '../../components/Search/SearchBar';

const OrderManagementPage = () => {
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit=25
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [trackingIds, setTrackingIds] = useState<Record<string, string>>({});
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [orderToCancel, setOrderToCancel] = useState<OrderType | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const totalPages = Math.ceil(totalOrders / limit);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);
 
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return <BoxIcon className="w-4 h-4" />;
      case 'shipped':
        return <TruckIcon className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const orderStatusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'processing', label: 'Processing' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'returned', label: 'Returned' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const paymentStatusOptions = [
    { value: '', label: 'All Payment Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
  ];

  const getAvailableStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
    switch (currentStatus) {
      case 'processing':
        return ['processing'];
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
    trackingId?: string,
    reason?: string
  ) => {
    try {
      const response = await OrderApi.updateOrderStatus(
        orderId, 
        newStatus, 
        trackingId,
        reason
      );

      if (response.status === 200) {
        toast.success(`Order status updated to ${newStatus}`);
        setOrderData(prevOrders =>
          prevOrders.map(order =>
            order._id.toString() === orderId
              ? { ...order, orderStatus: newStatus }
              : order
          )
        );
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update order status');
    }
  };

  const handleTrackingIdChange = (orderId: string, value: string) => {
    setTrackingIds((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleConfirmShipping = (orderId: string) => {
    const trackingId = trackingIds[orderId];
    if (trackingId && trackingId.trim()) {
      handleStatusChange(orderId, 'shipped', trackingId.trim());
      setTrackingIds((prev) => {
        const updated = { ...prev };
        delete updated[orderId];
        return updated;
      });
    }
  };

  const handleCancelOrder = async () => {
    if (!orderToCancel || !cancelReason.trim()) return;
    
    try {
      const response = await orderapi.cancelOrder(orderToCancel._id, cancelReason);
      
      if (response.status === 200) {
        setOrderData(prevOrders =>
          prevOrders.map(order =>
            order._id.toString() === orderToCancel._id.toString()
              ? { ...order, orderStatus: "cancelled" }
              : order
          )
        );
        toast.success("Order cancelled successfully");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to cancel order");
    } finally {
      setIsCancelModalOpen(false);
      setOrderToCancel(null);
      setCancelReason('');
    }
  };

  const columns: TableColumn[] = [
    { 
      header: "Order ID", 
      accessor: "_id",
      render: (row: { [key: string]: any }) => (
        <span className="font-mono text-sm text-gray-700">
          {row.orderId}
        </span>
      )
    },
    
    { 
      header: "Amount", 
      accessor: "amount",
      render: (row: { [key: string]: any }) => (
        <span className="font-mono text-sm font-medium">
          {(row.amount || 0).toFixed(2)}  {row.currency}
        </span>
      )
    },
    {
      header: 'Payment Status',
      accessor: 'paymentStatus',
      render: (row: { [key: string]: any }) => (
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${paymentStatusStyles[row.paymentStatus as keyof typeof paymentStatusStyles] || paymentStatusStyles.pending}`}>
            {row.paymentStatus === 'pending' && <AlertTriangle className="inline-block w-4 h-4 mr-1 -mt-1" />}
            {row.paymentStatus === 'completed' && <CheckCircle className="inline-block w-4 h-4 mr-1 -mt-1" />}
            {row.paymentStatus === 'failed' && <XCircle className="inline-block w-4 h-4 mr-1 -mt-1" />}
            {(row.paymentStatus || 'pending').charAt(0).toUpperCase() + (row.paymentStatus || 'pending').slice(1)}
          </span>
        </div>
      )
    },

    {
      header: 'Order Status',
      accessor: 'orderStatus',
      render: (row: { [key: string]: any }) => (
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[row.orderStatus as OrderStatus] || statusStyles.processing}`}>
            {getStatusIcon(row.orderStatus as OrderStatus)}
            <span className="ml-1">
              {(row.orderStatus || 'processing').charAt(0).toUpperCase() + (row.orderStatus || 'processing').slice(1)}
            </span>
          </span>
        </div>
      )
    },
    { 
      header: "Return Request", 
      accessor: "hasReturnRequest",
      render: (row: { [key: string]: any }) => (
        <div className="flex justify-center items-center">
          {row.hasReturnRequest ? (
            <span className="text-green-500 text-sm font-medium">Requested</span>  // "Requested" text for return request
          ) : (
            <span className="text-red-500 text-sm font-medium">Not Requested</span>  // "Not Requested" text when no return request
          )}
        </div>
      )
    }
    
    
  ];

  const onActionReturn = async (
    orderId: string, 
    data: { productId: string; variantId: string; returnStatus: "approved" | "rejected" }
  ) => {
    const { productId, variantId, returnStatus } = data;
  
    // Update the `selectedOrder` state
    if (selectedOrder) {
      const updatedItems = selectedOrder.items.map((item) => {
        if (item.productId === productId && item.variantId === variantId) {
          return { ...item, returnStatus };
        }
        return item;
      });
      setSelectedOrder({ ...selectedOrder, items: updatedItems });
    }
  
    // Update the `orderData` state
    setOrderData((prevOrders) =>
      prevOrders.map((order) => {
        if (order._id.toString() === orderId) {
          return {
            ...order,
            items: order.items.map((item) => {
              if (item.productId === productId && item.variantId === variantId) {
                return { ...item, returnStatus };
              }
              return item;
            }),
          };
        }
        return order;
      })
    );
  
    // Call the API
    const response = await orderapi.actionOnReturnOrder(orderId, data);
  
    // Handle the response
    if (response.status === 200) {
      toast.success(`Order ${returnStatus} successfully`);
    } else {
      toast.error(`Order ${returnStatus} failed`);
    }
  };
  

  const actions = (row: { [key: string]: any }): JSX.Element => {
    const typedRow = row as OrderType;
    const availableStatuses = getAvailableStatuses(typedRow.orderStatus);
    const isProcessingToShipped = typedRow.orderStatus === 'processing';
    const isCancellable = typedRow.orderStatus !== 'cancelled' && typedRow.orderStatus !== 'delivered';
    
    return (
      <div className="flex items-center gap-3">
        {isProcessingToShipped ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={trackingIds[typedRow._id.toString()] || ''}
              onChange={(e) => handleTrackingIdChange(typedRow._id.toString(), e.target.value)}
              placeholder="Enter Tracking ID"
              className="px-3 py-1.5 text-sm border rounded-lg"
            />
            <button
              onClick={() => handleConfirmShipping(typedRow._id.toString())}
              disabled={!trackingIds[typedRow._id.toString()]?.trim()}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                trackingIds[typedRow._id.toString()]?.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <TruckIcon className="inline-block w-4 h-4 mr-1" />
              Confirm Shipping
            </button>
          </div>
        ) : (
          <select
            value={typedRow.orderStatus}
            onChange={(e) => {
              const newStatus = e.target.value as OrderStatus;
              if (newStatus !== 'cancelled') {
                handleStatusChange(typedRow._id.toString(), newStatus);
              }
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

        {isCancellable && (
          <button
            onClick={() => {
              setOrderToCancel(typedRow);
              setIsCancelModalOpen(true);
            }}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
            title="Cancel Order"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsSearching(!!debouncedSearchTerm);
        setError(null);
        
        const response = await OrderApi.getAllOrders(
          currentPage, 
          limit, 
          selectedStatus, 
          selectedPaymentStatus,
          debouncedSearchTerm // Pass the debounced search term
        );
        
        if (response.status === 200) {
          setOrderData(response.data?.orders || []);
          setTotalOrders(response.data.total);
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Failed to fetch orders';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsSearching(false);
      }
    };
    
    fetchOrders();
  }, [currentPage, selectedStatus, selectedPaymentStatus, debouncedSearchTerm, isPreviewModalOpen]);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center space-x-4">
      <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isSearching={isSearching}
              title="Serch order by Id"
            />
        <select
          value={selectedStatus}
          onChange={(e) => {
            setCurrentPage(1); // Reset to first page when changing filter
            setSelectedStatus(e.target.value);
          }}
          className="px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {orderStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={selectedPaymentStatus}
          onChange={(e) => {
            setCurrentPage(1); // Reset to first page when changing filter
            setSelectedPaymentStatus(e.target.value);
          }}
          className="px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {paymentStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {(!orderData || orderData.length === 0) ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No orders found. New orders will appear here when customers place them.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="bg-white rounded-lg ">
          <Table 
            data={orderData} 
            columns={columns}
            actions={actions}
          />
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"} rounded`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"} rounded`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Cancel Order</h3>
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setOrderToCancel(null);
                  setCancelReason('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <textarea
              placeholder="Please provide a reason for cancellation..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full min-h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setOrderToCancel(null);
                  setCancelReason('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCancelOrder}
                disabled={!cancelReason.trim()}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg
                  ${cancelReason.trim()
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-red-300 cursor-not-allowed'}`}
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      <OrderPreviewModal
        order={selectedOrder}
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setSelectedOrder(null);
        }}
        onActionReturn={onActionReturn}
      />
    </div>
  );
};

export default OrderManagementPage;