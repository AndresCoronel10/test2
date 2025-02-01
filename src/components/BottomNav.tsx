import React from 'react';
import { Home, Heart } from 'lucide-react';
import clsx from 'clsx';

interface BottomNavProps {
  activeTab: 'home' | 'favorites';
  onTabChange: (tab: 'home' | 'favorites') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-50">
      <div className="flex items-center justify-around">
        <button
          onClick={() => onTabChange('home')}
          className={clsx(
            'flex flex-col items-center py-3 px-6',
            activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'
          )}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => onTabChange('favorites')}
          className={clsx(
            'flex flex-col items-center py-3 px-6',
            activeTab === 'favorites' ? 'text-blue-600' : 'text-gray-500'
          )}
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">Favorites</span>
        </button>
      </div>
    </div>
  );
}