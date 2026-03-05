import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

const initialState = {
    orders: [],
    myOrders: [],
    loading: false,
    error: null,
};

export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/orders/allorders');
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

export const fetchMyOrders = createAsyncThunk(
    'orders/fetchMine',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/orders/myorders');
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch your orders');
        }
    }
);

// selections = [{ category, option }]
export const createOrder = createAsyncThunk(
    'orders/create',
    async (selections, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/orders/order', { selections });
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create order');
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    'orders/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            await api.put(`/orders/status/${id}`, { status });
            return { id, status };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update order status');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAllOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
            .addCase(fetchAllOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

        builder
            .addCase(fetchMyOrders.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchMyOrders.fulfilled, (state, action) => { state.loading = false; state.myOrders = action.payload; })
            .addCase(fetchMyOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

        builder
            .addCase(createOrder.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(createOrder.fulfilled, (state, action) => { state.loading = false; state.myOrders.push(action.payload); })
            .addCase(createOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

        builder
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const { id, status } = action.payload;
                const order = state.orders.find(o => o._id === id);
                if (order) order.status = status;
            });
    },
});

export default orderSlice.reducer;
