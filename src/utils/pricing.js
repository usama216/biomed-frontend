import { productHasCategory } from '../constants/productCategories';

/** 15% discount on products (Bundles excluded) - used for display and cart */
export const DISCOUNT_PERCENT = 15;

export const getDiscountedPrice = (originalPrice) => {
  if (originalPrice == null) return 0;
  return Math.round(Number(originalPrice) * (1 - DISCOUNT_PERCENT / 100));
};

/** Bundles have no UI discount — show full original price only. */
export const productHasUiDiscount = (product) => !productHasCategory(product, 'Bundles');

/** Final sell price for a product (no discount for Bundles). */
export const getProductPrice = (product) => {
  const original = product?.originalPrice;
  if (original == null) return 0;
  if (!productHasUiDiscount(product)) return Math.round(Number(original));
  return getDiscountedPrice(original);
};
