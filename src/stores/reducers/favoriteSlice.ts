import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import favoriteAPI from '../../apis/favoriteAPI';

interface FavoriteState {
  favorites: string[];
}

const initialState: FavoriteState = {
  favorites: [],
};

// export const loadFavorites = createAsyncThunk(
//   'favorite/loadFavorites',
//   async (_, {rejectWithValue}) => {
//     try {
//       const res = await favoriteAPI.getFavorite();
//       return res.data.favorites.map((fav: any) => fav.productId);
//     } catch (error) {
//       console.error('Failed to load favorites:', error);
//       return rejectWithValue('Failed to load favorites');
//     }
//   },
// );

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
  },
});

export const {addFavorite, removeFavorite, setFavorites} =
  favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
export const favoriteSelector = (state: RootState) =>
  state.favoriteReducer.favorites;
