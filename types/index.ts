export type UserRole =
  | 'individual'
  | 'business_admin'
  | 'business_member'
  | 'gov_admin'
  | 'superadmin';

export type SubscriptionPlan =
  | 'personal_free'
  | 'personal_pro'
  | 'business_starter'
  | 'business_pro'
  | 'business_enterprise'
  | 'government';

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';
export type BillingCycle = 'monthly' | 'annual';
export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertType =
  | 'malware'
  | 'ransomware'
  | 'phishing'
  | 'zero_day'
  | 'breach'
  | 'identity_theft'
  | 'apt'
  | 'infrastructure';
export type AlertStatus = 'active' | 'resolved' | 'dismissed';
export type SMSStatus = 'pending' | 'sent' | 'delivered' | 'failed';
export type ScamReportStatus = 'open' | 'investigating' | 'resolved';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  billing_cycle: BillingCycle;
  moolre_payment_ref: string | null;
  start_date: string;
  end_date: string | null;
  trial_end_date: string | null;
}

export interface Business {
  id: string;
  admin_user_id: string;
  company_name: string;
  size: string;
  plan: SubscriptionPlan;
  created_at: string;
}

export interface BusinessMember {
  id: string;
  business_id: string;
  user_id: string;
  role: 'admin' | 'member';
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  type: AlertType;
  created_at: string;
}

export interface UserAlert {
  id: string;
  user_id: string;
  alert_id: string;
  status: AlertStatus;
  sms_sent: boolean;
  sms_delivered: boolean;
  created_at: string;
  alert?: Alert;
}

export interface SMSLog {
  id: string;
  user_id: string;
  alert_id: string | null;
  phone: string;
  message: string;
  moolre_ref: string | null;
  status: SMSStatus;
  sent_at: string;
}

export interface ScamReport {
  id: string;
  user_id: string;
  description: string;
  reported_via: 'web' | 'email';
  status: ScamReportStatus;
  created_at: string;
}

export interface PlanDetails {
  id: SubscriptionPlan;
  name: string;
  price: number | null;
  priceAnnual: number | null;
  devices: string;
  users: string;
  features: string[];
  sla: {
    uptime: string;
    response: string;
    support: string;
  };
  highlight?: boolean;
  contactSales?: boolean;
}
