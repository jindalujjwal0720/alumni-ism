import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLazyValidateCardQuery } from '@/features/partner/api/card';
import { getErrorMessage } from '@/utils/errors';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

const formatCreditCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  const groups = digits.match(/(\d{1,4})/g) || [];
  return groups.join(' ').trim();
};

export const ValidatePage = () => {
  const [validateCard, { data: { valid: isValid } = {}, isLoading }] =
    useLazyValidateCardQuery();
  const [cardNumber, setCardNumber] = useState('');
  const formattedCardNumber = useMemo(
    () => formatCreditCardNumber(cardNumber),
    [cardNumber],
  );

  const handleValidateCard = async () => {
    try {
      await validateCard(cardNumber);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\s/g, '');
    if (input.length <= 16) {
      setCardNumber(input);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-medium">Validate Alumni</h1>
      <p className="text-muted-foreground">
        Validate Alumni cards here by entering the card number.
      </p>
      <div className="mt-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="ucn" className="text-sm font-medium">
            Card Number
          </Label>
          {/* every 4 digits add a space */}
          <Input
            id="ucn"
            type="text"
            inputMode="numeric"
            value={formattedCardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="text-lg tracking-wider"
            aria-describedby="ucnHint"
          />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Button onClick={handleValidateCard} disabled={isLoading}>
            {isLoading ? 'Validating...' : 'Validate'}
          </Button>
          {!isLoading && isValid ? (
            <div className="text-green-500">
              Card is valid. Alumni is verified.
            </div>
          ) : (
            <div className="text-red-500">Invalid card</div>
          )}
        </div>
      </div>
    </div>
  );
};
