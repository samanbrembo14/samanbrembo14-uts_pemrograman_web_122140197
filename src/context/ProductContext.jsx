import { createContext, useContext, useReducer, useEffect } from 'react'

const ProductContext = createContext();

const initialState = {
  likedProducts: JSON.parse(localStorage.getItem('likedProducts')) || [],
  searchQuery: '',
  selectedCategory: 'all',
  searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],
  cart: [], // keranjang awal kosong
};


function productReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_LIKE': {
      const alreadyLiked = state.likedProducts.includes(action.payload);
      return {
        ...state,
        likedProducts: alreadyLiked
          ? state.likedProducts.filter((id) => id !== action.payload)
          : [...state.likedProducts, action.payload],
      };
    }

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };

    case 'ADD_SEARCH_HISTORY': {
      const keyword = action.payload.trim();
      if (!keyword) return state;

      const updatedHistory = [keyword, ...state.searchHistory.filter(q => q !== keyword)];
      const limited = updatedHistory.slice(0, 5); // limit max 5 item

      localStorage.setItem('searchHistory', JSON.stringify(limited));

      return {
        ...state,
        searchHistory: limited,
      };
    }
    case 'REMOVE_SEARCH_HISTORY': {
      const updated = state.searchHistory.filter(q => q !== action.payload);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
      return {
        ...state,
        searchHistory: updated,
      };
    }
    case 'ADD_TO_CART': {
      const product = action.payload;
      const existing = state.cart.find((item) => item.id === product.id);
      const quantity = product.qty || 1;

      if (existing) {
        const updatedCart = state.cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, { ...product, qty: quantity }] };
      }
    }

    case 'REMOVE_FROM_CART': {
      const id = action.payload;
      const updatedCart = state.cart.filter((item) => item.id !== id);
      return { ...state, cart: updatedCart };
    }

    case 'CHANGE_QUANTITY': {
      const { id, qty } = action.payload;
      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, qty } : item
      );
      return { ...state, cart: updatedCart };
    }

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);
  // Simpan ke localStorage saat likedProducts berubah
  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
  }, [state.likedProducts]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  return useContext(ProductContext);
}
