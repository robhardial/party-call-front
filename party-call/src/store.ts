import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./slices/eventSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'event', // key to store data in localStorage
    storage, // default is localStorage
};

const persistedEventReducer = persistReducer(persistConfig, eventReducer);

const store = configureStore({
    reducer :{
        event : persistedEventReducer
    }
})

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
