import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchItems = createAsyncThunk(
    'items/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get('/items/getitems');
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch items');
        }
    }
);

export const createItem = createAsyncThunk(
    'items/create',
    async ({ category, options }, { rejectWithValue }) => {
        try {
            const { data } = await api.post('/items/createitem', { category, options });
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create item');
        }
    }
);

export const updateItem = createAsyncThunk(
    'items/update',
    async ({ id, category, options }, { rejectWithValue }) => {
        try {
            const { data } = await api.put(`/items/updateitem/${id}`, { category, options });
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update item');
        }
    }
);

export const deleteItem = createAsyncThunk(
    'items/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/items/deleteitem/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete item');
        }
    }
);

export const deleteOption = createAsyncThunk(
    'items/deleteOption',
    async ({ itemId, optionId }, { rejectWithValue }) => {
        try {
            const { data } = await api.delete(`/items/deleteoption/${itemId}`, { data: { optionId } });
            return data.item;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete option');
        }
    }
);

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchItems.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchItems.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

        builder
            .addCase(createItem.fulfilled, (state, action) => {
                const idx = state.items.findIndex(i => i._id === action.payload._id);
                if (idx !== -1) {
                    state.items[idx] = action.payload;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(createItem.rejected, (state, action) => { state.error = action.payload; });

        builder
            .addCase(updateItem.fulfilled, (state, action) => {
                const idx = state.items.findIndex(i => i._id === action.payload._id);
                if (idx !== -1) state.items[idx] = action.payload;
            });

        builder
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = state.items.filter(i => i._id !== action.payload);
            });

        builder
            .addCase(deleteOption.fulfilled, (state, action) => {
                const idx = state.items.findIndex(i => i._id === action.payload._id);
                if (idx !== -1) state.items[idx] = action.payload;
            });
    },
});

export default itemSlice.reducer;
