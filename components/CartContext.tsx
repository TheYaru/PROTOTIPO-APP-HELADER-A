import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { API_BASE } from '../constants/api';

type CartItem = { productId: number; qty: number; title?: string; price?: number };

type ContextType = {
  items: CartItem[];
  add: (p: CartItem) => void;
  remove: (productId: number) => void;
  clear: () => void;
  checkout: () => Promise<{ id?: number }>;
};

const CartContext = createContext<ContextType>({
  items: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  checkout: async () => ({ id: undefined }),
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (p: CartItem) => {
    console.log('CartContext.add called', p);
    setItems((prev) => {
      const found = prev.find((x) => x.productId === p.productId);
      if (found) {
        const next = prev.map((x) => (x.productId === p.productId ? { ...x, qty: x.qty + p.qty } : x));
        console.log('Cart updated', next);
        Alert.alert('Carrito', `Se agregó ${p.title ?? 'item'}`);
        return next;
      }
      const next = [...prev, p];
      console.log('Cart updated', next);
      Alert.alert('Carrito', `Se agregó ${p.title ?? 'item'}`);
      return next;
    });
  };

  const remove = (productId: number) => setItems((prev) => prev.filter((x) => x.productId !== productId));
  const clear = () => setItems([]);

  const checkout = async () => {
    const total = items.reduce((s, it) => s + (it.price || 0) * it.qty, 0);
    const payload = { items: items.map((i) => ({ productId: i.productId, qty: i.qty })), total };
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Checkout failed');
    const data = await res.json();
    clear();
    return data;
  };

  return (
    <CartContext.Provider value={{ items, add, remove, clear, checkout }}>
      {children}
    </CartContext.Provider>
  );
};