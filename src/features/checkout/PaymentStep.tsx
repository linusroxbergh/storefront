import { useState, type FormEvent } from 'react';
import type { PaymentDetails } from '../../lib/orders';

type Props = {
  onBack: () => void;
  onNext: (details: PaymentDetails) => void;
};

export function PaymentStep({ onBack, onNext }: Props) {
  const [cardholder, setCardholder] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const digits = number.replace(/\D/g, '');

  function submit(e: FormEvent) {
    e.preventDefault();
    const last4 = digits.slice(-4);
    onNext({ cardholder, last4, token: `tok_test_${last4}` });
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2>Payment</h2>
      <input required placeholder="Name on card" autoComplete="cc-name" value={cardholder} onChange={(e) => setCardholder(e.target.value)} />
      <input
        required
        placeholder="Card number"
        autoComplete="cc-number"
        inputMode="numeric"
        pattern="[0-9 ]{15,23}"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <div className="row">
        <input required placeholder="MM / YY" autoComplete="cc-exp" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
        <input required placeholder="CVC" autoComplete="cc-csc" inputMode="numeric" value={cvc} onChange={(e) => setCvc(e.target.value)} />
      </div>
      <p className="hint">Test mode: 4242 4242 4242 4242 with any future date.</p>
      <div className="actions">
        <button className="button quiet" type="button" onClick={onBack}>
          Back
        </button>
        <button className="button" type="submit">
          Review order
        </button>
      </div>
    </form>
  );
}
