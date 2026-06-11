/**
 * Moolre API client — plug in API keys via .env.local to activate.
 * All methods are safe to call without keys; they return mock responses
 * so the UI works end-to-end before integration.
 */

const MOOLRE_API_KEY = process.env.MOOLRE_API_KEY;
const MOOLRE_SMS_API_KEY = process.env.MOOLRE_SMS_API_KEY;
const MOOLRE_WEBHOOK_SECRET = process.env.MOOLRE_WEBHOOK_SECRET;

const isConfigured = !!(MOOLRE_API_KEY && MOOLRE_SMS_API_KEY);

export interface MoolrePaymentRequest {
  amount: number;
  currency: string;
  phone: string;
  reference: string;
  description: string;
  callbackUrl: string;
}

export interface MoolrePaymentResponse {
  success: boolean;
  reference: string;
  status: 'pending' | 'completed' | 'failed';
  message: string;
}

export interface MoolreSMSRequest {
  to: string | string[];
  message: string;
  reference?: string;
}

export interface MoolreSMSResponse {
  success: boolean;
  reference: string;
  delivered: number;
  failed: number;
  message: string;
}

export async function initiateMoolrePayment(
  req: MoolrePaymentRequest
): Promise<MoolrePaymentResponse> {
  if (!isConfigured) {
    return {
      success: true,
      reference: `MOCK-PAY-${Date.now()}`,
      status: 'pending',
      message: 'Mock payment initiated (Moolre keys not yet configured)',
    };
  }

  const res = await fetch('https://api.moolre.com/v1/payments/collect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${MOOLRE_API_KEY}`,
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error(`Moolre payment error: ${res.status}`);
  }

  return res.json();
}

export async function sendMoolreSMS(
  req: MoolreSMSRequest
): Promise<MoolreSMSResponse> {
  if (!isConfigured) {
    const recipients = Array.isArray(req.to) ? req.to.length : 1;
    return {
      success: true,
      reference: `MOCK-SMS-${Date.now()}`,
      delivered: recipients,
      failed: 0,
      message: 'Mock SMS sent (Moolre keys not yet configured)',
    };
  }

  const res = await fetch('https://api.moolre.com/v1/sms/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${MOOLRE_SMS_API_KEY}`,
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    throw new Error(`Moolre SMS error: ${res.status}`);
  }

  return res.json();
}

export function verifyMoolreWebhookSignature(
  payload: string,
  signature: string
): boolean {
  if (!MOOLRE_WEBHOOK_SECRET) return true; // allow through in dev without keys
  const crypto = require('crypto');
  const expected = crypto
    .createHmac('sha256', MOOLRE_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  return expected === signature;
}
