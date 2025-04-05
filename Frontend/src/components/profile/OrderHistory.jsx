import React, { useState } from 'react';

const OrderHistory = ({ orders }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Order History</h2>

      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
            onClick={() => toggleOrderDetails(order.id)}
          >
            <div>
              <h3 className="font-medium">Order #{order.id}</h3>
              <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-green-500 font-medium">{order.status}</div>
              <div className="font-bold">${order.total.toFixed(2)}</div>
              <div className="text-gray-400">
                {expandedOrderId === order.id ? '▲' : '▼'}
              </div>
            </div>
          </div>

          {expandedOrderId === order.id && (
            <div className="border-t border-gray-200 p-4">
              <h4 className="font-medium mb-2">Items</h4>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="mr-2 font-medium">{item.quantity}×</div>
                    <div>{item.name}</div>
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="flex justify-between mt-4 pt-2 border-t border-gray-200 font-bold">
                <div>Total</div>
                <div>${order.total.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;