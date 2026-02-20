import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LatestOffers = ({ addToCart }) => {
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  const offers = [
    {
      id: 'prod-1',
      name: 'Magioo Magnesium Glycinate (1000mg)',
      price: 2390,
      image: '/assets/new-products/product-1.jpeg',
      rating: 4.8,
      reviews: 178,
      originalPrice: 2390,
      discountedPrice: 2390
    },
    {
      id: 'prod-2',
      name: 'Tablet Ostical-D 30s',
      price: 1120,
      image: '/assets/new-products/product-2.jpeg',
      rating: 4.6,
      reviews: 95,
      originalPrice: 1120,
      discountedPrice: 1120
    },
    {
      id: 'prod-3',
      name: 'Tablet Zincoo 50mg',
      price: 950,
      image: '/assets/new-products/product-3.jpeg',
      rating: 4.7,
      reviews: 142,
      originalPrice: 950,
      discountedPrice: 950
    },
    {
      id: 'prod-4',
      name: 'Glutamed capsule 30s',
      price: 4300,
      image: '/assets/new-products/product-4.jpeg',
      rating: 4.9,
      reviews: 203,
      originalPrice: 4300,
      discountedPrice: 4300
    },
    {
      id: 'prod-5',
      name: 'Bemega (Omega-3 500mg) Capsule – BioMed Innovation',
      price: 1590,
      image: '/assets/new-products/product-5.jpeg',
      rating: 4.8,
      reviews: 167,
      originalPrice: 1590,
      discountedPrice: 1590
    },
    {
      id: 'prod-6',
      name: 'Bio-12 Tablets (Mecobalamin 2000mcg)',
      price: 1420,
      image: '/assets/new-products/product-6.jpeg',
      rating: 4.7,
      reviews: 128,
      originalPrice: 1420,
      discountedPrice: 1420
    },
    {
      id: 'prod-7',
      name: 'Nurose Collagen capsules',
      price: 1990,
      image: '/assets/new-products/product-7.jpeg',
      rating: 4.7,
      reviews: 95,
      originalPrice: 1990,
      discountedPrice: 1990
    },
    {
      id: 'prod-8',
      name: 'NORO tablet 20s',
      price: 1400,
      image: '/assets/new-products/product-8.jpeg',
      rating: 4.6,
      reviews: 112,
      originalPrice: 1400,
      discountedPrice: 1400
    },
    {
      id: 'prod-9',
      name: 'VNUR MEN Once a Day Multi – Dietary Supplement',
      price: 1890,
      image: '/assets/new-products/product-9.jpeg',
      rating: 4.7,
      reviews: 145,
      originalPrice: 1890,
      discountedPrice: 1890
    },
    {
      id: 'prod-10',
      name: 'VNUR WOMEN tablets 30s',
      price: 1890,
      image: '/assets/new-products/product-10.jpeg',
      rating: 4.7,
      reviews: 156,
      originalPrice: 1890,
      discountedPrice: 1890
    },
    {
      id: 'prod-11',
      name: 'Teenur tablet 30s',
      price: 1590,
      image: '/assets/new-products/product-11.jpeg',
      rating: 4.6,
      reviews: 112,
      originalPrice: 1590,
      discountedPrice: 1590
    },
    {
      id: 'prod-12',
      name: 'X‑NUR 30s tablet',
      price: 2990,
      image: '/assets/new-products/product-12.jpeg',
      rating: 4.8,
      reviews: 189,
      originalPrice: 2990,
      discountedPrice: 2990
    },
    {
      id: 'prod-13',
      name: 'Ostical-D Syrup',
      price: 780,
      image: '/assets/new-products/product-13.jpeg',
      rating: 4.6,
      reviews: 95,
      originalPrice: 780,
      discountedPrice: 780
    },
    {
      id: 'prod-14',
      name: 'DeAll softgel Capsules 1s',
      price: 435,
      image: '/assets/new-products/product-14.jpeg',
      rating: 4.8,
      reviews: 98,
      originalPrice: 435,
      discountedPrice: 435
    }
  ];

  // Duplicate offers for seamless infinite scroll
  const duplicatedOffers = [...offers, ...offers, ...offers];

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
        left: -360,
        behavior: 'smooth'
      });
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 360,
        behavior: 'smooth'
      });
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          LATEST OFFERS & DISCOUNTS
        </h2>

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
            {duplicatedOffers.map((offer, idx) => (
              <Link 
                key={`offer-${idx}`} 
                to={`/product/${offer.id}`}
                className="w-[320px] min-w-[320px] max-w-[320px] bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 block cursor-pointer"
              >
                <div className="h-64 flex items-center justify-center bg-gray-50 relative overflow-hidden">
                  <img 
                    src={offer.image} 
                    alt={offer.name} 
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    -15%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 h-12 line-clamp-2">{offer.name}</h3>
                  <p className="text-2xl font-bold text-biomed-teal mb-4">Rs. {offer.discountedPrice}</p>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(offer);
                    }}
                    className="w-full bg-biomed-navy hover:bg-biomed-navy/90 text-white py-2 rounded-lg font-semibold transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
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

export default LatestOffers;

