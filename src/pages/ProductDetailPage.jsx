import React, { useState, useEffect } from 'react';
import { Star, Plus, Minus, ShoppingCart, ChevronDown, Loader2 } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDiscountedPrice } from '../utils/pricing';
import { fetchProduct } from '../api';

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    directions: true,
    ingredients: true,
    faqs: false,
    reviews: false,
    quality: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setProduct(null);
      setError('');
      try {
        const p = await fetchProduct(id);
        if (!cancelled) {
          setProduct(p);
        }
      } catch (err) {
        if (!cancelled) {
          setProduct(null);
          setError(err.message || 'Failed to load product');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-biomed-teal animate-spin mb-4" />
        <p className="text-gray-500 text-lg">Loading product…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <Link
            to="/products"
            className="inline-block bg-biomed-navy hover:bg-biomed-navy/90 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages =
    product.images?.length > 0 ? product.images : product.image ? [product.image] : [];
  const mainImage = galleryImages[selectedImage] || galleryImages[0] || '';
  const cartImage = galleryImages[0] || product.image || '';
  const helps = Array.isArray(product.helps) ? product.helps : [];
  const ingredients = Array.isArray(product.ingredients) ? product.ingredients : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow p-6 mb-6">
          <div>
            <div className="sticky top-4">
              <div className="bg-gray-50 rounded-lg p-8 mb-3 flex items-center justify-center h-[500px] relative">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">No image available</div>
                )}
                {product.inStock && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded">
                    -15%
                  </div>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="flex gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-1 bg-gray-50 rounded-lg p-2 border-2 transition-colors ${
                        selectedImage === idx ? 'border-biomed-teal' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-16 object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

            <div className="mb-3">
              {product.inStock ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Out of Stock
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">{product.reviews ?? 0} reviews</span>
              </div>
              <span className="text-xs text-gray-600">{product.questions ?? 0} questions</span>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <span className="text-gray-500 line-through text-lg">Rs. {product.originalPrice}</span>
              <span className="text-2xl font-bold text-biomed-teal">Rs. {getDiscountedPrice(product.originalPrice)}</span>
            </div>

            {helps.length > 0 && (
              <div className="mb-4 bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Helps to:</h3>
                <ul className="space-y-1">
                  {helps.map((help, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-biomed-teal text-xs mt-0.5">•</span>
                      <span className="text-xs text-gray-700">{help}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.packSize && (
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-1">Pack Size:</label>
                <button className="px-4 py-1.5 bg-biomed-navy text-white rounded text-sm font-semibold">
                  {product.packSize}
                </button>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1">Quantity:</label>
              <div className="flex items-center border rounded w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-1 text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mb-4 bg-purple-50 p-3 rounded-lg">
              <p className="text-sm font-semibold text-purple-700">{product.wellnessCoins ?? 0} Wellness Coins</p>
              <a href="#" className="text-xs text-purple-600 underline">How it works?</a>
            </div>

            <div className="mb-4">
              <p className="text-base font-semibold">
                Subtotal:{' '}
                <span className="text-biomed-teal">
                  Rs. {getDiscountedPrice(product.originalPrice) * quantity}
                </span>
              </p>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    quantity,
                    discountedPrice: getDiscountedPrice(product.originalPrice),
                    image: cartImage,
                  })
                }
                disabled={!product.inStock}
                className={`flex-1 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-gray-800 hover:bg-gray-900 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={16} />
                {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
              </button>
              <button
                type="button"
                disabled={!product.inStock}
                onClick={() => {
                  if (!product.inStock) return;
                  addToCart(
                    {
                      ...product,
                      quantity,
                      discountedPrice: getDiscountedPrice(product.originalPrice),
                      image: cartImage,
                    },
                    false
                  );
                  navigate('/checkout');
                }}
                className={`flex-1 py-2.5 rounded-lg font-semibold text-sm ${
                  product.inStock
                    ? 'bg-white border-2 border-gray-800 hover:bg-gray-50 text-gray-800'
                    : 'bg-gray-100 border-2 border-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                BUY IT NOW
              </button>
            </div>

            <div className="my-4 border rounded-lg overflow-hidden">
              <div className="border-b">
                <button
                  onClick={() => toggleSection('details')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Product Details</h3>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${expandedSections.details ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${expandedSections.details ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-2">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {product.details || product.description || 'No details available.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b">
                <button
                  onClick={() => toggleSection('directions')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Directions</h3>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${expandedSections.directions ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${expandedSections.directions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-2">
                    <p className="text-xs text-gray-700">{product.directions || 'No directions available.'}</p>
                  </div>
                </div>
              </div>

              <div className="border-b">
                <button
                  onClick={() => toggleSection('ingredients')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Ingredients</h3>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${expandedSections.ingredients ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.ingredients ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-2">
                    {ingredients.length > 0 ? (
                      <>
                        <p className="text-[10px] font-semibold mb-1">Serving Size: One (1) Tablet</p>
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-1 text-[10px]">Each Tablet Contains:</th>
                              <th className="text-left py-1 text-[10px]">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ingredients.map((ingredient, idx) => (
                              <tr key={idx} className="border-b">
                                <td className="py-1 text-[10px]">{ingredient.name}</td>
                                <td className="py-1 text-[10px]">{ingredient.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <p className="text-xs text-gray-700">No ingredients listed.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-b">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">FAQs</h3>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${expandedSections.faqs ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${expandedSections.faqs ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-2">
                    <p className="text-xs text-gray-700">Frequently asked questions content goes here...</p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => toggleSection('reviews')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Customer Reviews</h3>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${expandedSections.reviews ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${expandedSections.reviews ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-2">
                    <p className="text-xs text-gray-700">Customer reviews will appear here...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
