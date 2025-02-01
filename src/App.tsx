import React, { useState } from 'react';
import { QrCode, CreditCard, Wallet, Heart, Home, Search, ArrowLeft } from 'lucide-react';
import { PromotionGrid } from './components/PromotionGrid';
import { BrowserBar } from './components/BrowserBar';
import { PaymentTabs } from './components/PaymentTabs';
import { CategoryChips } from './components/CategoryChips';
import { PromotionModal } from './components/PromotionModal';
import { SearchBar } from './components/SearchBar';
import { SearchOverlay } from './components/SearchOverlay';
import { SearchResults } from './components/SearchResults';
import { Promotion, PaymentMethod, Category } from './types';

const promotions: Promotion[] = [
  // Restaurants (7)
  {
    id: 1,
    title: '20% off at Fine Dining',
    description: 'Get 20% off at luxury restaurants with QR Deuna',
    fullDescription: 'Enjoy an exclusive 20% discount at participating fine dining restaurants when you pay with QR Deuna.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
    terms: 'Valid until December 31, 2023. Maximum discount of $50.',
    paymentMethod: 'qr-deuna',
    category: 'restaurants',
    isNew: true,
    shopName: 'Gourmet Collection',
    shopLogo: 'https://ui-avatars.com/api/?name=GC&background=6366f1&color=fff',
    location: 'Premium locations',
    deadline: '2023-12-31'
  },
  {
    id: 2,
    title: '2x1 on Sushi',
    description: 'Buy one, get one free on all sushi rolls',
    fullDescription: 'Double your sushi experience with our buy one get one free offer on all sushi rolls when paying with credit card.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=300&fit=crop',
    terms: 'Valid for dine-in only. Equal or lesser value.',
    paymentMethod: 'credit-card',
    category: 'restaurants',
    shopName: 'Sushi Master',
    shopLogo: 'https://ui-avatars.com/api/?name=SM&background=6366f1&color=fff',
    location: 'All locations',
    deadline: '2024-01-31'
  },
  {
    id: 3,
    title: '30% off Breakfast',
    description: 'Start your day with savings at cafes',
    fullDescription: 'Get 30% off your breakfast order at participating cafes when using your digital debit card.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&h=300&fit=crop',
    terms: 'Valid 7AM-11AM. Maximum discount $15.',
    paymentMethod: 'digital-debit',
    category: 'restaurants',
    shopName: 'Cafe Network',
    shopLogo: 'https://ui-avatars.com/api/?name=CN&background=6366f1&color=fff',
    location: 'Participating cafes',
    deadline: '2024-02-28'
  },
  {
    id: 4,
    title: '15% off Italian Food',
    description: 'Enjoy Italian cuisine for less',
    fullDescription: 'Save 15% on your entire bill at authentic Italian restaurants using your debit card.',
    image: 'https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=500&h=300&fit=crop',
    terms: 'Excludes alcohol. Minimum spend $30.',
    paymentMethod: 'debit-card',
    category: 'restaurants',
    shopName: 'Italia Bella',
    shopLogo: 'https://ui-avatars.com/api/?name=IB&background=6366f1&color=fff',
    location: 'Selected restaurants',
    deadline: '2024-03-15'
  },
  {
    id: 5,
    title: 'Free Dessert',
    description: 'Complimentary dessert with main course',
    fullDescription: 'Get a free dessert with any main course purchase when paying with QR Deuna.',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&h=300&fit=crop',
    terms: 'One dessert per table. Selected menu items.',
    paymentMethod: 'qr-deuna',
    category: 'restaurants',
    isNew: true,
    shopName: 'Sweet Endings',
    shopLogo: 'https://ui-avatars.com/api/?name=SE&background=6366f1&color=fff',
    location: 'All branches',
    deadline: '2024-02-15'
  },
  {
    id: 6,
    title: '40% off Family Meals',
    description: 'Big savings on family-size portions',
    fullDescription: 'Save 40% on family meal packages when paying with your credit card.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=300&fit=crop',
    terms: 'Valid for groups of 4 or more.',
    paymentMethod: 'credit-card',
    category: 'restaurants',
    shopName: 'Family Feast',
    shopLogo: 'https://ui-avatars.com/api/?name=FF&background=6366f1&color=fff',
    location: 'Nationwide',
    deadline: '2024-04-30'
  },
  {
    id: 7,
    title: '25% off Street Food',
    description: 'Save on local street food favorites',
    fullDescription: 'Get 25% off at participating street food vendors when using digital debit.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop',
    terms: 'Maximum discount $10 per transaction.',
    paymentMethod: 'digital-debit',
    category: 'restaurants',
    shopName: 'Street Eats',
    shopLogo: 'https://ui-avatars.com/api/?name=SE&background=6366f1&color=fff',
    location: 'Food courts',
    deadline: '2024-03-31'
  },

  // Electronics (7)
  {
    id: 8,
    title: '30% off Smartphones',
    description: 'Save on latest smartphone models',
    fullDescription: 'Get 30% off on selected smartphone models when paying with QR Deuna.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop',
    terms: 'Selected models only. While stocks last.',
    paymentMethod: 'qr-deuna',
    category: 'electronics',
    isNew: true,
    shopName: 'Phone Hub',
    shopLogo: 'https://ui-avatars.com/api/?name=PH&background=6366f1&color=fff',
    location: 'All stores',
    deadline: '2024-01-31'
  },
  {
    id: 9,
    title: '40% off Laptops',
    description: 'Huge savings on laptop computers',
    fullDescription: 'Save 40% on selected laptop models with your credit card purchase.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop',
    terms: 'Limited to one laptop per customer.',
    paymentMethod: 'credit-card',
    category: 'electronics',
    shopName: 'Tech World',
    shopLogo: 'https://ui-avatars.com/api/?name=TW&background=6366f1&color=fff',
    location: 'Major retailers',
    deadline: '2024-02-28'
  },
  {
    id: 10,
    title: '25% off Tablets',
    description: 'Discounts on popular tablets',
    fullDescription: 'Get 25% off tablets when paying with your digital debit card.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=300&fit=crop',
    terms: 'Valid on tablets over $300.',
    paymentMethod: 'digital-debit',
    category: 'electronics',
    shopName: 'Gadget Store',
    shopLogo: 'https://ui-avatars.com/api/?name=GS&background=6366f1&color=fff',
    location: 'Online only',
    deadline: '2024-03-15'
  },
  {
    id: 11,
    title: '20% off Accessories',
    description: 'Save on tech accessories',
    fullDescription: 'Get 20% off all electronic accessories with your debit card.',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=300&fit=crop',
    terms: 'Minimum purchase $50.',
    paymentMethod: 'debit-card',
    category: 'electronics',
    shopName: 'Accessory Plus',
    shopLogo: 'https://ui-avatars.com/api/?name=AP&background=6366f1&color=fff',
    location: 'All branches',
    deadline: '2024-04-30'
  },
  {
    id: 12,
    title: '35% off Smart Home',
    description: 'Upgrade your home for less',
    fullDescription: 'Save 35% on smart home devices with QR Deuna payment.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&h=300&fit=crop',
    terms: 'Selected brands only.',
    paymentMethod: 'qr-deuna',
    category: 'electronics',
    isNew: true,
    shopName: 'Smart Living',
    shopLogo: 'https://ui-avatars.com/api/?name=SL&background=6366f1&color=fff',
    location: 'Flagship stores',
    deadline: '2024-02-15'
  },
  {
    id: 13,
    title: '45% off Gaming',
    description: 'Save on gaming consoles',
    fullDescription: 'Get 45% off gaming consoles and accessories with credit card payment.',
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=500&h=300&fit=crop',
    terms: 'One console per customer.',
    paymentMethod: 'credit-card',
    category: 'electronics',
    shopName: 'Game Zone',
    shopLogo: 'https://ui-avatars.com/api/?name=GZ&background=6366f1&color=fff',
    location: 'Selected stores',
    deadline: '2024-03-31'
  },
  {
    id: 14,
    title: '15% off Cameras',
    description: 'Discounts on digital cameras',
    fullDescription: 'Save 15% on digital cameras and equipment with digital debit.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=300&fit=crop',
    terms: 'Excludes professional equipment.',
    paymentMethod: 'digital-debit',
    category: 'electronics',
    shopName: 'Camera World',
    shopLogo: 'https://ui-avatars.com/api/?name=CW&background=6366f1&color=fff',
    location: 'Specialty stores',
    deadline: '2024-05-31'
  },

  // Entertainment (7)
  {
    id: 15,
    title: '50% off Movies',
    description: 'Half price movie tickets',
    fullDescription: 'Get 50% off movie tickets when paying with QR Deuna.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=300&fit=crop',
    terms: 'Valid Sunday to Thursday.',
    paymentMethod: 'qr-deuna',
    category: 'entertainment',
    isNew: true,
    shopName: 'Cinema City',
    shopLogo: 'https://ui-avatars.com/api/?name=CC&background=6366f1&color=fff',
    location: 'All theaters',
    deadline: '2024-01-31'
  },
  {
    id: 16,
    title: '30% off Theme Parks',
    description: 'Save on theme park tickets',
    fullDescription: 'Enjoy 30% off theme park admission with credit card payment.',
    image: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=500&h=300&fit=crop',
    terms: 'Not valid on holidays.',
    paymentMethod: 'credit-card',
    category: 'entertainment',
    shopName: 'Fun World',
    shopLogo: 'https://ui-avatars.com/api/?name=FW&background=6366f1&color=fff',
    location: 'Partner parks',
    deadline: '2024-02-28'
  },
  {
    id: 17,
    title: '25% off Concerts',
    description: 'Discounts on concert tickets',
    fullDescription: 'Get 25% off concert tickets when using your digital debit card.',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500&h=300&fit=crop',
    terms: 'Selected events only.',
    paymentMethod: 'digital-debit',
    category: 'entertainment',
    shopName: 'Music Live',
    shopLogo: 'https://ui-avatars.com/api/?name=ML&background=6366f1&color=fff',
    location: 'Various venues',
    deadline: '2024-03-31'
  },
  {
    id: 18,
    title: '20% off Museums',
    description: 'Save on museum admissions',
    fullDescription: 'Get 20% off museum tickets with your debit card.',
    image: 'https://images.unsplash.com/photo-1544889673-f81c8b6a1e31?w=500&h=300&fit=crop',
    terms: 'Valid for regular exhibitions.',
    paymentMethod: 'debit-card',
    category: 'entertainment',
    shopName: 'Cultural Hub',
    shopLogo: 'https://ui-avatars.com/api/?name=CH&background=6366f1&color=fff',
    location: 'Partner museums',
    deadline: '2024-04-30'
  },
  {
    id: 19,
    title: '40% off Water Parks',
    description: 'Cool savings on water parks',
    fullDescription: 'Save 40% on water park admission with QR Deuna payment.',
    image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=500&h=300&fit=crop',
    terms: 'Weekdays only.',
    paymentMethod: 'qr-deuna',
    category: 'entertainment',
    isNew: true,
    shopName: 'Splash Zone',
    shopLogo: 'https://ui-avatars.com/api/?name=SZ&background=6366f1&color=fff',
    location: 'All locations',
    deadline: '2024-02-15'
  },
  {
    id: 20,
    title: '35% off Theater',
    description: 'Discounts on theater shows',
    fullDescription: 'Get 35% off theater performance tickets with credit card.',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=500&h=300&fit=crop',
    terms: 'Subject to availability.',
    paymentMethod: 'credit-card',
    category: 'entertainment',
    shopName: 'Stage Arts',
    shopLogo: 'https://ui-avatars.com/api/?name=SA&background=6366f1&color=fff',
    location: 'Major theaters',
    deadline: '2024-03-15'
  },
  {
    id: 21,
    title: '15% off Sports',
    description: 'Save on sporting events',
    fullDescription: 'Get 15% off sports event tickets with digital debit payment.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    terms: 'Regular season games only.',
    paymentMethod: 'digital-debit',
    category: 'entertainment',
    shopName: 'Sports Hub',
    shopLogo: 'https://ui-avatars.com/api/?name=SH&background=6366f1&color=fff',
    location: 'Various venues',
    deadline: '2024-05-31'
  },

  // Groceries (7)
  {
    id: 22,
    title: '25% off Fresh Produce',
    description: 'Save on fruits and vegetables',
    fullDescription: 'Get 25% off all fresh produce when paying with QR Deuna.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop',
    terms: 'Minimum purchase $30.',
    paymentMethod: 'qr-deuna',
    category: 'groceries',
    isNew: true,
    shopName: 'Fresh Market',
    shopLogo: 'https://ui-avatars.com/api/?name=FM&background=6366f1&color=fff',
    location: 'All stores',
    deadline: '2024-01-31'
  },
  {
    id: 23,
    title: '20% off Meat & Seafood',
    description: 'Discounts on premium proteins',
    fullDescription: 'Save 20% on meat and seafood with credit card payment.',
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=500&h=300&fit=crop',
    terms: 'Fresh items only.',
    paymentMethod: 'credit-card',
    category: 'groceries',
    shopName: 'Butcher\'s Best',
    shopLogo: 'https://ui-avatars.com/api/?name=BB&background=6366f1&color=fff',
    location: 'Selected stores',
    deadline: '2024-02-28'
  },
  {
    id: 24,
    title: '15% off Dairy',
    description: 'Save on dairy products',
    fullDescription: 'Get 15% off all dairy products with digital debit card.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&h=300&fit=crop',
    terms: 'Excludes non-dairy alternatives.',
    paymentMethod: 'digital-debit',
    category: 'groceries',
    shopName: 'Daily Fresh',
    shopLogo: 'https://ui-avatars.com/api/?name=DF&background=6366f1&color=fff',
    location: 'All locations',
    deadline: '2024-03-31'
  },
  {
    id: 25,
    title: '30% off Bakery',
    description: 'Fresh bakery discounts',
    fullDescription: 'Save 30% on fresh bakery items with your debit card.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=300&fit=crop',
    terms: 'Valid until 11 AM daily.',
    paymentMethod: 'debit-card',
    category: 'groceries',
    shopName: 'Baker\'s Joy',
    shopLogo: 'https://ui-avatars.com/api/?name=BJ&background=6366f1&color=fff',
    location: 'In-store bakeries',
    deadline: '2024-04-30'
  },
  {
    id: 26,
    title: '40% off Organic',
    description: 'Save on organic products',
    fullDescription: 'Get 40% off organic products with QR Deuna payment.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop',
    terms: 'Selected organic items only.',
    paymentMethod: 'qr-deuna',
    category: 'groceries',
    isNew: true,
    shopName: 'Organic Life',
    shopLogo: 'https://ui-avatars.com/api/?name=OL&background=6366f1&color=fff',
    location: 'Specialty stores',
    deadline: '2024-02-15'
  },
  {
    id: 27,
    title: '10% off Bulk Items',
    description: 'Bulk purchase savings',
    fullDescription: 'Save 10% on bulk item purchases with credit card.',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&h=300&fit=crop',
    terms: 'Minimum purchase $100.',
    paymentMethod: 'credit-card',
    category: 'groceries',
    shopName: 'Bulk Barn',
    shopLogo: 'https://ui-avatars.com/api/?name=BB&background=6366f1&color=fff',
    location: 'Warehouse stores',
    deadline: '2024-03-15'
  },
  {
    id: 28,
    title: '35% off Beverages',
    description: 'Discounts on drinks',
    fullDescription: 'Get 35% off all beverages with digital debit payment.',
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500&h=300&fit=crop',
    terms: 'Excludes alcoholic beverages.',
    paymentMethod: 'digital-debit',
    category: 'groceries',
    shopName: 'Drink More',
    shopLogo: 'https://ui-avatars.com/api/?name=DM&background=6366f1&color=fff',
    location: 'All branches',
    deadline: '2024-05-31'
  }
];

