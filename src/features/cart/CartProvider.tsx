import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import { addLine, cartTotals, setQty, type CartLine, type Totals } from '../../lib/cart';
import type { DiscountCode } from '../../lib/discounts';

type State = { lines: CartLine[]; code?: DiscountCode; isOpen: boolean };

type Action =
  | { type: 'add'; productId: string }
  | { type: 'setQty'; productId: string; qty: number }
  | { type: 'applyCode'; code: DiscountCode }
  | { type: 'removeCode' }
  | { type: 'clear' }
  | { type: 'open' }
  | { type: 'close' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return { ...state, lines: addLine(state.lines, action.productId), isOpen: true };
    case 'setQty':
      return { ...state, lines: setQty(state.lines, action.productId, action.qty) };
    case 'applyCode':
      return { ...state, code: action.code };
    case 'removeCode':
      return { ...state, code: undefined };
    case 'clear':
      return { ...state, lines: [], code: undefined };
    case 'open':
      return { ...state, isOpen: true };
    case 'close':
      return { ...state, isOpen: false };
  }
}

type Cart = State & {
  count: number;
  totals: Totals;
  add: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  applyCode: (code: DiscountCode) => void;
  removeCode: () => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<Cart | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], isOpen: false });

  const cart = useMemo<Cart>(
    () => ({
      ...state,
      count: state.lines.reduce((n, l) => n + l.qty, 0),
      totals: cartTotals(state.lines, state.code),
      add: (productId) => dispatch({ type: 'add', productId }),
      setQty: (productId, qty) => dispatch({ type: 'setQty', productId, qty }),
      applyCode: (code) => dispatch({ type: 'applyCode', code }),
      removeCode: () => dispatch({ type: 'removeCode' }),
      clear: () => dispatch({ type: 'clear' }),
      open: () => dispatch({ type: 'open' }),
      close: () => dispatch({ type: 'close' }),
    }),
    [state],
  );

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart(): Cart {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart needs a <CartProvider> above it');
  return cart;
}
