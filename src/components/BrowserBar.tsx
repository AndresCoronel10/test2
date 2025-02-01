import React from 'react';
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';

export function BrowserBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
      <button className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500">
        <ArrowLeft className="w-4 h-4" />
      </button>
      <button className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500">
        <ArrowRight className="w-4 h-4" />
      </button>
      <button className="p-1.5 rounded-md hover:bg-gray-200 text-gray-500">
        <RefreshCw className="w-4 h-4" />
      </button>
      <div className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-600">
        promotions.bancopichincha.com
      </div>
    </div>
  );
}