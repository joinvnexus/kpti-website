// NOTE: This is a simplified skeleton for bKash integration.
// Replace placeholders with your real sandbox/production credentials.

type CreatePaymentInput = {
  admissionId: number;
  amount: number;
};

type CreatePaymentResult = {
  paymentURL: string;
  bkashPaymentId: string;
};

export async function createBkashPayment(
  input: CreatePaymentInput,
): Promise<CreatePaymentResult> {
  // TODO: Call real bKash checkout API here.
  // For now return a dummy URL so the flow works.
  return {
    paymentURL: `/admission-success?admissionId=${input.admissionId}`,
    bkashPaymentId: `dummy-${input.admissionId}`,
  };
}

export async function verifyBkashPayment(params: { trxID: string }) {
  // TODO: Call bKash payment verification API.
  return {
    success: true,
    amount: 0,
  };
}


