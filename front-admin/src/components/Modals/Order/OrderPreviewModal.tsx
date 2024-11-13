import { Dialog } from '@headlessui/react';
import { OrderType } from '../../../types/orderTypes';
import { X } from 'lucide-react';

interface OrderPreviewModalProps {
  order: OrderType | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderPreviewModal: React.FC<OrderPreviewModalProps> = ({ order, isOpen, onClose }) => {
  if (!order) return null;
  console.log("order",order)

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto scrollbar-hide">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b">
            <Dialog.Title className="text-xl font-semibold">
              Order Details #{order._id.toString().slice(-8).toUpperCase()}
            </Dialog.Title>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Order Status */}
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Order Status</h3>
              <div className="flex gap-4">
                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Order: {order.orderStatus}
                </span>
                <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Payment: {order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white p-5 rounded-lg border border-gray-100">
              <h3 className="font-medium text-gray-900 mb-4">Payment Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Amount</p>
                  <p className="font-medium">{order.currency} {order.amount.toFixed(2)}</p>
                </div>
                {order.discountAmount > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Discount</p>
                    <p className="font-medium text-green-600">
                      -{order.currency} {order.discountAmount.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-white p-5 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-4">Shipping Address</h3>
                <div className="space-y-2 text-gray-700">
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

            {/* Order Timeline */}
            <div className="bg-white p-5 rounded-lg border border-gray-100">
              <h3 className="font-medium text-gray-900 mb-4">Order Timeline</h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Created: {new Date(order.createdAt).toLocaleString()}
                </p>
                {order.paymentCompletedAt && (
                  <p className="text-sm text-gray-600">
                    Payment Completed: {new Date(order.paymentCompletedAt).toLocaleString()}
                  </p>
                )}
                {order.deliveredAt && (
                  <p className="text-sm text-gray-600">
                    Delivered: {new Date(order.deliveredAt).toLocaleString()}
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