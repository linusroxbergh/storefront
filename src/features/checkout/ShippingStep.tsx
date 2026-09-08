import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { ShippingDetails } from '../../lib/orders';

const EMPTY: ShippingDetails = { name: '', email: '', address: '', city: '', zip: '' };

type Props = {
  initial?: ShippingDetails;
  onNext: (details: ShippingDetails) => void;
};

export function ShippingStep({ initial, onNext }: Props) {
  const [form, setForm] = useState(initial ?? EMPTY);

  const field = (key: keyof ShippingDetails) => ({
    value: form[key],
    onChange: (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value }),
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    onNext(form);
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2>Where should we send it?</h2>
      <input required placeholder="Full name" autoComplete="name" {...field('name')} />
      <input required type="email" placeholder="Email" autoComplete="email" {...field('email')} />
      <input required placeholder="Street address" autoComplete="street-address" {...field('address')} />
      <div className="row">
        <input required placeholder="City" autoComplete="address-level2" {...field('city')} />
        <input required placeholder="ZIP code" autoComplete="postal-code" inputMode="numeric" {...field('zip')} />
      </div>
      <p className="hint">We ship within the US, usually in two working days.</p>
      <div className="actions">
        <button className="button" type="submit">
          Continue to payment
        </button>
      </div>
    </form>
  );
}
