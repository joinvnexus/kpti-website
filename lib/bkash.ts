// NOTE: This is a simplified skeleton for bKash integration.
// Replace placeholders with your real sandbox/production credentials.
// bKash Checkout API Documentation: https://developer.bka.sh/docs/checkout-overview

type CreatePaymentInput = {
  admissionId: number;
  amount: number;
  callbackURL: string;
};

type CreatePaymentResult = {
  paymentURL: string;
  bkashPaymentId: string;
};

/**
 * Create bKash payment session
 * Step 1: Get access token
 * Step 2: Create payment
 * Step 3: Return checkout URL
 */
export async function createBkashPayment(
  input: CreatePaymentInput,
): Promise<CreatePaymentResult> {
  const baseURL = process.env.BKASH_BASE_URL || 'https://tokenized.sandbox.bka.sh/v1.2.0-beta';
  const appKey = process.env.BKASH_APP_KEY!;
  const appSecret = process.env.BKASH_APP_SECRET!;
  const username = process.env.BKASH_USERNAME!;
  const password = process.env.BKASH_PASSWORD!;

  try {
    // Step 1: Get access token
    const tokenResponse = await fetch(`${baseURL}/tokenized/checkout/token/grant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'username': username,
        'password': password,
      },
      body: JSON.stringify({
        app_key: appKey,
        app_secret: appSecret,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.id_token;

    if (!accessToken) {
      throw new Error('Failed to get bKash access token');
    }

    // Step 2: Create payment
    const paymentResponse = await fetch(`${baseURL}/tokenized/checkout/payment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': accessToken,
        'X-APP-Key': appKey,
      },
      body: JSON.stringify({
        mode: '0011', // Checkout mode
        payerReference: `admission-${input.admissionId}`,
        callbackURL: input.callbackURL,
        amount: input.amount.toString(),
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: `INV-${input.admissionId}-${Date.now()}`,
      }),
    });

    const paymentData = await paymentResponse.json();
    
    if (paymentData.statusCode !== '0000') {
      throw new Error(`bKash payment creation failed: ${paymentData.statusMessage}`);
    }

    return {
      paymentURL: paymentData.bkashURL,
      bkashPaymentId: paymentData.paymentID,
    };
  } catch (error) {
    console.error('bKash payment creation error:', error);
    // Fallback for development/testing
    return {
      paymentURL: `/admission-success?admissionId=${input.admissionId}`,
      bkashPaymentId: `dummy-${input.admissionId}`,
    };
  }
}

/**
 * Verify bKash payment transaction
 */
export async function verifyBkashPayment(params: { trxID: string }) {
  const baseURL = process.env.BKASH_BASE_URL || 'https://tokenized.sandbox.bka.sh/v1.2.0-beta';
  const appKey = process.env.BKASH_APP_KEY!;
  const username = process.env.BKASH_USERNAME!;
  const password = process.env.BKASH_PASSWORD!;

  try {
    // Get access token
    const tokenResponse = await fetch(`${baseURL}/tokenized/checkout/token/grant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'username': username,
        'password': password,
      },
      body: JSON.stringify({
        app_key: appKey,
        app_secret: process.env.BKASH_APP_SECRET!,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.id_token;

    // Verify payment
    const verifyResponse = await fetch(`${baseURL}/tokenized/checkout/payment/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': accessToken,
        'X-APP-Key': appKey,
      },
      body: JSON.stringify({
        paymentID: params.trxID,
      }),
    });

    const verifyData = await verifyResponse.json();

    return {
      success: verifyData.statusCode === '0000' && verifyData.transactionStatus === 'Completed',
      amount: parseFloat(verifyData.amount || '0'),
      trxID: verifyData.paymentID,
      status: verifyData.transactionStatus,
    };
  } catch (error) {
    console.error('bKash payment verification error:', error);
    return {
      success: false,
      amount: 0,
      trxID: params.trxID,
      status: 'Failed',
    };
  }
}


