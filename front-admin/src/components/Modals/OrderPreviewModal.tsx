import { Dialog } from '@headlessui/react';
import { OrderType } from '../../types/orderTypes';
import { X } from 'lucide-react';

interface OrderPreviewModalProps {
  order: OrderType | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderPreviewModal: React.FC<OrderPreviewModalProps> = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl bg-white dark:bg-gray-800 rounded-lg p-6 max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white dark:bg-gray-800 z-10 pb-4 border-b border-gray-300 dark:border-gray-700">
            <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
              Order Details #{order._id.toString().slice(-8).toUpperCase()}
            </Dialog.Title>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
            {/* Order Status */}
            <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Order Status</h3>
              <div className="flex gap-4">
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
                  <p className="font-medium text-gray-900 dark:text-white">{order.currency} {order.amount.toFixed(2)}</p>
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
                  <div key={item.productId} className="flex justify-between items-center border-b pb-4">
                    <div className="flex gap-4">
                      <img src={item.images} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Variant: {item.variantId}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Weight: {item.weight}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                      <p className="font-medium text-gray-900 dark:text-white">{order.currency} {item.inPrice * item.quantity}</p>
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
                {order.orderStatus === 'delivered' && order.updatedAt && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Delivered: {new Date(order.updatedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default OrderPreviewModal;
