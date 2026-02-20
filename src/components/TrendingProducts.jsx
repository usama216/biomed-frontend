import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrendingProducts = ({ addToCart }) => {
  const [activeTab, setActiveTab] = useState('bestselling');
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  const products = [
    {
      id: 'prod-1',
      name: 'Magioo Magnesium Glycinate (1000mg)',
      rating: 4.8,
      reviews: 178,
      originalPrice: 2390,
      discountedPrice: 2390,
      image: '/assets/new-products/product-1.jpeg'
    },
    {
      id: 'prod-2',
      name: 'Tablet Ostical-D 30s',
      rating: 4.6,
      reviews: 95,
      originalPrice: 1120,
      discountedPrice: 1120,
      image: '/assets/new-products/product-2.jpeg'
    },
    {
      id: 'prod-3',
      name: 'Tablet Zincoo 50mg',
      rating: 4.7,
      reviews: 142,
      originalPrice: 950,
      discountedPrice: 950,
      image: '/assets/new-products/product-3.jpeg'
    },
    {
      id: 'prod-4',
      name: 'Glutamed capsule 30s',
      rating: 4.9,
      reviews: 203,
      originalPrice: 4300,
      discountedPrice: 4300,
      image: '/assets/new-products/product-4.jpeg'
    },
    {
      id: 'prod-5',
      name: 'Bemega (Omega-3 500mg) Capsule – BioMed Innovation',
      rating: 4.8,
      reviews: 167,
      originalPrice: 1590,
      discountedPrice: 1590,
      image: '/assets/new-products/product-5.jpeg'
    },
    {
      id: 'prod-6',
      name: 'Bio-12 Tablets (Mecobalamin 2000mcg)',
      rating: 4.7,
      reviews: 128,
      originalPrice: 1420,
      discountedPrice: 1420,
      image: '/assets/new-products/product-6.jpeg'
    },
    {
      id: 'prod-7',
      name: 'Nurose Collagen capsules',
      rating: 4.7,
      reviews: 95,
      originalPrice: 1990,
      discountedPrice: 1990,
      image: '/assets/new-products/product-7.jpeg'
    },
    {
      id: 'prod-8',
      name: 'NORO tablet 20s',
      rating: 4.6,
      reviews: 112,
      originalPrice: 1400,
      discountedPrice: 1400,
      image: '/assets/new-products/product-8.jpeg'
    },
    {
      id: 'prod-9',
      name: 'VNUR MEN Once a Day Multi – Dietary Supplement',
      rating: 4.7,
      reviews: 145,
      originalPrice: 1890,
      discountedPrice: 1890,
      image: '/assets/new-products/product-9.jpeg'
    },
    {
      id: 'prod-10',
      name: 'VNUR WOMEN tablets 30s',
      rating: 4.7,
      reviews: 156,
      originalPrice: 1890,
      discountedPrice: 1890,
      image: '/assets/new-products/product-10.jpeg'
    },
    {
      id: 'prod-11',
      name: 'Teenur tablet 30s',
      rating: 4.6,
      reviews: 112,
      originalPrice: 1590,
      discountedPrice: 1590,
      image: '/assets/new-products/product-11.jpeg'
    },
    {
      id: 'prod-12',
      name: 'X‑NUR 30s tablet',
      rating: 4.8,
      reviews: 189,
      originalPrice: 2990,
      discountedPrice: 2990,
      image: '/assets/new-products/product-12.jpeg'
    },
    {
      id: 'prod-13',
      name: 'Ostical-D Syrup',
      rating: 4.6,
      reviews: 95,
      originalPrice: 780,
      discountedPrice: 780,
      image: '/assets/new-products/product-13.jpeg'
    },
    {
      id: 'prod-14',
      name: 'DeAll softgel Capsules 1s',
      rating: 4.8,
      reviews: 98,
      originalPrice: 435,
      discountedPrice: 435,
      image: '/assets/new-products/product-14.jpeg'
    }
  ];

  // Duplicate products for seamless infinite scroll
  const duplicatedProducts = [...products, ...products, ...products];

  // Infinite scroll auto-play
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth / 3; // One set length
        
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 1; // Reset smoothly
        } else {
          container.scrollBy({
            left: 1,
            behavior: 'auto'
          });
        }
      }
    }, 20); // Smooth continuous scroll

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Carousel scroll functions
  const scrollLeft = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900">TRENDING NOW</h2>
          <div className="flex gap-4">
            {/* <button
              onClick={() => setActiveTab('bestselling')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'bestselling' 
                  ? 'bg-biomed-navy text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              BEST SELLINGS
            </button>
            <button
              onClick={() => setActiveTab('newarrivals')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'newarrivals' 
                  ? 'bg-biomed-navy text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              NEW ARRIVALS
            </button> */}
          </div>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient Overlays - Hidden on Mobile */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
          >
            {duplicatedProducts.map((product, idx) => (
              <Link 
                key={`product-${idx}`} 
                to={`/product/${product.id}`}
                className="w-[280px] min-w-[280px] max-w-[280px] bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow flex-shrink-0 block cursor-pointer"
              >
                <div className="h-48 rounded-lg mb-4 flex items-center justify-center bg-gray-50 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    -15%
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 h-12 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-biomed-teal">Rs. {product.discountedPrice}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                  className="w-full bg-biomed-navy hover:bg-biomed-navy/90 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </Link>
            ))}
          </div>
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 z-10 transition-all hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 z-10 transition-all hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;

