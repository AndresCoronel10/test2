import React from 'react';
import { QrCode, CreditCard, Wallet } from 'lucide-react';
import { PaymentMethod } from '../types';
import clsx from 'clsx';

interface PaymentTabsProps {
  selected: PaymentMethod | 'all';
  onSelect: (method: PaymentMethod | 'all') => void;
}

export function PaymentTabs({ selected, onSelect }: PaymentTabsProps) {
  const tabs = [
    { id: 'qr-deuna', label: 'QR Deuna', icon: QrCode },
    { id: 'credit-card', label: 'Credit Card', icon: CreditCard },
    { id: 'debit-card', label: 'Debit Card', icon: CreditCard },
    { id: 'digital-debit', label: 'Digital Debit', icon: Wallet },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isSelected = selected === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id as PaymentMethod)}
            className="relative flex items-center gap-2 px-3 py-2.5 font-medium whitespace-nowrap transition-colors group"
          >
            <Icon 
              className={clsx(
                "w-4 h-4 transition-colors",
                isSelected ? "text-[#0f265c] stroke-[#0f265c]" : "text-gray-400 group-hover:text-gray-600"
              )} 
            />
            <span className={clsx(
              "transition-colors",
              isSelected ? "text-[#0f265c]" : "text-gray-600 group-hover:text-gray-900"
            )}>
              {tab.label}
            </span>
            {isSelected && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0f265c] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}