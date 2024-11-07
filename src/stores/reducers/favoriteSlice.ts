import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import favoriteAPI from '../../apis/favoriteAPI';
import productAPI from '../../apis/productAPI';

interface FavoriteState {
  favorites: string[];
  favoriteDetails: any[]; // Thêm mảng favoriteDetails để lưu trữ chi tiết sản phẩm
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  favorites: [],
  favoriteDetails: [],
  loading: false,
  error: null,
};

// AsyncThunk để tải danh sách sản phẩm yêu thích từ API
export const loadFavorites = createAsyncThunk(
  'favorite/loadFavorites',
  async (_, {rejectWithValue}) => {
    try {
      const res = await favoriteAPI.getFavorite();

      // Trích xuất danh sách productId từ response
      const productIds = res.data.favorites.map(
        (fav: {productId: string}) => fav.productId,
      );
      return productIds; // Trả về mảng productId để lưu vào Redux
    } catch (error) {
      console.error('Failed to load favorites:', error);
      return rejectWithValue('Failed to load favorites');
    }
  },
);

// Load favorite products with details
export const loadFavoriteDetails = createAsyncThunk<
  any[], // Định nghĩa kiểu trả về là mảng các sản phẩm yêu thích
  void,
  {state: RootState} // Định nghĩa kiểu của `getState`
>('favorite/loadFavoriteDetails', async (_, {getState, rejectWithValue}) => {
  try {
    const {favorites} = getState().favoriteReducer as FavoriteState;
    const detailedShoes = await Promise.all(
      favorites.map(async productId => {
        const productRes = await productAPI.getProductById(productId);
        return productRes;
      }),
    );
    return detailedShoes;
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || 'Failed to load favorite details',
    );
  }
});

// AsyncThunk để thêm sản phẩm vào danh sách yêu thích
export const addFavoriteItem = createAsyncThunk(
  'favorite/addFavoriteItem',
  async (productId: string, {rejectWithValue}) => {
    try {
      await favoriteAPI.addFavorite(productId);
      return productId;
    } catch (error) {
      console.error('Failed to add favorite:', error);
      return rejectWithValue('Failed to add favorite');
    }
  },
);

// AsyncThunk để xóa sản phẩm khỏi danh sách yêu thích
export const removeFavoriteItem = createAsyncThunk(
  'favorite/removeFavoriteItem',
  async (productId: string, {rejectWithValue}) => {
    try {
      await favoriteAPI.removeFavorite(productId);
      return productId;
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      return rejectWithValue('Failed to remove favorite');
    }
  },
);

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Load favorites
      .addCase(loadFavorites.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadFavorites.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.loading = false;
          state.favorites = action.payload;
        },
      )
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Load favorite details
      .addCase(loadFavoriteDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadFavoriteDetails.fulfilled, (state, action) => {
        state.favoriteDetails = action.payload;
        state.loading = false;
      })
      .addCase(loadFavoriteDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add favorite item
      .addCase(
        addFavoriteItem.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.favorites.push(action.payload);
        },
      )
      .addCase(addFavoriteItem.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Remove favorite item
      .addCase(
        removeFavoriteItem.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.favorites = state.favorites.filter(id => id !== action.payload);
        },
      )
      .addCase(removeFavoriteItem.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {setFavorites} = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
export const favoriteSelectorDetail = (state: RootState) =>
  state.favoriteReducer.favoriteDetails;

export const favoriteSelectorID = (state: RootState) =>
  state.favoriteReducer.favorites;
