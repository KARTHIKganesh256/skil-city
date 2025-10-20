"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "sonner";

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  region: string;
  type: string;
  addedAt: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: FavoriteItem }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'LOAD_FAVORITES'; payload: FavoriteItem[] }
  | { type: 'CLEAR_FAVORITES' };

const FavoritesContext = createContext<{
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
  addToFavorites: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
} | null>(null);

const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Already in favorites
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }

    case 'REMOVE_FAVORITE': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    }

    case 'LOAD_FAVORITES':
      return {
        items: action.payload
      };

    case 'CLEAR_FAVORITES':
      return {
        items: []
      };

    default:
      return state;
  }
};

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, {
    items: []
  });

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('silkcity-favorites');
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: 'LOAD_FAVORITES', payload: favorites });
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('silkcity-favorites', JSON.stringify(state.items));
  }, [state.items]);

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    const favoriteItem: FavoriteItem = {
      ...item,
      addedAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_FAVORITE', payload: favoriteItem });
    toast.success("Added to favorites!");
  };

  const removeFromFavorites = (id: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });
    toast.success("Removed from favorites!");
  };

  const isFavorite = (id: string) => {
    return state.items.some(item => item.id === id);
  };

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
    toast.success("Favorites cleared!");
  };

  return (
    <FavoritesContext.Provider value={{
      state,
      dispatch,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

