import React, { useState } from 'react';
import { ArrowLeft, Search, X, QrCode, CreditCard, Wallet } from 'lucide-react';
import { Promotion, PaymentMethod } from '../types';
import { PromotionCard } from './PromotionCard';
import { PromotionModal } from './PromotionModal';

interface SearchResultsProps {
  query: string;
  results: Promotion[];
  onBack: () => void;
  onSearch: () => void;
}

function getPaymentMethodInfo(method: PaymentMethod) {
  switch (method) {
    case 'qr-deuna':
      return {
        title: 'QR Deuna',
        icon: QrCode,
        color: 'bg-purple-100 text-purple-700'
      };
    case 'credit-card':
      return {
        title: 'Credit Card',
        icon: CreditCard,
        color: 'bg-blue-100 text-blue-700'
      };
    case 'debit-card':
      return {
        title: 'Debit Card',
        icon: CreditCard,
        color: 'bg-green-100 text-green-700'
      };
    case 'digital-debit':
      return {
        title: 'Digital Debit',
        icon: Wallet,
        color: 'bg-orange-100 text-orange-700'
      };
  }
}

export function SearchResults({ query, results, onBack, onSearch }: SearchResultsProps) {
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchText, setSearchText] = useState(query);

  // Group results by payment method
  const groupedResults = React.useMemo(() => {
    const groups = new Map<PaymentMethod, Promotion[]>();
    results.forEach(promotion => {
      const existing = groups.get(promotion.paymentMethod) || [];
      groups.set(promotion.paymentMethod, [...existing, promotion]);
    });
    return groups;
  }, [results]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const handleSearchClick = () => {
    setIsEditing(false);
    onSearch();
  };

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="sticky top-0 bg-white border-b border-gray-100">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div 
            className="relative flex-1"
            onClick={handleSearchClick}
          >
            {isEditing ? (
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full bg-gray-100 rounded-xl pl-11 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                autoFocus
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <div className="w-full bg-gray-100 rounded-xl pl-11 pr-4 py-3 text-gray-900">
                {query}
              </div>
            )}
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500 mb-4">
          {results.length} {results.length === 1 ? 'result' : 'results'} found
        </p>
        <div className="space-y-6">
          {Array.from(groupedResults.entries()).map(([method, promotions]) => {
            const info = getPaymentMethodInfo(method);
            const Icon = info.icon;
            return (
              <div key={method}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-lg ${info.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-semibold text-gray-900">{info.title}</h2>
                  <span className="text-sm text-gray-500">
                    ({promotions.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {promotions.map((promotion) => (
                    <PromotionCard
                      key={promotion.id}
                      promotion={promotion}
                      onClick={() => setSelectedPromotion(promotion)}
                      isFavorite={favorites.includes(promotion.id)}
                      onToggleFavorite={() => toggleFavorite(promotion.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedPromotion && (
        <PromotionModal
          promotion={selectedPromotion}
          onClose={() => setSelectedPromotion(null)}
          isFavorite={favorites.includes(selectedPromotion.id)}
          onToggleFavorite={() => toggleFavorite(selectedPromotion.id)}
        />
      )}
    </div>
  );
}