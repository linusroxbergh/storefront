import { useState, type FormEvent } from 'react';
import { findCode } from '../../lib/discounts';
import { useCart } from './CartProvider';

export function DiscountForm() {
  const { code, applyCode, removeCode } = useCart();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  if (code) {
    return (
      <p className="code-applied">
        <span>
          <strong>{code.code}</strong> applied
        </span>
        <button className="link-button" onClick={removeCode}>
          Remove
        </button>
      </p>
    );
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const found = findCode(input);
    if (!found) {
      setError("That code doesn't exist or has expired.");
      return;
    }
    applyCode(found);
    setInput('');
    setError('');
  }

  return (
    <form className="code-form" onSubmit={submit}>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Discount code" />
      <button className="button quiet" type="submit" disabled={!input.trim()}>
        Apply
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
