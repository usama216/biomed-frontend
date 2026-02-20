import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Grid, List } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const ProductsPage = ({ addToCart }) => {
  const { category } = useParams();
  const [priceRange, setPriceRange] = useState([0, 4500]);
  const [viewMode, setViewMode] = useState('grid');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('bestselling');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All Products', 'B Vitamins', 'Beauty', 'Best Selling', 'Blood Sugar Support',
    'Bones & Joints', "Children's Health", 'Digestive Health',
    'Fertility Support', 'Fish Oil', 'Glutathione', 'Hair Care',
    'Heart Health','Immune Support', 'Memory & Brain Support',
    "Men's Health", 'Multivitamins', "Women's Health"
  ];

  const products = [
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
      category: 'Best Selling'
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
      category: 'Bones & Joints'
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
      category: ['Fertility Support', 'Digestive Health', 'Immune Support', "Men's Health"]
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
      category: ['Beauty', 'Glutathione']
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
      category: ['Fish Oil', 'Heart Health', 'Memory & Brain Support']
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
      category: 'B Vitamins'
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
      category: ['Beauty', 'Hair Care']
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
      category: 'Blood Sugar Support'
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
      category: ['Fertility Support', "Men's Health", 'Multivitamins']
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
      category: ['Multivitamins', "Women's Health"]
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
      category: ['Beauty', 'Hair Care']
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
      category: ['Fertility Support', "Men's Health"]
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
      category: "Children's Health"
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
      category: 'Bones & Joints'
    }
  ];

  const getCategoryTitle = () => {
    if (!category) return 'All Products';
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Helper function to normalize category name for comparison
  const normalizeCategoryName = (catName) => {
    return catName.toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-');
  };

  // Filter products based on selected category
  const filteredProducts = React.useMemo(() => {
    if (!category || category === 'all-products') {
      return products;
    }
    
    // Find the matching category from the categories array
    const selectedCategory = categories.find(cat => 
      normalizeCategoryName(cat) === category
    );
    
    if (!selectedCategory) {
      return products; // Return all if category not found
    }
    
    // Filter products that belong to the selected category
    // Support both single category (string) and multiple categories (array)
    return products.filter(product => {
      if (!product.category) return false;
      if (Array.isArray(product.category)) {
        return product.category.includes(selectedCategory);
      }
      return product.category === selectedCategory;
    });
  }, [category, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-100 to-teal-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{getCategoryTitle()}</h1>
          <p className="text-xl text-gray-700">
            Every day is a new challenge & to keep up you need your daily dose of energy. 
            BIOMED's health care products help you keep energetic, active & ready for any stage of life.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">CATEGORIES</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {categories.map((cat, idx) => {
                    const categorySlug = normalizeCategoryName(cat);
                    const isAllProducts = cat === 'All Products';
                    const isActive = !category ? isAllProducts : category === categorySlug;
                    return (
                      <Link
                        key={idx}
                        to={isAllProducts ? '/products' : `/products/${categorySlug}`}
                        className={`block py-2 px-3 rounded hover:bg-biomed-teal/10 transition-colors ${
                          isActive
                            ? 'bg-biomed-teal/20 font-semibold' 
                            : ''
                        }`}
                      >
                        {cat}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6 border-t pt-6">
                <h3 className="font-bold text-lg mb-4">AVAILABILITY</h3>
                <label className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm">In Stock (11)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">Out Of Stock (0)</span>
                </label>
              </div>

              {/* Price Range */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-4">PRICE</h3>
                <div className="mb-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="4500" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Rs. {priceRange[0]}</span>
                    <span>Rs. {priceRange[1]}</span>
                  </div>
                </div>
                <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded font-semibold">
                  APPLY
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Products Grid */}
          <div className="md:col-span-3">
            {/* Controls Bar */}
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">VIEW AS</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-biomed-navy text-white' : 'bg-gray-100'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-biomed-navy text-white' : 'bg-gray-100'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">ITEMS PER PAGE</label>
                  <select 
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                    className="border rounded px-3 py-1"
                  >
                    <option value="12">12</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">SORT BY</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-3 py-1"
                  >
                    <option value="bestselling">Best Selling</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found in this category.</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden block cursor-pointer"
                >
                  <div className="relative">
                    <div className="h-64 bg-gray-50 flex items-center justify-center p-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {product.inStock && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -15%
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Sold Out
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 h-12 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({product.reviews})</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-biomed-teal">Rs. {product.discountedPrice}</span>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded text-sm font-semibold text-center">
                        VIEW PRODUCT
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={!product.inStock}
                        className={`p-2 rounded ${
                          product.inStock 
                            ? 'bg-biomed-navy hover:bg-biomed-navy/90 text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

