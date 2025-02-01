export type PaymentMethod = 'qr-deuna' | 'credit-card' | 'debit-card' | 'digital-debit';
export type Category = 'restaurants' | 'electronics' | 'entertainment' | 'groceries' | 'all';

export interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  terms: string;
  paymentMethod: PaymentMethod;
  category: Category;
  isNew?: boolean;
  fullDescription?: string;
  shopName: string;
  shopLogo: string;
  location: string;
  deadline: string;
}