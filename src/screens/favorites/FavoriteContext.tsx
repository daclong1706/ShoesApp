// FavoriteContext.tsx
import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Shoes} from '../../models/ShoesModel';

interface FavoriteContextType {
  favorites: Shoes[];
  setFavorites: (shoes: Shoes[]) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export const FavoriteProvider = ({children}: {children: ReactNode}) => {
  const [favorites, setFavorites] = useState<Shoes[]>([]);

  return (
    <FavoriteContext.Provider value={{favorites, setFavorites}}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};
