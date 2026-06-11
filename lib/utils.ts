import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDaysRemaining(endDate: string | null): number {
  if (!endDate) return 0;
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function buildSMSMessage(alertTitle: string): string {
  return `[ShieldNet AI] CRITICAL ALERT: ${alertTitle}. Log in to shieldnet.ai to take action immediately.`;
}

export const PLAN_PRICES: Record<string, { monthly: number; annual: number }> = {
  personal_free: { monthly: 0, annual: 0 },
  personal_pro: { monthly: 9.99, annual: 9.99 * 0.8 },
  business_starter: { monthly: 49, annual: 49 * 0.8 },
  business_pro: { monthly: 199, annual: 199 * 0.8 },
  business_enterprise: { monthly: 499, annual: 499 * 0.8 },
};

export const ROLE_DASHBOARD: Record<string, string> = {
  individual: '/dashboard',
  business_admin: '/business',
  business_member: '/business',
  gov_admin: '/gov',
  superadmin: '/admin',
};
