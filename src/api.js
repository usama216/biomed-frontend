const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'http://localhost:5000');

export async function createCheckoutSession(items, successUrl, cancelUrl, customer) {
  const res = await fetch(`${API_BASE}/api/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items,
      successUrl,
      cancelUrl,
      customer: customer || undefined,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to create checkout session');
  }
  return res.json();
}

export async function getCheckoutSession(sessionId) {
  const res = await fetch(`${API_BASE}/api/checkout-session/${sessionId}`);
  if (!res.ok) throw new Error('Failed to load session');
  return res.json();
}

export async function saveOrder(sessionId) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to save order');
  }
  return res.json();
}

export async function placeCodOrder(items, customer) {
  const res = await fetch(`${API_BASE}/api/orders/cod`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, customer }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to place order');
  }
  return res.json();
}

// --- Admin API (requires token from localStorage) ---
function getAdminToken() {
  return localStorage.getItem('adminToken');
}

export function isAdminLoggedIn() {
  return !!getAdminToken();
}

export function adminLogout() {
  localStorage.removeItem('adminToken');
}

export async function adminLogin(email, password) {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Login failed');
  }
  const { token } = await res.json();
  localStorage.setItem('adminToken', token);
  return { token };
}

export async function fetchAdminOrders() {
  const token = getAdminToken();
  if (!token) throw new Error('Not logged in');
  const res = await fetch(`${API_BASE}/api/admin/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error('Failed to load orders');
  return res.json();
}
