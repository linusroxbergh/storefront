import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { placeOrder, type PaymentDetails, type ShippingDetails } from '../../lib/orders';
import { useCart } from '../cart/CartProvider';
import { OrderSummary } from './OrderSummary';
import { PaymentStep } from './PaymentStep';
import { ReviewStep } from './ReviewStep';
import { ShippingStep } from './ShippingStep';
import './checkout.css';

type Step = 'shipping' | 'payment' | 'review';

const STEPS: { id: Step; label: string }[] = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
];

export function CheckoutPage() {
  const { lines, totals, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('shipping');
  const [shipping, setShipping] = useState<ShippingDetails>();
  const [payment, setPayment] = useState<PaymentDetails>();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  if (lines.length === 0) {
    return (
      <p className="checkout-empty">
        Your cart is empty. <Link to="/">Find something nice</Link>
      </p>
    );
  }

  async function submit() {
    if (!shipping || !payment) return;
    setPlacing(true);
    setError('');
    try {
      const order = await placeOrder({ lines, shipping, payment, totals });
      clear();
      navigate(`/orders/${order.id}`, { state: { order } });
    } catch {
      setError("We couldn't place your order. Your card hasn't been charged.");
      setPlacing(false);
    }
  }

  return (
    <div className="checkout">
      <div>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.id} className={s.id === step ? 'current' : undefined}>
              {s.label}
            </li>
          ))}
        </ol>

        {step === 'shipping' && (
          <ShippingStep
            initial={shipping}
            onNext={(details) => {
              setShipping(details);
              setStep('payment');
            }}
          />
        )}
        {step === 'payment' && (
          <PaymentStep
            onBack={() => setStep('shipping')}
            onNext={(details) => {
              setPayment(details);
              setStep('review');
            }}
          />
        )}
        {step === 'review' && shipping && payment && (
          <ReviewStep
            shipping={shipping}
            payment={payment}
            placing={placing}
            error={error}
            onBack={() => setStep('payment')}
            onPlace={submit}
          />
        )}
      </div>
      <OrderSummary />
    </div>
  );
}
