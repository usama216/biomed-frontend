import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Grid, List, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const OffersPage = ({ addToCart }) => {
  const [priceRange, setPriceRange] = useState([0, 4500]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4500);
  const [viewMode, setViewMode] = useState('grid');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('bestselling');
  const [expandedCategories, setExpandedCategories] = useState(true);
  const [inStock, setInStock] = useState(true);
  const [outOfStock, setOutOfStock] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All products', 'B Vitamins', 'Beauty', 'Best Selling', 'Blood Sugar Support',
    'Bones & Joints', "Children's Health", 'Digestive Health', 'Essential Oils',
    'Fertility Support', 'Fish Oil', 'Glutathione', 'Gummies', 'Hair Care',
    'Heart Health', 'Herbal Support', 'Immune Support', 'Memory & Brain Support',
    "Men's Health", 'Multivitamins'
  ];

  // Combo/Offer Products - Based on 3 Major Products
  const offerProducts = [
    {
      id: 'prod-1',
      name: 'Magioo Magnesium Glycinate (1000mg)',
      rating: 4.8,
      reviews: 178,
      originalPrice: 2390,
      discountedPrice: 2390,
      image: '/assets/new-products/product-1.jpeg',
      description: 'Magioo Magnesium Glycinate is a dietary supplement tablet containing 1000 mg of Magnesium Glycinate (USP) per serving. Supports sleep, helps nerve and muscle function, promotes bone & heart health, and enhances nutrient absorption.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-2',
      name: 'Tablet Ostical-D 30s',
      rating: 4.6,
      reviews: 95,
      originalPrice: 1120,
      discountedPrice: 1120,
      image: '/assets/new-products/product-2.jpeg',
      description: 'Ostical-D Tablets are a bone health supplement manufactured by Biomed Innovation Pharmaceuticals. The product is formulated with Calcium Carbonate, Magnesium, Zinc, Vitamin D3, and Vitamin K, designed to help remove joint pain and support the development of healthy bones & teeth, while also supporting the maintenance of strong bones.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-3',
      name: 'Tablet Zincoo 50mg',
      rating: 4.7,
      reviews: 142,
      originalPrice: 950,
      discountedPrice: 950,
      image: '/assets/new-products/product-3.jpeg',
      description: 'Zincoo ZINC is a high-quality zinc supplement formulated with Zinc Gluconate 50mg per serving. It supports immune function, promotes skin health, and aids in cell growth. The product is manufactured by Biomed, emphasizing natural ingredients for optimal absorption.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-4',
      name: 'Glutamed capsule 30s',
      rating: 4.9,
      reviews: 203,
      originalPrice: 4300,
      discountedPrice: 4300,
      image: '/assets/new-products/product-4.jpeg',
      description: 'Glutamed L-Glutathione with Vitamin C is a dietary supplement manufactured by Biomed Innovation Pharmaceuticals Pvt Ltd. The product is packaged in a bottle of 30 capsules and is promoted for skin benefits, including skin lightening, detoxification, and anti-aging effects.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-5',
      name: 'Bemega (Omega-3 500mg) Capsule – BioMed Innovation',
      rating: 4.8,
      reviews: 167,
      originalPrice: 1590,
      discountedPrice: 1590,
      image: '/assets/new-products/product-5.jpeg',
      description: 'Bomega Omega-3 500mg is a premium dietary supplement marketed by BioMed Innovation Pharmaceuticals (Pvt) Ltd. Each bottle contains 30 softgel capsules, providing 500mg of high-quality Omega-3 fish oil per capsule. Supports heart health, brain function, and joint support.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-6',
      name: 'Bio-12 Tablets (Mecobalamin 2000mcg)',
      rating: 4.7,
      reviews: 128,
      originalPrice: 1420,
      discountedPrice: 1420,
      image: '/assets/new-products/product-6.jpeg',
      description: 'Bio-12 is a dietary supplement in tablet form containing Mecobalamin 2000mcg, a form of Vitamin B12. It supports nerve health, energy metabolism, and red blood cell production. The product is marketed by Biomed Pharmaceuticals and is promoted for nervous system maintenance and increased body energy.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-7',
      name: 'Nurose Collagen capsules',
      rating: 4.7,
      reviews: 95,
      originalPrice: 1990,
      discountedPrice: 1990,
      image: '/assets/new-products/product-7.jpeg',
      description: 'Nurose Collagen capsules are a dietary supplement packed with Vitamin C (20 mg), Biotin (2500 mcg), and Collagen (1000 mg) in each dose. The blend works to boost beauty and wellness from the inside out, delivering thicker healthier hair, youthful skin, and stronger nails.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-8',
      name: 'NORO tablet 20s',
      rating: 4.6,
      reviews: 112,
      originalPrice: 1400,
      discountedPrice: 1400,
      image: '/assets/new-products/product-8.jpeg',
      description: 'Noro tablets are a nutraceutical dietary supplement marketed by Biomed Innovation Pharmaceuticals Pvt Ltd. Each tablet contains Calcium L-5-Methyltetrahydrofolate (490 mcg), Vitamin B6 (1.3 mg), and Vitamin B12 (1 mcg). The product is designed to support cognitive function, healthy red blood cell formation, and boost energy levels.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-9',
      name: 'VNUR MEN Once a Day Multi – Dietary Supplement',
      rating: 4.7,
      reviews: 145,
      originalPrice: 1890,
      discountedPrice: 1890,
      image: '/assets/new-products/product-9.jpeg',
      description: 'A once‑daily multivitamin tablet formulated for adult men, enriched with Coenzyme Q10, Ginkgo biloba, L‑Carnitine & L‑Arginine. Key benefits include nutritional support for overall health, energy metabolism enhancement, muscle strength assistance, and immunity boost.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-10',
      name: 'VNUR WOMEN tablets 30s',
      rating: 4.7,
      reviews: 156,
      originalPrice: 1890,
      discountedPrice: 1890,
      image: '/assets/new-products/product-10.jpeg',
      description: 'A once‑daily multivitamin tablet specially formulated for adult women, enriched with Inositol, Alpha Lipoic Acid & Biotin 2500 mcg. Key benefits include nutritional support for overall health, energy metabolism boost, healthy hair, skin & nails, and immunity enhancement.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-11',
      name: 'Teenur tablet 30s',
      rating: 4.6,
      reviews: 112,
      originalPrice: 1590,
      discountedPrice: 1590,
      image: '/assets/new-products/product-11.jpeg',
      description: 'Biotin + Keratin is a dietary supplement tablet containing Biotin 2500mcg and Hydrolyzed Keratin 250mg. It is designed for adult men and supports hair growth, nail health, skin health, and overall wellness.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-12',
      name: 'X‑NUR 30s tablet',
      rating: 4.8,
      reviews: 189,
      originalPrice: 2990,
      discountedPrice: 2990,
      image: '/assets/new-products/product-12.jpeg',
      description: 'X‑NUR herbal supplement tablets by Biomed Innovation Pharmaceuticals. Benefits include boosting testosterone, enhancing muscle strength & performance, supporting mental health & stamina, and increasing energy levels.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-13',
      name: 'Ostical-D Syrup',
      rating: 4.6,
      reviews: 95,
      originalPrice: 780,
      discountedPrice: 780,
      image: '/assets/new-products/product-13.jpeg',
      description: 'Ostical-D Syrup is a bone health supplement by Biomed Innovation Pharmaceuticals. It contains Calcium Carbonate, Magnesium, Zinc, Vitamin D3, and Vitamin K. The syrup is designed to help remove joint pain and support the development of healthy bones & teeth, while also supporting the maintenance of strong bones.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    },
    {
      id: 'prod-14',
      name: 'DeAll softgel Capsules 1s',
      rating: 4.8,
      reviews: 98,
      originalPrice: 435,
      discountedPrice: 435,
      image: '/assets/new-products/product-14.jpeg',
      description: 'DeAll is a premium softgel supplement that combines Vitamin D3 (200,000 IU) with Vitamin K2, formulated by BioMed Innovation Pharmaceuticals Pvt Ltd. This powerful blend supports multiple aspects of health, including immune function, energy & vitality, muscle strength, and bone health.',
      inStock: true,
      isFree: false,
      salePercentage: 0
    }
  ];

  const handleApplyPriceFilter = () => {
    setPriceRange([minPrice, maxPrice]);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src="/assets/offers-hero-section-image.webp" 
          alt="Offers & Discounts"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Description Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 lg:px-14">
          <h2 className="text-3xl font-bold text-biomed-navy mb-4">OFFERS & DISCOUNTS</h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
            Looking for an amazing discount offer? We bring to you some of the most exciting offers & discounts on your favorite products. Grab your favorite deal today and kick-start your journey of fitness & wellness.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 lg:px-14">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <button
                  onClick={() => setExpandedCategories(!expandedCategories)}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <h3 className="text-lg font-bold text-gray-900">CATEGORIES</h3>
                  {expandedCategories ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedCategories && (
                  <ul className="space-y-2 max-h-96 overflow-y-auto">
                    {categories.map((category, idx) => (
                      <li key={idx}>
                        <a 
                          href="#" 
                          className="text-gray-600 hover:text-biomed-teal transition-colors text-sm"
                        >
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Availability */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">AVAILABILITY</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={() => setInStock(!inStock)}
                      className="w-4 h-4 text-biomed-teal rounded focus:ring-biomed-teal"
                    />
                    <span className="text-sm text-gray-700">In Stock (7)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={outOfStock}
                      onChange={() => setOutOfStock(!outOfStock)}
                      className="w-4 h-4 text-biomed-teal rounded focus:ring-biomed-teal"
                    />
                    <span className="text-sm text-gray-700">Out Of Stock (0)</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">PRICE</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-biomed-teal text-sm"
                      placeholder="Rs 0"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-biomed-teal text-sm"
                      placeholder="Rs 4500"
                    />
                  </div>
                  <button
                    onClick={handleApplyPriceFilter}
                    className="w-full bg-biomed-navy hover:bg-biomed-navy/90 text-white py-2 rounded font-semibold text-sm transition-colors"
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Controls Bar */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-700">VIEW AS:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-biomed-teal text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <Grid size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-biomed-teal text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">ITEMS PER PAGE:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-biomed-teal text-sm"
                    >
                      <option value={20}>20</option>
                      <option value={40}>40</option>
                      <option value={60}>60</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">SORT BY:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-biomed-teal text-sm"
                    >
                      <option value="bestselling">Best selling</option>
                      <option value="priceLowHigh">Price: Low to High</option>
                      <option value="priceHighLow">Price: High to Low</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {offerProducts.map((product) => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group block cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-64 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Badges */}
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Sale
                      </div>
                      {product.isFree && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          FREE
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 hover:text-biomed-teal transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-biomed-navy">
                          Rs.{product.discountedPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          Rs.{product.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-biomed-navy hover:bg-biomed-navy/90 text-white py-2 rounded font-semibold text-sm text-center transition-colors">
                          VIEW PRODUCT
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart && addToCart(product);
                          }}
                          className="w-10 h-10 bg-biomed-teal hover:bg-biomed-teal/90 text-white rounded flex items-center justify-center transition-colors"
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffersPage;

