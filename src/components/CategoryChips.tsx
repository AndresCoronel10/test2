import React from 'react';
import { Category } from '../types';
import clsx from 'clsx';

interface CategoryChipsProps {
  selected: Category;
  onSelect: (category: Category) => void;
  categories: Category[];
}

export function CategoryChips({ selected, onSelect, categories }: CategoryChipsProps) {
  const getCategoryLabel = (category: Category): string => {
    switch (category) {
      case 'all':
        return 'All Categories';
      case 'restaurants':
        return 'Restaurants';
      case 'electronics':
        return 'Electronics';
      case 'entertainment':
        return 'Entertainment';
      case 'groceries':
        return 'Groceries';
      default:
        return category;
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={clsx(
            'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border',
            selected === category
              ? 'bg-[#0f265c] text-white shadow-sm shadow-[#0f265c]/25 border-[#0f265c]'
              : 'bg-[#f4f6f9] text-gray-600 hover:bg-gray-200 hover:text-gray-900 border-[#D3D9E7]'
          )}
        >
          {getCategoryLabel(category)}
        </button>
      ))}
    </div>
  );
}