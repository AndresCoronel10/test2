import React from 'react';
import { QrCode, CreditCard, Wallet, Heart, Copy, Check, Eye, EyeOff, MapPin, Clock } from 'lucide-react';
import { Promotion } from '../types';
import clsx from 'clsx';

interface PromotionCardProps {
  promotion: Promotion;
  isDetailed?: boolean;
  onClick?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function PromotionCard({ 
  promotion, 
  isDetailed, 
  onClick,
  isFavorite,
  onToggleFavorite 
}: PromotionCardProps) {
  const [copied, setCopied] = React.useState(false);
  const [showCode, setShowCode] = React.useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.();
  };

  const handleCopyCode = () => {
    const code = getPromotionCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPromotionCode = () => {
    switch (promotion.paymentMethod) {
      case 'credit-card':
        return 'CREDIT2023';
      case 'debit-card':
        return 'DEBIT2023';
      case 'digital-debit':
        return 'DIGITAL2023';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderCTA = () => {
    if (!isDetailed) return null;

    if (promotion.paymentMethod === 'qr-deuna') {
      return (
        <div className="space-y-3">
          <button className="w-full bg-[#ffdd00] text-[#0f265c] rounded-xl px-6 py-3.5 font-semibold hover:bg-[#ffdd00]/90 active:bg-[#ffdd00]/80 transition-colors flex items-center justify-center gap-2">
            <QrCode className="w-5 h-5" />
            Scan QR Code
          </button>
          <p className="text-xs text-center text-gray-500">
            Open your camera or banking app to scan the QR code
          </p>
        </div>
      );
    }

    if (promotion.paymentMethod === 'digital-debit') {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 rounded-lg px-4 py-3.5 font-mono text-gray-700">
              {getPromotionCode()}
            </div>
            <button
              onClick={handleCopyCode}
              className={`${
                copied 
                  ? 'bg-[#0f265c] hover:bg-[#0f265c]/90' 
                  : 'bg-[#ffdd00] hover:bg-[#ffdd00]/90'
              } ${copied ? 'text-white' : 'text-[#0f265c]'} rounded-lg px-4 py-3.5 font-semibold transition-all transform active:scale-[0.98] shadow-lg shadow-[#ffdd00]/25 flex items-center gap-2 min-w-[120px] justify-center`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-center text-gray-500">
            Copy this code and use it at checkout to redeem your promotion
          </p>
        </div>
      );
    }

    if (['credit-card', 'debit-card'].includes(promotion.paymentMethod)) {
      return (
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            {showCode ? (
              <>
                <div className="bg-gray-100 rounded-lg px-4 py-3.5 font-mono text-gray-700">
                  {getPromotionCode()}
                </div>
                <button
                  onClick={() => setShowCode(false)}
                  className="w-full bg-gray-200 text-gray-700 rounded-xl px-6 py-3.5 font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <EyeOff className="w-5 h-5" />
                  Hide Code
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowCode(true)}
                className="w-full bg-[#ffdd00] text-[#0f265c] rounded-xl px-6 py-3.5 font-semibold hover:bg-[#ffdd00]/90 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Show My Code
              </button>
            )}
          </div>
          <p className="text-xs text-center text-gray-500">
            Use this code at checkout to redeem your promotion
          </p>
        </div>
      );
    }

    return (
      <button className="w-full bg-[#ffdd00] text-[#0f265c] rounded-xl px-6 py-3.5 font-semibold hover:bg-[#ffdd00]/90 transition-colors">
        Get Promotion
      </button>
    );
  };

  if (isDetailed) {
    return (
      <div className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="relative">
          <img
            src={promotion.image}
            alt={promotion.title}
            className="w-full h-52 object-cover"
          />
          {promotion.isNew && (
            <span className="absolute top-4 right-4 bg-[#009688] text-white text-xs font-semibold px-3 py-1 rounded-full z-20 shadow-lg">
              New
            </span>
          )}
          <button
            onClick={handleFavoriteClick}
            className={clsx(
              "absolute top-4 left-4 p-2 rounded-full shadow-lg z-20",
              isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-500"
            )}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-5">
            <img
              src={promotion.shopLogo}
              alt={promotion.shopName}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">{promotion.shopName}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {promotion.title}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {promotion.fullDescription}
          </p>
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{promotion.location}</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Valid until {formatDate(promotion.deadline)}</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 mb-8 p-5 bg-gray-50 rounded-xl">
            <p className="font-medium text-gray-900 mb-2.5">Terms and Conditions:</p>
            <p className="leading-relaxed">{promotion.terms}</p>
          </div>
          {renderCTA()}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="flex h-[140px]">
        <div className="relative w-[140px] shrink-0">
          <img
            src={promotion.image}
            alt={promotion.title}
            className="w-full h-full object-cover"
          />
          {promotion.isNew && (
            <span className="absolute top-3 right-3 bg-[#009688] text-white text-xs font-semibold px-2 py-0.5 rounded-full z-20 shadow-lg">
              New
            </span>
          )}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 left-3 p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all transform active:scale-95 shadow-lg"
          >
            <Heart 
              className={`w-3.5 h-3.5 ${
                isFavorite 
                  ? 'fill-red-500 stroke-red-500 animate-heart-pop' 
                  : 'stroke-gray-700'
              }`}
            />
          </button>
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src={promotion.shopLogo}
                alt={promotion.shopName}
                className="w-7 h-7 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">{promotion.shopName}</span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
              {promotion.title}
            </h3>
          </div>
          <div className="flex flex-col gap-1.5 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{promotion.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span className="truncate">Valid until {formatDate(promotion.deadline)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}