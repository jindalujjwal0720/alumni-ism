export const generateUpiLink = ({
  vpa,
  name,
  amount,
  referenceId,
  note,
  callbackUrl,
  currency = 'INR',
  provider = 'general',
}: {
  vpa: string;
  name: string;
  amount: number;
  referenceId: string;
  note?: string;
  callbackUrl?: string;
  currency?: 'INR';
  provider?: 'googlepay' | 'phonepe' | 'paytm' | 'general';
}) => {
  let base = 'upi://pay';
  switch (provider) {
    case 'googlepay':
      base = 'tez://upi/pay';
      break;
    case 'phonepe':
      base = 'phonepe://pay';
      break;
    case 'paytm':
      base = 'paytmmp://pay';
      break;
    default:
      base = 'upi://pay';
      break;
  }

  const params = new URLSearchParams({
    pa: vpa,
    pn: name,
    tr: referenceId,
    tn: note || '',
    am: amount.toString(),
    cu: currency,
    url: callbackUrl || '',
  });

  return `${base}?${params.toString()}`;
};

// 12 digit universally unique reference number
// timestamp is of length 10
// random number is of length 2
export const generateUniqueReferenceNumber = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const random = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, '0');
  return `${timestamp}${random}`;
};
