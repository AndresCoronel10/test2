import React from 'react';
import { PromotionCard } from './PromotionCard';
import { Promotion } from '../types';

interface PromotionGridProps {
  promotions: Promotion[];
  onPromotionClick?: (promotion: Promotion) => void;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
}

export function PromotionGrid({ 
  promotions, 
  onPromotionClick,
  favorites,
  onToggleFavorite
}: PromotionGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-6">
      {promotions.map((promotion) => (
        <PromotionCard
          key={promotion.id}
          promotion={promotion}
          onClick={() => onPromotionClick?.(promotion)}
          isFavorite={favorites.includes(promotion.id)}
          onToggleFavorite={() => onToggleFavorite(promotion.id)}
        />
      ))}
    </div>
  );
}