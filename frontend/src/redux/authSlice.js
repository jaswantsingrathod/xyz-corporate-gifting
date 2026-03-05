import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// Helper: safely parse JSON from localStorage
const parseLocalStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (!item || item === 'undefined') return null;
        return JSON.parse(item);
    } catch {
        return null;
    }
};

const initialState = {
    user: parseLocalStorage('user'),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/users/login', { email, password });
            // Backend returns flat: { _id, employeeName, email, role, token }
            const { token, ...userFields } = data;
            const user = userFields;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return { user, token };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ employeeName, email, password }, { rejectWithValue }) => {
        try {
            await api.post('/users/register', { employeeName, email, password });
            return true; // just signal success — do NOT auto-login
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // register
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, setUser, clearError } = authSlice.actions;

export default authSlice.reducer;
