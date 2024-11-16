import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        setAuthData: (state, action) => {
            state.user = action.payload;
        },
        clearAuthData: (state) => {
            state.user = null;
        },
    },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;