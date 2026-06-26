import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "frzn-cart";

const lineKey = (item) => `${item.id}::${item.size ?? ""}::${item.colour ?? ""}`;

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      const item = action.item;
      const key = lineKey(item);
      const existing = state.find((line) => line.key === key);
      if (existing) {
        return state.map((line) =>
          line.key === key ? { ...line, qty: line.qty + (item.qty ?? 1) } : line
        );
      }
      return [...state, { ...item, key, qty: item.qty ?? 1 }];
    }
    case "setQty":
      return state
        .map((line) => (line.key === action.key ? { ...line, qty: action.qty } : line))
        .filter((line) => line.qty > 0);
    case "remove":
      return state.filter((line) => line.key !== action.key);
    case "clear":
      return [];
    default:
      return state;
  }
}

function init() {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, init);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const api = useMemo(() => {
    const count = items.reduce((sum, line) => sum + line.qty, 0);
    const total = items.reduce((sum, line) => sum + line.price * line.qty, 0);
    return {
      items,
      count,
      total,
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      addItem: (item) => {
        dispatch({ type: "add", item });
        setOpen(true);
      },
      setQty: (key, qty) => dispatch({ type: "setQty", key, qty }),
      removeItem: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [items, open]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
