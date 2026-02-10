import React, { useState, useRef, useEffect } from 'react';
import { Star, Plus, Minus, ShoppingCart, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    directions: true,
    ingredients: true,
    faqs: false,
    reviews: false,
    quality: false
  });
  const relatedScrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
  }, [id]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const scrollRelatedLeft = () => {
    if (relatedScrollRef.current) {
      relatedScrollRef.current.scrollBy({
        left: -220,
        behavior: 'smooth'
      });
    }
  };

  const scrollRelatedRight = () => {
    if (relatedScrollRef.current) {
      relatedScrollRef.current.scrollBy({
        left: 220,
        behavior: 'smooth'
      });
    }
  };

  // Complete product database
  const productsDatabase = {
    'prod-1': {
      id: 'prod-1',
      name: 'Magioo Magnesium Glycinate (1000mg)',
      rating: 4.8,
      reviews: 178,
      questions: 8,
      originalPrice: 2390,
      discountedPrice: 2390,
      images: [
        '/assets/new-products/product-1.jpeg'
      ],
      packSize: '30 Tablets',
      wellnessCoins: 2390,
      inStock: true,
      helps: [
        'Supports sleep quality and restful sleep',
        'Helps nerve and muscle function',
        'Promotes bone and heart health',
        'Enhances nutrient absorption'
      ],
      details: 'Magioo Magnesium Glycinate is a dietary supplement tablet containing 1000 mg of Magnesium Glycinate (USP) per serving. Manufactured by Nurture Pharma, Lahore, Pakistan, and marketed by Biomed Innovation Pharmaceuticals, the product comes in a pack of 30 tablets. Key features and benefits include supporting sleep, helping nerve and muscle function, promoting bone and heart health, and enhancing nutrient absorption. This product is used for the prevention of disease, not for direct treatment. GMP certified and compliant with DRAP Act 2012. For adults only. Consult a healthcare professional if you are pregnant, breastfeeding, or taking other medicines. Discontinue use if allergic or adverse reactions occur. Protect from light, heat and moisture. Store below 30°C in a dry place. Keep out of reach of children and keep the container tightly closed after use.',
      directions: 'Adults take 1 tablet 1–2 times daily with meals, or as directed by a physician. Do not exceed the recommended dose. For adults only. Consult a healthcare professional if you are pregnant, breastfeeding, or taking other medicines. Discontinue use if allergic or adverse reactions occur.',
      ingredients: [
        { name: 'Magnesium Glycinate (USP)', amount: '1000 mg' }
      ]
    },
    'prod-2': {
      id: 'prod-2',
      name: 'Tablet Ostical-D 30s',
      rating: 4.6,
      reviews: 95,
      questions: 5,
      originalPrice: 1120,
      discountedPrice: 1120,
      images: [
        '/assets/new-products/product-2.jpeg'
      ],
      packSize: '30 Tablets',
      wellnessCoins: 1120,
      inStock: true,
      helps: [
        'Help remove joint pain and support the development of healthy bones & teeth',
        'Support the maintenance of strong bones',
        'Bone health supplement'
      ],
      details: 'Ostical-D Tablets are a bone health supplement manufactured by Biomed Innovation Pharmaceuticals. The product is formulated with Calcium Carbonate, Magnesium, Zinc, Vitamin D3, and Vitamin K, designed to help remove joint pain and support the development of healthy bones & teeth, while also supporting the maintenance of strong bones. Packaging: 30 tablets per box.',
      directions: 'Take as directed by a healthcare professional. Consult a physician if you are pregnant, breastfeeding, on other medications, or have any medical conditions.',
      ingredients: [
        { name: 'Calcium Carbonate', amount: 'As per formulation' },
        { name: 'Magnesium', amount: 'As per formulation' },
        { name: 'Zinc', amount: 'As per formulation' },
        { name: 'Vitamin D3', amount: 'As per formulation' },
        { name: 'Vitamin K', amount: 'As per formulation' }
      ]
    },
    'prod-3': {
      id: 'prod-3',
      name: 'Tablet Zincoo 50mg',
      rating: 4.7,
      reviews: 142,
      questions: 6,
      originalPrice: 950,
      discountedPrice: 950,
      images: [
        '/assets/new-products/product-3.jpeg'
      ],
      packSize: 'As per pack',
      wellnessCoins: 950,
      inStock: true,
      helps: [
        'Boosts immune system performance',
        'Enhances skin health and appearance',
        'Supports cellular growth and repair'
      ],
      details: 'Zincoo ZINC is a high-quality zinc supplement formulated with Zinc Gluconate 50mg per serving. It supports immune function, promotes skin health, and aids in cell growth. The product is manufactured by Biomed, emphasizing natural ingredients for optimal absorption. Key benefits include boosting immune system performance, enhancing skin health and appearance, and supporting cellular growth and repair.',
      directions: 'As a dietary supplement, take as directed by a healthcare professional. Consult a physician if you are pregnant, breastfeeding, on other medications, or have any medical conditions.',
      ingredients: [
        { name: 'Zinc Gluconate', amount: '50 mg' }
      ]
    },
    'prod-4': {
      id: 'prod-4',
      name: 'Glutamed capsule 30s',
      rating: 4.9,
      reviews: 203,
      questions: 7,
      originalPrice: 4300,
      discountedPrice: 4300,
      images: [
        '/assets/new-products/product-4.jpeg'
      ],
      packSize: '30 Capsules',
      wellnessCoins: 4300,
      inStock: true,
      helps: [
        'Skin Lightening: helps improve skin tone and brightness',
        'Detoxification: supports the body\'s natural detox processes',
        'Anti-Aging: aids in reducing signs of aging'
      ],
      details: 'Glutamed L-Glutathione with Vitamin C is a dietary supplement manufactured by Biomed Innovation Pharmaceuticals Pvt Ltd. The product is packaged in a bottle of 30 capsules and is promoted for skin benefits, including skin lightening to help improve skin tone and brightness, detoxification to support the body\'s natural detox processes, and anti-aging to aid in reducing signs of aging. The formulation combines L-Glutathione with Vitamin C for enhanced antioxidant effects.',
      directions: 'Take as directed by a healthcare professional. Consult a physician if you are pregnant, breastfeeding, on other medications, or have any medical conditions.',
      ingredients: [
        { name: 'L-Glutathione', amount: 'As per formulation' },
        { name: 'Vitamin C', amount: 'As per formulation' }
      ]
    },
    'prod-5': {
      id: 'prod-5',
      name: 'Bemega (Omega-3 500mg) Capsule – BioMed Innovation',
      rating: 4.8,
      reviews: 167,
      questions: 6,
      originalPrice: 1590,
      discountedPrice: 1590,
      images: [
        '/assets/new-products/product-5.jpeg'
      ],
      packSize: '30 Capsules',
      wellnessCoins: 1590,
      inStock: true,
      helps: [
        'Heart Health: Supports cardiovascular function and helps maintain healthy triglyceride levels',
        'Brain Function: Enhances cognitive performance and mental clarity',
        'Joint Support: Promotes joint mobility and reduces inflammation'
      ],
      details: 'Bomega Omega-3 500mg is a premium dietary supplement marketed by BioMed Innovation Pharmaceuticals (Pvt) Ltd. Each bottle contains 30 softgel capsules, providing 500mg of high-quality Omega-3 fish oil per capsule. Key benefits include heart health to support cardiovascular function and help maintain healthy triglyceride levels, brain function to enhance cognitive performance and mental clarity, and joint support to promote joint mobility and reduce inflammation. Packaging: Black bottle with a white cap; label highlights heart, brain, and joint health icons along with a fish & oil droplet graphic.',
      directions: 'Take 1 capsule daily with meals, or as directed by a healthcare professional. Consult a physician before use if you are pregnant, nursing, or on medication. Not suitable for those with fish or shellfish allergies.',
      ingredients: [
        { name: 'Fish oil (EPA & DHA)', amount: '500 mg' },
        { name: 'Gelatin', amount: 'As per formulation' },
        { name: 'Glycerin', amount: 'As per formulation' },
        { name: 'Purified water', amount: 'As per formulation' }
      ]
    },
    'prod-6': {
      id: 'prod-6',
      name: 'Bio-12 Tablets (Mecobalamin 2000mcg)',
      rating: 4.7,
      reviews: 128,
      questions: 5,
      originalPrice: 1420,
      discountedPrice: 1420,
      images: [
        '/assets/new-products/product-6.jpeg'
      ],
      packSize: 'As per pack',
      wellnessCoins: 1420,
      inStock: true,
      helps: [
        'Supports nervous system function and energy levels',
        'Promotes healthy red blood cells',
        'Supports nerve health and energy metabolism'
      ],
      details: 'Bio-12 is a dietary supplement in tablet form containing Mecobalamin 2000mcg, a form of Vitamin B12. It supports nerve health, energy metabolism, and red blood cell production. The product is marketed by Biomed Pharmaceuticals and is promoted for nervous system maintenance and increased body energy. Key features include Mecobalamin 2000mcg per tablet, supports nervous system function and energy levels, promotes healthy red blood cells, and tablet form for easy consumption.',
      directions: 'Take as directed by a healthcare professional. Consult a physician if you are pregnant, breastfeeding, on other medications, or have any medical conditions.',
      ingredients: [
        { name: 'Mecobalamin', amount: '2000 mcg' }
      ]
    },
    'prod-7': {
      id: 'prod-7',
      name: 'Nurose Collagen capsules',
      rating: 4.7,
      reviews: 95,
      questions: 4,
      originalPrice: 1990,
      discountedPrice: 1990,
      images: [
        '/assets/new-products/product-7.jpeg'
      ],
      packSize: '30 Capsules',
      wellnessCoins: 1990,
      inStock: true,
      helps: [
        'Thicker, healthier hair – thanks to biotin and collagen nourishment',
        'Youthful skin – collagen and vitamin C improve texture and reduce signs of aging',
        'Stronger nails – biotin fortifies nail structure for less splitting'
      ],
      details: 'Nurose Collagen capsules are a dietary supplement packed with Vitamin C (20 mg), Biotin (2500 mcg), and Collagen (1000 mg) in each dose. The blend works to boost beauty and wellness from the inside out. Collagen (1000 mg) supports skin elasticity and joint health, helping you achieve youthful, radiant skin and stronger connective tissues. Biotin (2500 mcg) promotes healthy hair and nails, making them thicker and less prone to breakage. Vitamin C (20 mg) enhances collagen synthesis and acts as an antioxidant, protecting skin cells and boosting overall immunity. Together, these ingredients deliver three key benefits: thicker, healthier hair, youthful skin, and stronger nails. Each pack contains 30 capsules, to be taken daily with a meal for best results. Marketed by Biomed Innovation Pharmaceuticals under the DRAP Act 2012.',
      directions: 'Take 1 capsule daily with a meal for best results, or as directed by a healthcare professional. Consult a physician if you are pregnant, breastfeeding, on other medications, or have any medical conditions.',
      ingredients: [
        { name: 'Collagen', amount: '1000 mg' },
        { name: 'Biotin', amount: '2500 mcg' },
        { name: 'Vitamin C', amount: '20 mg' }
      ]
    },
    'prod-8': {
      id: 'prod-8',
      name: 'NORO tablet 20s',
      rating: 4.6,
      reviews: 112,
      questions: 5,
      originalPrice: 1400,
      discountedPrice: 1400,
      images: [
        '/assets/new-products/product-8.jpeg'
      ],
      packSize: '20 Tablets',
      wellnessCoins: 1400,
      inStock: true,
      helps: [
        'Supports cognitive health',
        'Promotes healthy RBC formation',
        'Enhances energy levels'
      ],
      details: 'Noro tablets are a nutraceutical dietary supplement marketed by Biomed Innovation Pharmaceuticals Pvt Ltd. Each tablet contains Calcium L-5-Methyltetrahydrofolate (490 mcg), Vitamin B6 (1.3 mg), and Vitamin B12 (1 mcg). The product is designed to support cognitive function, healthy red blood cell formation, and boost energy levels. Noro is intended for adult men only and should be taken as one tablet daily with a meal or as directed by a physician. Key features include supporting cognitive health, promoting healthy RBC formation, enhancing energy levels, and being GMP certified & compliant with DRAP Act 2012.',
      directions: 'Take one tablet daily with food or as prescribed. Keep out of reach of children and store in a cool, dry place away from sunlight. For adult men only. Consult a physician if you are pregnant, breastfeeding, on other medications, or have any medical conditions.',
      ingredients: [
        { name: 'Calcium L-5-Methyltetrahydrofolate', amount: '490 mcg' },
        { name: 'Vitamin B6', amount: '1.3 mg' },
        { name: 'Vitamin B12', amount: '1 mcg' }
      ]
    },
    'prod-9': {
      id: 'prod-9',
      name: 'VNUR MEN Once a Day Multi – Dietary Supplement',
      rating: 4.7,
      reviews: 145,
      questions: 7,
      originalPrice: 1890,
      discountedPrice: 1890,
      images: [
        '/assets/new-products/product-9.jpeg'
      ],
      packSize: '30 Tablets',
      wellnessCoins: 1890,
      inStock: true,
      helps: [
        'Nutritional support for overall health',
        'Energy metabolism enhancement',
        'Muscle strength assistance',
        'Immunity boost'
      ],
      details: 'A once‑daily multivitamin tablet formulated for adult men, enriched with Coenzyme Q10, Ginkgo biloba, L‑Carnitine & L‑Arginine. Key benefits include nutritional support for overall health, energy metabolism enhancement, muscle strength assistance, and immunity boost. Pack of 30 tablets (serving size = 1 tablet). Complies with DRAP Act 2012; GMP certified. This is a nutraceutical supplement, not a treatment for any disease.',
      directions: 'Take one tablet daily with a meal or as directed by a physician. Do not exceed the recommended dose. For adult men only. Consult a physician before use if taking other medications or allergic to any ingredient. Discontinue use and consult a doctor if any adverse reaction occurs. Store in a cool, dry place away from sunlight, heat & moisture. Keep out of reach of children.',
      ingredients: [
        { name: 'Retinol acetate (Vitamin A)', amount: '3500 IU' },
        { name: 'Ascorbic acid (Vitamin C)', amount: '60 mg' },
        { name: 'Cholecalciferol (Vitamin D3)', amount: '1000 IU' },
        { name: 'Alpha tocopherol acetate (Vitamin E)', amount: '50 IU' },
        { name: 'Coenzyme Q10', amount: '50 mg' },
        { name: 'L‑Arginine', amount: '100 mg' },
        { name: 'L‑Carnitine', amount: '20 mg' },
        { name: 'Ginkgo biloba extract', amount: '50 mg' },
        { name: 'Thiamine HCL (Vitamin B1)', amount: '2 mg' },
        { name: 'Riboflavin (Vitamin B2)', amount: '2 mg' },
        { name: 'Niacin (Vitamin B3)', amount: '30 mg' },
        { name: 'Pyridoxine HCL (Vitamin B6)', amount: '10 mg' },
        { name: 'Folic acid', amount: '400 mcg' },
        { name: 'Cyanocobalamine (Vitamin B12)', amount: '50 mcg' },
        { name: 'Biotin', amount: '500 mcg' },
        { name: 'Calcium pantothenate', amount: '10 mg' }
      ]
    },
    'prod-10': {
      id: 'prod-10',
      name: 'VNUR WOMEN tablets 30s',
      rating: 4.7,
      reviews: 156,
      questions: 7,
      originalPrice: 1890,
      discountedPrice: 1890,
      images: [
        '/assets/new-products/product-10.jpeg'
      ],
      packSize: '30 Tablets',
      wellnessCoins: 1890,
      inStock: true,
      helps: [
        'Nutritional support for overall health',
        'Energy metabolism boost',
        'Healthy hair, skin & nails',
        'Immunity enhancement'
      ],
      details: 'Biomed Innovation Pharmaceuticals – VNUR WOMEN Once a Day Multi – Dietary Supplement. A once‑daily multivitamin tablet specially formulated for adult women, enriched with Inositol, Alpha Lipoic Acid & Biotin 2500 mcg. Key benefits include nutritional support for overall health, energy metabolism boost, healthy hair, skin & nails, and immunity enhancement. Pack of 30 tablets (serving size = 1 tablet). Complies with DRAP Act 2012; GMP certified. This is a nutraceutical supplement, not a treatment for any disease.',
      directions: 'Take one tablet daily with a meal or as directed by a physician. Do not exceed the recommended dose. For adult women only. Consult a physician if pregnant, breastfeeding, on other medications, or allergic to any ingredient. Stop use and seek medical advice if any adverse reaction occurs. Store in a cool, dry place away from sunlight, heat & moisture. Keep out of children\'s reach.',
      ingredients: [
        { name: 'Retinol acetate (Vit A)', amount: '2500 IU' },
        { name: 'Ascorbic acid (Vit C)', amount: '100 mg' },
        { name: 'Cholecalciferol (Vit D3)', amount: '800 IU' },
        { name: 'Alpha tocopherol acetate (Vit E)', amount: '30 IU' },
        { name: 'Thiamine HCL (Vit B1)', amount: '1.5 mg' },
        { name: 'Riboflavin (Vit B2)', amount: '2 mg' },
        { name: 'Niacin (Vit B3)', amount: '22 mg' },
        { name: 'Pyridoxine HCL (Vit B6)', amount: '2 mg' },
        { name: 'Folic acid', amount: '600 mcg' },
        { name: 'Cyanocobalamin (Vit B12)', amount: '10 mcg' },
        { name: 'Biotin', amount: '2500 mcg' },
        { name: 'Calcium Pantothenate', amount: '15 mg' },
        { name: 'Vitamin K2', amount: '90 mcg' },
        { name: 'Inositol', amount: '50 mg' },
        { name: 'Coenzyme Q10', amount: '30 mg' },
        { name: 'Alpha Lipoic Acid', amount: '25 mg' }
      ]
    },
    'prod-11': {
      id: 'prod-11',
      name: 'Teenur tablet 30s',
      rating: 4.6,
      reviews: 112,
      questions: 6,
      originalPrice: 1590,
      discountedPrice: 1590,
      images: [
        '/assets/new-products/product-11.jpeg'
      ],
      packSize: '30 Tablets',
      wellnessCoins: 1590,
      inStock: true,
      helps: [
        'Hair Growth: strengthens follicles, promotes growth & reduces loss',
        'Nail Health: strengthens nails & reduces breakage',
        'Skin Health: improves hydration, elasticity & texture',
        'Overall Wellness: supports general health, energy & immune function'
      ],
      details: 'Biotin + Keratin is a dietary supplement tablet containing Biotin 2500mcg and Hydrolyzed Keratin 250mg. It is designed for adult men and supports hair growth by strengthening follicles, promoting growth & reducing loss. For nail health, it strengthens nails & reduces breakage. It improves skin health by enhancing hydration, elasticity & texture. Keratin benefits include rebuilding hair, strengthening hair & nails, and enhancing skin elasticity. Overall, it supports general health, energy & immune function. Each pack contains 30 tablets, to be taken one tablet daily with a meal or as directed by a physician. Approved according to DRAP Act 2012.',
      directions: 'Take one tablet daily with a meal or as directed by a physician. Do not exceed the recommended dose. For adult men only. Consult a physician if you are on other medications or have allergies. Discontinue use if any adverse reaction occurs. Keep out of reach of children. Store in a cool, dry place, protected from sunlight, heat & moisture.',
      ingredients: [
        { name: 'Biotin', amount: '2500 mcg' },
        { name: 'Hydrolyzed Keratin', amount: '250 mg' }
      ]
    },
    'prod-12': {
      id: 'prod-12',
      name: 'X‑NUR 30s tablet',
      rating: 4.8,
      reviews: 189,
      questions: 8,
      originalPrice: 2990,
      discountedPrice: 2990,
      images: [
        '/assets/new-products/product-12.jpeg'
      ],
      packSize: '30 Tablets',
      wellnessCoins: 2990,
      inStock: true,
      helps: [
        'Boosts testosterone',
        'Enhances muscle strength & performance',
        'Supports mental health & stamina',
        'Increases energy levels'
      ],
      details: 'X‑NUR herbal supplement tablets by Biomed Innovation Pharmaceuticals. Benefits include boosting testosterone, enhancing muscle strength & performance, supporting mental health & stamina, and increasing energy levels. Pack of 30 tablets per bottle. GMP certified & DRAP compliant. This is a nutraceutical supplement, not a treatment for any disease.',
      directions: 'Take 1 tablet daily with a meal. For adult men only. Consult a doctor if on other meds or allergic. Store cool & dry. Keep out of children\'s reach.',
      ingredients: [
        { name: 'Horny goat weed extract (MS)', amount: '300 mg' },
        { name: 'Tribulus terrestris extract (MS)', amount: '250 mg' },
        { name: 'Maca root extract (MS)', amount: '75 mg' },
        { name: 'Panax ginseng extract (USP)', amount: '50 mg' },
        { name: 'Muira puama extract (MS)', amount: '75 mg' },
        { name: 'Yohimbe bark extract (MS)', amount: '5 mg' },
        { name: 'Saw palmetto berry powder extract (MS)', amount: '40 mg' },
        { name: 'Ginkgo biloba extract (USP)', amount: '40 mg' },
        { name: 'L‑Arginine HCl (USP)', amount: '100 mg' },
        { name: 'Vitamin E (USP)', amount: '30 mg' }
      ]
    },
    'prod-13': {
      id: 'prod-13',
      name: 'Ostical-D Syrup',
      rating: 4.6,
      reviews: 95,
      questions: 5,
      originalPrice: 780,
      discountedPrice: 780,
      images: [
        '/assets/new-products/product-13.jpeg'
      ],
      packSize: '1 Bottle',
      wellnessCoins: 780,
      inStock: true,
      helps: [
        'Helps remove joint pain',
        'Supports the development of healthy bones & teeth',
        'Supports the maintenance of strong bones',
        'Bone health supplement'
      ],
      details: 'Ostical-D Syrup is a bone health supplement by Biomed Innovation Pharmaceuticals. It contains Calcium Carbonate, Magnesium, Zinc, Vitamin D3, and Vitamin K. The syrup is designed to help remove joint pain and support the development of healthy bones & teeth, while also supporting the maintenance of strong bones.',
      directions: 'Take as directed by a healthcare professional. Consult a physician if you are pregnant, breastfeeding, on other medications, or have any medical conditions.',
      ingredients: [
        { name: 'Calcium Carbonate', amount: 'As per formulation' },
        { name: 'Magnesium', amount: 'As per formulation' },
        { name: 'Zinc', amount: 'As per formulation' },
        { name: 'Vitamin D3', amount: 'As per formulation' },
        { name: 'Vitamin K', amount: 'As per formulation' }
      ]
    },
    'prod-14': {
      id: 'prod-14',
      name: 'DeAll softgel Capsules 1s',
      rating: 4.8,
      reviews: 98,
      questions: 5,
      originalPrice: 435,
      discountedPrice: 435,
      images: [
        '/assets/new-products/product-14.jpeg'
      ],
      packSize: '1 Softgel',
      wellnessCoins: 435,
      inStock: true,
      helps: [
        'Immune Health: Boosts the body\'s natural defense system',
        'Energy & Vitality: Enhances overall energy levels for daily performance',
        'Muscle Health: Supports muscle function and recovery',
        'Bone Health: Promotes calcium utilization for strong bones and teeth'
      ],
      details: 'DeAll (D3 200,000 IU & Vitamin 75mcg K2) Softgel – BioMed Innovation Pharmaceuticals Pvt Ltd. DeAll is a premium softgel supplement that combines Vitamin D3 (200,000 IU) with Vitamin K2, formulated by BioMed Innovation Pharmaceuticals Pvt Ltd. This powerful blend supports multiple aspects of health, including immune function, energy & vitality, muscle strength, and bone health. Vitamin D3 ensures optimal calcium absorption, while Vitamin K2 directs calcium to the bones and teeth, promoting overall skeletal wellness.',
      directions: 'Take 1 softgel as directed by a healthcare professional, preferably with a meal for better absorption. Do not exceed the recommended dose. Consult a physician if you are pregnant, breastfeeding, on other medications, or have any medical conditions.',
      ingredients: [
        { name: 'Vitamin D3 (Cholecalciferol)', amount: '200,000 IU' },
        { name: 'Vitamin K2 (Menaquinone)', amount: '75 mcg' }
      ]
    }
  };

  // Get current product based on URL parameter
  const product = productsDatabase[id] || productsDatabase['prod-1'];

  // All products from landing page
  const allProducts = [
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

  // Filter out current product and get related products
  const relatedProducts = allProducts.filter(p => p.id !== id);

  const certifications = ['ISO', 'GMP', 'DRAP', 'HACCP', 'HALAL', 'NON GMO', 'VEGAN'];

  // Show message if product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Main Product Section */}
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow p-6 mb-6">
          {/* Left Side - Images */}
          <div>
            {/* Main Image/Video - Sticky */}
            <div className="sticky top-4">
              <div className="bg-gray-50 rounded-lg p-8 mb-3 flex items-center justify-center h-[500px]">
                <img 
                  src={product.images && product.images[selectedImage] ? product.images[selectedImage] : '/assets/new-products/product-1.jpeg'} 
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              {/* Thumbnail Images - Show if more than 1 image */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
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

          {/* Right Side - Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
            
            {/* Stock Status */}
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
            
            {/* Reviews */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">{product.reviews} reviews</span>
              </div>
              <span className="text-xs text-gray-600">{product.questions} questions</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-biomed-teal">Rs. {product.discountedPrice}</span>
                {product.originalPrice > product.discountedPrice && (
                  <span className="text-base text-gray-400 line-through">Rs. {product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Helps Section */}
            <div className="mb-4 bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Helps to:</h3>
              <ul className="space-y-1">
                {product.helps.map((help, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-biomed-teal text-xs mt-0.5">•</span>
                    <span className="text-xs text-gray-700">{help}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pack Size */}
            <div className="mb-3">
              <label className="block text-xs font-semibold mb-1">Pack Size:</label>
              <button className="px-4 py-1.5 bg-biomed-navy text-white rounded text-sm font-semibold">
                {product.packSize}
              </button>
            </div>

            {/* Quantity Selector */}
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

            {/* Wellness Coins */}
            <div className="mb-4 bg-purple-50 p-3 rounded-lg">
              <p className="text-sm font-semibold text-purple-700">{product.wellnessCoins} Wellness Coins</p>
              <a href="#" className="text-xs text-purple-600 underline">How it works?</a>
            </div>

            {/* Subtotal */}
            <div className="mb-4">
              <p className="text-base font-semibold">Subtotal: <span className="text-biomed-teal">Rs. {product.discountedPrice * quantity}</span></p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              <button 
                onClick={() => addToCart({...product, quantity, image: product.images && product.images[0] ? product.images[0] : '/assets/products/main-product.jpeg'})}
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
                disabled={!product.inStock}
                className={`flex-1 py-2.5 rounded-lg font-semibold text-sm ${
                  product.inStock
                    ? 'bg-white border-2 border-gray-800 hover:bg-gray-50 text-gray-800'
                    : 'bg-gray-100 border-2 border-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                BUY IT NOW
              </button>
            </div>

            {/* Product Information Accordion */}
            <div className="my-4 border rounded-lg overflow-hidden">
              {/* Product Details */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection('details')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Product Details</h3>
                  <ChevronDown size={16} className={`transform transition-transform duration-300 ${expandedSections.details ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${expandedSections.details ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-3 pb-2">
                    <p className="text-xs text-gray-700 leading-relaxed">{product.details}</p>
                  </div>
                </div>
              </div>

              {/* Directions */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection('directions')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Directions</h3>
                  <ChevronDown size={16} className={`transform transition-transform duration-300 ${expandedSections.directions ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${expandedSections.directions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-3 pb-2">
                    <p className="text-xs text-gray-700">{product.directions}</p>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection('ingredients')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Ingredients</h3>
                  <ChevronDown size={16} className={`transform transition-transform duration-300 ${expandedSections.ingredients ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.ingredients ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-3 pb-2">
                    <p className="text-[10px] font-semibold mb-1">Serving Size: One (1) Tablet</p>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-1 text-[10px]">Each Tablet Contains:</th>
                          <th className="text-left py-1 text-[10px]">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.ingredients.map((ingredient, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-1 text-[10px]">{ingredient.name}</td>
                            <td className="py-1 text-[10px]">{ingredient.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="border-b">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">FAQs</h3>
                  <ChevronDown size={16} className={`transform transition-transform duration-300 ${expandedSections.faqs ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${expandedSections.faqs ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-3 pb-2">
                    <p className="text-xs text-gray-700">Frequently asked questions content goes here...</p>
                  </div>
                </div>
              </div>

              {/* Customer Reviews */}
              <div>
                <button
                  onClick={() => toggleSection('reviews')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Customer Reviews</h3>
                  <ChevronDown size={16} className={`transform transition-transform duration-300 ${expandedSections.reviews ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${expandedSections.reviews ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-3 pb-2">
                    <p className="text-xs text-gray-700">Customer reviews will appear here...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
        
          </div>
        </div>


        {/* You May Also Like */}
        {/* <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">YOU MAY ALSO LIKE</h2>
          <div className="relative">
            <div 
              ref={relatedScrollRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              {relatedProducts.map((prod) => (
                <Link 
                  key={prod.id} 
                  to={`/product/${prod.id}`}
                  className="min-w-[200px] bg-gray-50 rounded-lg p-3 hover:shadow-lg transition-shadow flex-shrink-0 block"
                >
                  <div className="h-40 flex items-center justify-center mb-3 relative">
                    <img src={prod.image} alt={prod.name} className="max-h-full object-contain" />
                    {prod.originalPrice && prod.discountedPrice && prod.originalPrice > prod.discountedPrice && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded">
                        {Math.round(((prod.originalPrice - prod.discountedPrice) / prod.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold mb-2 line-clamp-2">{prod.name}</h3>
                  <div className="flex items-center gap-1.5 mb-2">
                    {prod.originalPrice && (
                      <span className="text-gray-400 line-through text-xs">Rs. {prod.originalPrice}</span>
                    )}
                    <span className="text-base font-bold text-biomed-teal">Rs. {prod.discountedPrice}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(prod);
                    }}
                    className="w-full bg-biomed-navy hover:bg-biomed-navy/90 text-white py-1.5 rounded text-xs font-semibold"
                  >
                    Add to Cart
                  </button>
                </Link>
              ))}
            </div>
            <button 
              onClick={scrollRelatedLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-1.5 hover:bg-gray-100 transition-colors z-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={scrollRelatedRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-1.5 hover:bg-gray-100 transition-colors z-10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;

