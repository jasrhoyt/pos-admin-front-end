import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './slices/userSlices';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    counter: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore all redux-persist action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
                // Optionally, ignore specific paths in actions
                ignoredActionPaths: ['payload.register', 'payload.rehydrate'],
            },
        }),
});

export const persistor = persistStore(store);
