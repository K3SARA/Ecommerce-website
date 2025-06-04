import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, Users, DollarSign, Star, Eye, Edit, Trash2 } from 'lucide-react';

const OrderList = () => {
    // Dummy data for demonstration. In a real app, this would come from Firestore.
    const [orders, setOrders] = useState([
        {
            id: 'ORD001',
            customerName: 'Alice Johnson',
            orderDate: '2023-10-26',
            totalAmount: 150.75,
            status: 'Pending',
            items: [{ productId: '01', name: 'Luxury Sound Headphones', quantity: 1 }],
        },
        {
            id: 'ORD002',
            customerName: 'Bob Williams',
            orderDate: '2023-10-25',
            totalAmount: 49.99,
            status: 'Shipped',
            items: [{ productId: '02', name: 'Elegant Silk Scarf', quantity: 1 }],
        },
        {
            id: 'ORD003',
            customerName: 'Charlie Brown',
            orderDate: '2023-10-24',
            totalAmount: 220.00,
            status: 'Processing',
            items: [
                { productId: '01', name: 'Luxury Sound Headphones', quantity: 1 },
                { productId: '03', name: 'Artisan Ceramic Vase', quantity: 2 },
            ],
        },
    ]);

    // Simulate fetching data
    useEffect(() => {
        // In a real application, you would fetch data from Firestore here.
        // For example:
        // const fetchOrders = async () => {
        //     const ordersCollection = collection(db, "orders");
        //     const q = query(ordersCollection, orderBy("orderDate", "desc")); // Example query
        //     const querySnapshot = await getDocs(q);
        //     const fetchedOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //     setOrders(fetchedOrders);
        // };
        // fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'text-yellow-400 bg-yellow-900/20';
            case 'Processing': return 'text-blue-400 bg-blue-900/20';
            case 'Shipped': return 'text-green-400 bg-green-900/20';
            case 'Delivered': return 'text-purple-400 bg-purple-900/20';
            case 'Cancelled': return 'text-red-400 bg-red-900/20';
            default: return 'text-gray-400 bg-gray-700/20';
        }
    };

    const handleViewOrder = (orderId) => {
        alert(`Viewing order: ${orderId}`);
        // In a real app, navigate to a detailed order view page
    };

    const handleEditOrder = (orderId) => {
        alert(`Editing order: ${orderId}`);
        // In a real app, navigate to an order edit form
    };

    const handleDeleteOrder = (orderId) => {
        if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
            setOrders(orders.filter(order => order.id !== orderId));
            alert(`Order ${orderId} deleted.`);
            // In a real app, delete from Firestore
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Order Management</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-600 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.customerName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.orderDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300">${order.totalAmount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleViewOrder(order.id)}
                                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                                title="View Order"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleEditOrder(order.id)}
                                                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                                                title="Edit Order"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                                title="Delete Order"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-400">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