export default function App() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('qr-deuna');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Promotion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Get unique categories for the selected payment method
  const availableCategories = Array.from(new Set(
    promotions
      .filter(promo => promo.paymentMethod === selectedPayment)
      .map(promo => promo.category)
  )) as Category[];

  // Reset category selection when changing payment method if the current category
  // isn't available for the new payment method
  React.useEffect(() => {
    if (selectedCategory !== 'all' && !availableCategories.includes(selectedCategory)) {
      setSelectedCategory('all');
    }
  }, [selectedPayment, availableCategories]);

  const filteredPromotions = promotions.filter(promotion => {
    const paymentMatch = promotion.paymentMethod === selectedPayment;
    const categoryMatch = selectedCategory === 'all' || promotion.category === selectedCategory;
    const favoriteMatch = !showFavorites || favorites.includes(promotion.id);
    const searchMatch = 
      searchQuery === '' || 
      promotion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.shopName.toLowerCase().includes(searchQuery.toLowerCase());
    return paymentMatch && categoryMatch && favoriteMatch && searchMatch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev].slice(0, 10));
    }
  };

  const handleShowResults = (results: Promotion[]) => {
    setSearchResults(results);
    setShowSearchOverlay(false);
    setShowSearchResults(true);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const handleBackFromResults = () => {
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="bg-white border-b border-gray-100">
          <div className="relative h-14 flex items-center justify-center px-4 pt-[2px]">
            <button className="absolute left-4 p-2 hover:bg-gray-100 rounded-lg text-[#0f265c]">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-[#0f265c]">
              Descuentos y Beneficios
            </h1>
          </div>
          <div className="px-4 py-2 flex items-center gap-2">
            <div className="flex-1" onClick={() => setShowSearchOverlay(true)}>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`p-3 rounded-xl transition-colors ${
                showFavorites 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
          <div className="px-4 py-2">
            <PaymentTabs selected={selectedPayment} onSelect={setSelectedPayment} />
          </div>
          <div className="px-6 pb-4 border-b border-gray-100">
            <CategoryChips 
              selected={selectedCategory} 
              onSelect={setSelectedCategory}
              categories={['all', ...availableCategories]}
            />
          </div>
        </div>
      </div>

      <main className="pt-64 pb-6">
        <PromotionGrid
          promotions={filteredPromotions}
          onPromotionClick={setSelectedPromotion}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      {selectedPromotion && (
        <PromotionModal
          promotion={selectedPromotion}
          onClose={() => setSelectedPromotion(null)}
          isFavorite={favorites.includes(selectedPromotion.id)}
          onToggleFavorite={() => toggleFavorite(selectedPromotion.id)}
        />
      )}

      {showSearchOverlay && (
        <SearchOverlay
          onClose={() => setShowSearchOverlay(false)}
          onSearch={handleSearch}
          recentSearches={recentSearches}
          onClearRecent={clearRecentSearches}
          promotions={promotions}
          onShowResults={handleShowResults}
          initialQuery={searchQuery}
        />
      )}

      {showSearchResults && (
        <SearchResults
          query={searchQuery}
          results={searchResults}
          onBack={handleBackFromResults}
          onSearch={() => {
            setShowSearchResults(false);
            setShowSearchOverlay(true);
          }}
        />
      )}
    </div>
  );
}