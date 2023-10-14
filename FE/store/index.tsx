import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import { authApi } from './auth/authApi';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    [authApi.reducerPath]: authApi.reducer,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type IRootState = ReturnType<typeof rootReducer>;
