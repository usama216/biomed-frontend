/**
 * Canonical category labels for the store — must match ProductsPage sidebar filters exactly.
 * Assign products only from PRODUCT_CATEGORY_OPTIONS so filtering stays consistent.
 */
export const PRODUCT_CATEGORY_OPTIONS = [
  'B Vitamins',
  'Beauty',
  'Best Selling',
  'Blood Sugar Support',
  'Bones & Joints',
  "Children's Health",
  'Digestive Health',
  'Fertility Support',
  'Fish Oil',
  'Glutathione',
  'Hair Care',
  'Heart Health',
  'Immune Support',
  'Memory & Brain Support',
  "Men's Health",
  'Multivitamins',
  "Women's Health",
];

/** Sidebar nav order (includes “All Products” link target). */
export const PRODUCT_NAV_CATEGORIES = ['All Products', ...PRODUCT_CATEGORY_OPTIONS];
