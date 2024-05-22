import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import SnakbarMessageSlice from './slices/SnakbarMessageSlice';
import LoginSlice from './slices/auth/LoginSlice';
import RegisterSlice from './slices/auth/RegisterSlice';
import FetchChatSlice from './slices/chat/FetchChatSlice';
import MessageSlice from './slices/chat/MessageSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  SnakMessages: SnakbarMessageSlice,
  LoginUser: LoginSlice,
  RegisterUser: RegisterSlice,
  Chats: FetchChatSlice,
  Message: MessageSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);


const Store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(Store);
export default Store;