export interface DonationTemplate {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  type: 'one-off' | 'recurring';
  category: 'school' | 'exhibition' | 'literature';
  interval?: 'monthly' | 'quarterly' | 'yearly';
  metadata?: Record<string, unknown>;
}

export type PaymentType = 'one-off' | 'regular';

export type Category = 'school' | 'exhibition' | 'literature';
