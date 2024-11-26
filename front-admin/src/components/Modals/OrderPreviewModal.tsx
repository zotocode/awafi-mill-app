import { Dialog } from '@headlessui/react';
import { OrderType } from '../../types/orderTypes';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface OrderPreviewModalProps {
  order: OrderType | null;
  isOpen: boolean;
  onClose: () => void;
  onActionReturn: (orderId: string, data: {productId:string,variantId:string,returnStatus:'approved'| 'rejected'}) => Promise<void>;
  
}

const OrderPreviewModal: React.FC<OrderPreviewModalProps> = ({ 
  order, 
  isOpen, 
  onClose,
  onActionReturn,
  
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'returns'>('details');
  
  if (!order) return null;

  const hasReturnRequests = order.items.some(item => item.returnStatus === 'requested');

   const renderReturnStatus = (status?: string) => {
    switch(status) {
      case 'requested':
        return <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full">Return Requested</span>;
      case 'approved':
        return <span className="px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full">Return Approved</span>;
      case 'rejected':
        return <span className="px-3 py-1 text-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full">Return Rejected</span>;
      default:
        return null;
    }
  };

  const renderReturnActions = (itemId: string) => {
    const item = order.items.find(i => i.productId === itemId);
    if (item?.returnStatus === 'requested') {
      return (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onActionReturn?.(order._id.toString(), {productId:item.productId,variantId:item.variantId,returnStatus:'approved'})}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-800 rounded-full transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Approve Return
          </button>
          <button
            onClick={() => onActionReturn?.(order._id.toString(), {productId:item.productId,variantId:item.variantId,returnStatus:'rejected'})}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-800 rounded-full transition-colors"
          >
            <XCircle className="w-4 h-4" />
            Reject Return
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg p-6 max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white dark:bg-gray-800 z-10 pb-4 border-b border-gray-300 dark:border-gray-700">
            <div>
              <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Details #{order._id.toString().slice(-8).toUpperCase()}
              </Dialog.Title>
              {hasReturnRequests && (
                <span className="mt-2 inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded-full">
                  Return Request Pending
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'details' 
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('returns')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    activeTab === 'returns' 
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  Returns
                </button>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
            {activeTab === 'details' ? (
              <>
                {/* Order Status */}
                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Order Status</h3>
                  <div className="flex gap-4 flex-wrap">
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                      Order: {order.orderStatus}
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-100 dark:border-gray-600">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">Payment Information</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                      <p className="font-medium text-gray-900 dark:text-white">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.currency} {order.amount.toFixed(2)}
                      </p>
                    </div>
                    {order.discountAmount > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Discount</p>
                        <p className="font-medium text-green-600 dark:text-green-400">
                          -{order.currency} {order.discountAmount.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-100 dark:border-gray-600">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">Shipping Address</h3>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p className="font-medium">{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.phone}</p>
                      <p>{order.shippingAddress.addressLine1}</p>
                      {order.shippingAddress.addressLine2 && (
                        <p>{order.shippingAddress.addressLine2}</p>
                      )}
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-100 dark:border-gray-600">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex justify-between items-start border-b pb-4">
                        <div className="flex gap-4">
                          <img src={item.images} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Weight: {item.weight}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                            {renderReturnStatus(item.returnStatus)}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {order.currency} {item.price * item.quantity}
                          </p>
                          {renderReturnActions(item.productId)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-100 dark:border-gray-600">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">Order Timeline</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Created: {new Date(order.createdAt).toLocaleString()}
                    </p>
                    {order.paymentStatus === 'completed' && order.paymentCompletedAt && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Payment Completed: {new Date(order.paymentCompletedAt).toLocaleString()}
                      </p>
                    )}
                    {order.orderStatus === 'delivered' && order.deliveredAt && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Delivered: {new Date(order.deliveredAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-100 dark:border-gray-600">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">Important Details</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      trackingId: {order.trackingId ?order.trackingId :"Nil"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      trackingId: {order.transactionId ?order.transactionId :"Nil"}
                    </p>
                   
                  </div>
                </div>
              </>
            ) : (
              // Returns Tab
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-700 p-5 rounded-lg border border-gray-100 dark:border-gray-600">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">Return Requests</h3>
                
                  {order.items.filter(item => item.returnStatus !== 'not_requested').length > 0 ? (
                    <div className="space-y-6">
                      {order.items.filter(item => item.returnStatus !== 'not_requested').map((item) => (
                        <div key={item.productId} className="flex gap-4 pb-4 border-b last:border-0">
                          <img src={item.images} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Return Quantity: {item.returnQuantity} of {item.quantity}
                                </p>
                              </div>
                              {renderReturnStatus(item.returnStatus)}
                            </div>
                            {item.returnReason && (
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Return Reason:</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.returnReason}</p>
                              </div>
                            )}
                            {renderReturnActions(item.productId)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No return requests for this order.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default OrderPreviewModal;