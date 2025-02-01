import React, { useState, useMemo, useRef } from 'react';
import { X, Clock, Search, TrendingUp, ArrowLeft } from 'lucide-react';
import { Promotion } from '../types';

interface SearchOverlayProps {
  onClose: () => void;
  onSearch: (query: string) => void;
  recentSearches: string[];
  onClearRecent: () => void;
  promotions: Promotion[];
  onShowResults: (results: Promotion[]) => void;
  initialQuery?: string;
}

interface Establishment {
  id: string;
  name: string;
  logo: string;
  category: string;
}

const mostSearched: Establishment[] = [
  {
    id: '1',
    name: 'KFC',
    logo: 'https://ui-avatars.com/api/?name=KFC&background=ef4444&color=fff',
    category: 'Fast Food'
  },
  {
    id: '2',
    name: 'Apple Store',
    logo: 'https://ui-avatars.com/api/?name=AS&background=6366f1&color=fff',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Cinemark',
    logo: 'https://ui-avatars.com/api/?name=CM&background=f59e0b&color=fff',
    category: 'Entertainment'
  },
  {
    id: '4',
    name: 'Supermaxi',
    logo: 'https://ui-avatars.com/api/?name=SM&background=22c55e&color=fff',
    category: 'Groceries'
  },
  {
    id: '5',
    name: 'Sweet & Coffee',
    logo: 'https://ui-avatars.com/api/?name=SC&background=7c3aed&color=fff',
    category: 'Cafes'
  }
];

function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) return <span className="text-black">{text}</span>;
  
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span className="text-black">
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.toLowerCase() === highlight.toLowerCase()
              ? 'text-[#2f7abf] font-bold'
              : ''
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
}

export function SearchOverlay({ 
  onClose, 
  onSearch, 
  recentSearches, 
  onClearRecent,
  promotions,
  onShowResults,
  initialQuery = ''
}: SearchOverlayProps) {
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [showPredictive, setShowPredictive] = useState(!!initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setSearchInput('');
    onSearch('');
    onClose();
  };

  const predictiveResults = useMemo(() => {
    if (!searchInput.trim()) return [];

    const query = searchInput.toLowerCase();
    const results = promotions.filter(promo => 
      promo.title.toLowerCase().includes(query) ||
      promo.shopName.toLowerCase().includes(query) ||
      promo.description.toLowerCase().includes(query)
    );

    return results.slice(0, 5);
  }, [searchInput, promotions]);

  const handleSearch = (query: string) => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    const results = promotions.filter(promo => 
      promo.title.toLowerCase().includes(query.toLowerCase()) ||
      promo.shopName.toLowerCase().includes(query.toLowerCase()) ||
      promo.description.toLowerCase().includes(query.toLowerCase())
    );
    onShowResults(results);
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      handleSearch(searchInput.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setShowPredictive(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePredictiveItemClick = (query: string) => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    handleSearch(query);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white h-full">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowPredictive(true);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search promotions..."
                className="w-full bg-gray-100 rounded-xl pl-11 pr-12 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                autoFocus
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchInput && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <button
                    onClick={handleClearSearch}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {showPredictive && searchInput && predictiveResults.length > 0 ? (
            <div className="p-4">
              <div className="space-y-2">
                {predictiveResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handlePredictiveItemClick(result.title)}
                    className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-4"
                  >
                    <img
                      src={result.shopLogo}
                      alt={result.shopName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3>
                        <HighlightedText text={result.title} highlight={searchInput} />
                      </h3>
                      <p className="text-sm text-gray-500">
                        <HighlightedText text={result.shopName} highlight={searchInput} />
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                  <h2 className="text-base font-semibold text-gray-900">Most Searched</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {mostSearched.map((establishment) => (
                    <button
                      key={establishment.id}
                      onClick={() => handlePredictiveItemClick(establishment.name)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors min-w-[100px]"
                    >
                      <img
                        src={establishment.logo}
                        alt={establishment.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
                          {establishment.name}
                        </p>
                        <p className="text-xs text-gray-500 whitespace-nowrap">
                          {establishment.category}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <h2 className="text-base font-semibold text-gray-900">Recent Searches</h2>
                    </div>
                    <button
                      onClick={onClearRecent}
                      className="text-sm text-blue-600 font-medium hover:text-blue-700"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handlePredictiveItemClick(search)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}