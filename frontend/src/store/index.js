import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthReducer'
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './auth';


const store = configureStore({
    reducer: { Auth: AuthReducer, [authApi.reducerPath]: authApi.reducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),

})

setupListeners(store.dispatch);


export default store



