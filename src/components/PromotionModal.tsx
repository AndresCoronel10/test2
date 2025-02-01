import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, Heart, Eye, EyeOff, Copy, Check, Tag, Sparkles, QrCode, Share2 } from 'lucide-react';
import { Promotion } from '../types';

interface PromotionModalProps {
  promotion: Promotion;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function PromotionModal({ 
  promotion, 
  onClose,
  isFavorite,
  onToggleFavorite
}: PromotionModalProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);

  useEffect(() => {
    setIsOpening(true);
    const timer = setTimeout(() => {
      setIsOpening(false);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const handleCopyCode = () => {
    const code = getPromotionCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareText = `${promotion.title}\n${promotion.description}\nValid until ${formatDate(promotion.deadline)}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50 transition-all duration-200 ease-out
        ${isOpening ? 'opacity-0' : 'opacity-100'}
        ${isClosing ? 'opacity-0' : ''}`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white w-full rounded-t-2xl max-h-[90vh] flex flex-col transition-transform duration-200 ease-out
          ${isOpening ? 'translate-y-full' : 'translate-y-0'}
          ${isClosing ? 'translate-y-full' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm rounded-t-2xl border-b border-gray-100">
          <div className="px-5 py-4 flex items-center justify-between">
            <h2 className="font-medium text-gray-900">{promotion.shopName}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image and Shop Info */}
          <div className="relative">
            <img
              src={promotion.image}
              alt={promotion.title}
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Shop Info */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
              <img
                src={promotion.shopLogo}
                alt={promotion.shopName}
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
              />
              <div className="flex-1">
                <h2 className="text-white font-semibold text-lg shadow-text">
                  {promotion.shopName}
                </h2>
                <p className="text-white/90 text-sm shadow-text">
                  {promotion.category.charAt(0).toUpperCase() + promotion.category.slice(1)}
                </p>
              </div>
              <button
                onClick={onToggleFavorite}
                className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all transform active:scale-95 shadow-lg"
              >
                <Heart 
                  className={`w-5 h-5 ${
                    isFavorite 
                      ? 'fill-red-500 stroke-red-500 animate-heart-pop' 
                      : 'stroke-gray-700'
                  }`} 
                />
              </button>
            </div>

            {/* New Badge */}
            {promotion.isNew && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#009688] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="px-5 py-6 space-y-6">
            {/* Title and Description */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Tag className="w-6 h-6 text-[#0f265c] mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">{promotion.title}</h2>
                  <p className="text-gray-600 leading-relaxed mt-2">{promotion.fullDescription}</p>
                </div>
              </div>
            </div>

            {/* Location and Date */}
            <div className="flex flex-col gap-3 bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <MapPin className="w-5 h-5 text-[#0f265c]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Location</p>
                  <p className="text-sm">{promotion.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Clock className="w-5 h-5 text-[#0f265c]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Valid Until</p>
                  <p className="text-sm">{formatDate(promotion.deadline)}</p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Terms and Conditions</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{promotion.terms}</p>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-gray-100 p-5 space-y-3">
          {promotion.paymentMethod === 'qr-deuna' ? (
            <>
              <button className="w-full bg-[#ffdd00] text-[#0f265c] rounded-xl px-6 py-4 font-semibold hover:bg-[#ffdd00]/90 active:bg-[#ffdd00]/80 transition-all transform active:scale-[0.98] shadow-lg shadow-[#ffdd00]/25 flex items-center justify-center gap-2">
                <QrCode className="w-5 h-5" />
                Scan QR Code
              </button>
              <p className="text-xs text-center text-gray-500">
                Open your camera or banking app to scan the QR code
              </p>
            </>
          ) : promotion.paymentMethod === 'digital-debit' ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-3.5 font-mono text-gray-700 border border-gray-200">
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
            </>
          ) : ['credit-card', 'debit-card'].includes(promotion.paymentMethod) ? (
            <>
              {showCode ? (
                <>
                  <div className="bg-gray-100 rounded-lg px-4 py-3.5 font-mono text-center text-gray-700 border border-gray-200">
                    {getPromotionCode()}
                  </div>
                  <button
                    onClick={() => setShowCode(false)}
                    className="w-full bg-gray-200 text-gray-700 rounded-xl px-6 py-4 font-semibold hover:bg-gray-300 transition-all transform active:scale-[0.98] shadow-lg shadow-gray-500/25 flex items-center justify-center gap-2"
                  >
                    <EyeOff className="w-5 h-5" />
                    Hide Code
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowCode(true)}
                  className="w-full bg-[#ffdd00] text-[#0f265c] rounded-xl px-6 py-4 font-semibold hover:bg-[#ffdd00]/90 transition-all transform active:scale-[0.98] shadow-lg shadow-[#ffdd00]/25 flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Show My Code
                </button>
              )}
              <p className="text-sm text-center text-gray-500">
                {showCode ? 'Use this code at checkout to redeem your promotion' : 'Click to reveal your promotion code'}
              </p>
            </>
          ) : null}
        </div>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-in fade-in slide-in-from-bottom duration-200">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}