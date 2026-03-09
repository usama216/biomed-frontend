const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'https://biomed-backend.vercel.app');

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

// --- Banners (hero carousel) ---

export async function fetchBanners() {
  const res = await fetch(`${API_BASE}/api/banners`);
  if (!res.ok) throw new Error('Failed to load banners');
  return res.json();
}

export async function fetchAdminBanners() {
  const token = getAdminToken();
  if (!token) throw new Error('Not logged in');
  const res = await fetch(`${API_BASE}/api/admin/banners`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error('Failed to load banners');
  return res.json();
}

export async function createBanner(file, sort_order = 0) {
  const token = getAdminToken();
  if (!token) throw new Error('Not logged in');
  const form = new FormData();
  form.append('image', file);
  form.append('sort_order', String(sort_order));
  const res = await fetch(`${API_BASE}/api/admin/banners`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    throw new Error('Session expired');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to add banner');
  }
  return res.json();
}

export async function updateBanner(id, { file, sort_order }) {
  const token = getAdminToken();
  if (!token) throw new Error('Not logged in');
  const form = new FormData();
  if (file) form.append('image', file);
  if (sort_order !== undefined) form.append('sort_order', String(sort_order));
  if (!file && sort_order === undefined) throw new Error('Provide a new image or sort_order');
  const res = await fetch(`${API_BASE}/api/admin/banners/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    throw new Error('Session expired');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to update banner');
  }
  return res.json();
}

export async function deleteBanner(id) {
  const token = getAdminToken();
  if (!token) throw new Error('Not logged in');
  const res = await fetch(`${API_BASE}/api/admin/banners/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    throw new Error('Session expired');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to delete banner');
  }
  return res.json();
}

// --- Blogs (public) ---

export async function fetchBlogs() {
  const res = await fetch(`${API_BASE}/api/blogs`);
  if (!res.ok) throw new Error('Failed to load blogs');
  return res.json();
}

export async function fetchBlogByIdOrSlug(idOrSlug) {
  const res = await fetch(`${API_BASE}/api/blogs/${encodeURIComponent(idOrSlug)}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Blog not found');
    throw new Error('Failed to load blog');
  }
  return res.json();
}

// --- Admin Blogs ---

/** Upload image for blog content (inline). Returns { url }. */
export async function uploadBlogContentImage(file) {
  const token = getAdminToken();
  if (!token) throw new Error('Not logged in');
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`${API_BASE}/api/admin/blogs/upload-image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    throw new Error('Session expired');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to upload image');
  }
  const data = await res.json();
  return data.url;
}

export async function fetchAdminBlogs() {
  const token = getAdminToken();
  if (!token) throw new Error('Not logged in');
  const res = await fetch(`${API_BASE}/api/admin/blogs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error('Failed to load blogs');
  return res.json();
}

export async function createBlog({ title, excerpt, content, category, read_time_minutes, published, cover_image }) {
  const token = getAdminToken();
  if (!token) throw new Error('Not logged in');
  const form = new FormData();
  form.append('title', title);
  if (excerpt != null) form.append('excerpt', excerpt);
  if (content != null) form.append('content', content);
  if (category != null) form.append('category', category);
  if (read_time_minutes != null) form.append('read_time_minutes', String(read_time_minutes));
  form.append('published', published ? 'true' : 'false');
  if (cover_image) form.append('cover_image', cover_image);
  const res = await fetch(`${API_BASE}/api/admin/blogs`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    throw new Error('Session expired');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to add blog');
  }
  return res.json();
}

export async function updateBlog(id, { title, excerpt, content, category, read_time_minutes, published, cover_image }) {
  const token = getAdminToken();
  if (!token) throw new Error('Not logged in');
  const form = new FormData();
  if (title !== undefined) form.append('title', title);
  if (excerpt !== undefined) form.append('excerpt', excerpt);
  if (content !== undefined) form.append('content', content);
  if (category !== undefined) form.append('category', category);
  if (read_time_minutes !== undefined) form.append('read_time_minutes', String(read_time_minutes));
  if (published !== undefined) form.append('published', published ? 'true' : 'false');
  if (cover_image) form.append('cover_image', cover_image);
  const res = await fetch(`${API_BASE}/api/admin/blogs/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    throw new Error('Session expired');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to update blog');
  }
  return res.json();
}

export async function deleteBlog(id) {
  const token = getAdminToken();
  if (!token) throw new Error('Not logged in');
  const res = await fetch(`${API_BASE}/api/admin/blogs/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401 || res.status === 403) {
    adminLogout();
    throw new Error('Session expired');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Failed to delete blog');
  }
  return res.json();
}
