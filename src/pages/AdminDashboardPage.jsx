import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Package, Loader2, ChevronDown, ChevronUp, Image } from 'lucide-react';
import { fetchAdminOrders, adminLogout, isAdminLoggedIn } from '../api';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin', { replace: true });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchAdminOrders();
        if (!cancelled) setOrders(data.orders || []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load orders');
          if (err.message === 'Session expired') navigate('/admin', { replace: true });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin', { replace: true });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });
  };

  const formatAmount = (amount, currency = 'pkr') => {
    if (amount == null) return '—';
    if (currency === 'pkr') return `Rs. ${(Number(amount) / 100).toLocaleString()}`;
    return `${(Number(amount) / 100).toLocaleString()} ${currency.toUpperCase()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-biomed-teal animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-biomed-navy" />
            <h1 className="text-xl font-bold text-gray-900">Orders Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/banners" className="text-sm text-gray-600 hover:text-biomed-teal flex items-center gap-1">
              <Image size={16} />
              Banners
            </Link>
            <Link to="/" className="text-sm text-gray-600 hover:text-biomed-teal">View store</Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
        )}

        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">All orders</h2>
            <p className="text-sm text-gray-500">{orders.length} order(s)</p>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No orders yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm font-medium text-gray-600">
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {order.customer_name || order.customer_email || '—'}
                          {order.customer_email && order.customer_name && (
                            <span className="block text-xs text-gray-500">{order.customer_email}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {formatAmount(order.amount_total, order.currency)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'cod' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {order.status === 'cod' ? 'COD' : (order.status || 'paid')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                            className="p-1 rounded hover:bg-gray-200 text-gray-500"
                          >
                            {expandedId === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </td>
                      </tr>
                      {expandedId === order.id && (
                        <tr className="bg-gray-50/80">
                          <td colSpan={5} className="px-6 py-4">
                            <div className="text-sm space-y-4">
                              <div>
                                <p className="font-medium text-gray-700 mb-2">Delivery information</p>
                                <ul className="space-y-1 text-gray-600">
                                  {(order.customer_name || order.customer_email) && (
                                    <li><strong>Name:</strong> {order.customer_name || '—'}</li>
                                  )}
                                  {order.customer_email && <li><strong>Email:</strong> {order.customer_email}</li>}
                                  {order.customer_phone && <li><strong>Phone:</strong> {order.customer_phone}</li>}
                                  {order.customer_address && <li><strong>Address:</strong> {order.customer_address}</li>}
                                  {(order.customer_city || order.customer_postal_code) && (
                                    <li><strong>City / Postal:</strong> {[order.customer_city, order.customer_postal_code].filter(Boolean).join(' — ')}</li>
                                  )}
                                  {order.delivery_notes && <li><strong>Notes:</strong> {order.delivery_notes}</li>}
                                </ul>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700 mb-2">Items</p>
                                <ul className="space-y-1">
                                  {(Array.isArray(order.items) ? order.items : []).map((item, idx) => (
                                    <li key={idx} className="flex justify-between text-gray-600">
                                      <span>{item.name} × {item.quantity}</span>
                                      <span>Rs. {((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <p className="text-gray-500 text-xs">Stripe session: {order.stripe_session_id}</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
