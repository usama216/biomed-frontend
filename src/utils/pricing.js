/** 15% discount on all products - used for display and cart */
export const DISCOUNT_PERCENT = 15;

export const getDiscountedPrice = (originalPrice) => {
  if (originalPrice == null) return 0;
  return Math.round(Number(originalPrice) * (1 - DISCOUNT_PERCENT / 100));
};
