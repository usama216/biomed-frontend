import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Certifications from '../components/Certifications';
import TrendingProducts from '../components/TrendingProducts';
import Mission from '../components/Mission';
import BlogCarousel from '../components/BlogCarousel';
import ProductGridSection from '../components/ProductGridSection';
import HomeVideoSection from '../components/HomeVideoSection';
import { OFFER_CATEGORY_OPTIONS } from '../constants/productCategories';
import { fetchProducts } from '../api';

const HomePage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setProductsLoading(true);
      try {
        const data = await fetchProducts();
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setProductsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Hero />
      <Certifications />
      <TrendingProducts
        addToCart={addToCart}
        products={products}
        loading={productsLoading}
      />
      <ProductGridSection
        addToCart={addToCart}
        title="BEST SELLING"
        categories={['Best Selling']}
        viewMoreLink="/products"
        products={products}
        loading={productsLoading}
      />
      <ProductGridSection
        addToCart={addToCart}
        title="OFFERS & BUNDLES"
        categories={OFFER_CATEGORY_OPTIONS}
        viewMoreLink="/offers"
        products={products}
        loading={productsLoading}
      />
      <HomeVideoSection />
      <Mission />
      <BlogCarousel />
    </>
  );
};

export default HomePage;
