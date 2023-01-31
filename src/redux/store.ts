import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import listSlice from './slices/listSlice';

export const store = configureStore({
  reducer: {
    list: listSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
