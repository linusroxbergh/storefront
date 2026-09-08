import type { PaymentDetails, ShippingDetails } from '../../lib/orders';

type Props = {
  shipping: ShippingDetails;
  payment: PaymentDetails;
  placing: boolean;
  error: string;
  onBack: () => void;
  onPlace: () => void;
};

export function ReviewStep({ shipping, payment, placing, error, onBack, onPlace }: Props) {
  return (
    <div className="form">
      <h2>Check and place your order</h2>
      <dl className="review">
        <dt>Ship to</dt>
        <dd>
          {shipping.name}
          <br />
          {shipping.address}
          <br />
          {shipping.city} {shipping.zip}
        </dd>
        <dt>Receipt to</dt>
        <dd>{shipping.email}</dd>
        <dt>Card</dt>
        <dd>•••• {payment.last4}</dd>
      </dl>
      {error && <p className="error">{error}</p>}
      <div className="actions">
        <button className="button quiet" type="button" onClick={onBack}>
          Back
        </button>
        <button className="button" type="button" disabled={placing} onClick={onPlace}>
          {placing ? 'Placing order…' : 'Place order'}
        </button>
      </div>
    </div>
  );
}
