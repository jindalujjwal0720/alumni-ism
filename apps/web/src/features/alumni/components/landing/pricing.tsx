import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { PaymentDialog } from '../settings/payment-dialog';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/features/auth/stores/auth';

interface Pricing {
  title: string;
  price: number | string;
  validFor: string;
  features: string[];
  tag?: string;
}

const pricings: Pricing[] = [
  {
    title: 'Lifetime Plan',
    price: 10000,
    validFor: 'Lifetime',
    features: [
      'All Campus Privileges',
      'Global Network Access',
      'All Partner Benefits',
      '24/7 Support',
    ],
  },
];

const AlumniPricingCard = ({
  pricing,
  onSelect,
}: {
  pricing: Pricing;
  onSelect?: () => void;
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-96 bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100 relative overflow-hidden">
      {pricing.tag && (
        <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-bl-lg text-sm">
          {pricing.tag}
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          {pricing.title}
        </h3>
        <p className="text-slate-600">Full access to all alumni benefits</p>
      </div>
      <div className="flex items-end gap-2 mb-8">
        <span className="text-4xl font-bold text-slate-900">
          {typeof pricing.price === 'number' ? '₹' : ''}
          {pricing.price}
        </span>
        <span className="text-slate-500">/ {pricing.validFor}</span>
      </div>
      <ul className="space-y-4 mb-8">
        {pricing.features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <FiCheck className="h-5 w-5 text-indigo-600" />
            <span className="text-slate-700">{f}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={
          isAuthenticated
            ? onSelect
            : () => {
                // Redirect to login page
                navigate('/auth/login');
              }
        }
        className="w-full group"
      >
        Get Started{' '}
        <FiArrowRight className="button-icon group-hover:ml-4 transition-all duration-300" />
      </Button>
    </div>
  );
};

export const AlumniPricingSection = () => {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 bg-white">
      <PaymentDialog
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        onSuccess={() => {
          setIsPaymentDialogOpen(false);

          // Redirect to payments page
          navigate('/settings/payments');
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">
            Membership Options
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Choose the plan that best supports your professional goals
          </p>
        </div>
        <div className="w-full">
          <div className="flex flex-col justify-center items-center gap-6 w-full mx-auto">
            {pricings.map((p, i) => (
              <AlumniPricingCard
                key={i}
                pricing={p}
                onSelect={() => setIsPaymentDialogOpen(true)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
