import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersApi } from "../../api/api";
import { toast } from "react-toastify";

export const getOrders = createAsyncThunk(
    "getOrders",
    async function (info = null, { dispatch, rejectWithValue }) {
        try {
            const response = await fetch(ordersApi);
            if (response.status === 200) {
                const records = await response.json();
                return records;
            }
            else {
                throw Error(`Error: ${response.status}`);
            }
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
        finally {

        }
    }
)

export const createOrder = createAsyncThunk(
    "createOrder",
    async function (record = null, { dispatch, rejectWithValue }) {
        try {
            const res = await fetch(ordersApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            });
            if (res.status === 201) {
                return 'Вы успешно записались'
            }
            else {
                throw Error(`Error: ${res.status}`);
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

export const deleteOrder = createAsyncThunk(
    'deleteOrder',
    async (mockupId) => {
        try {
            const response = await fetch(`${ordersApi}/${mockupId}`, {
                method: 'DELETE'
            });
            if (response.status === 200) {
                return mockupId; // Возвращаем ID удаленного заказа
            } else {
                throw Error(`Error: ${response.status}`);
            }
        } catch (error) {
            // eslint-disable-next-line no-undef
            return rejectWithValue(error.message);
        }

    }
);

export const updateOrder = createAsyncThunk(
    "orders/updateOrder",
    async function ({ id, updatedData }, { rejectWithValue }) {
        try {
            const res = await fetch(`${ordersApi}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
            const data = await res.json();
            toast.success("Заказ обновлен");
            return data;
        } catch (error) {
            toast.error(error.message);
            return rejectWithValue(error.message);
        }
    }
);

const ordersSlice = createSlice({
    name: 'ordersSlice',
    initialState: {
        orders: [],
        loading: false,
        delLoading: false,
        delMessage: null,
        delError: null,
        error: null,
        success: null
    },
    extraReducers: builder => {
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getOrders.pending, (state, action) => {
            state.loading = true;
        })
        // post
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload;
            toast.success("Ваш заказ успешно создан");
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createOrder.pending, (state, action) => {
            state.loading = true;
        })
        // delete
        builder.addCase(deleteOrder.pending, (state, action) => {
            state.delLoading = true;
        })
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.delLoading = false;
            state.delMessage = action.payload;
            console.log(action.payload);

            state.orders = state.orders.filter(doc => doc.id !== action.payload);
            toast.success("Успешно удалено");

        })
        builder.addCase(deleteOrder.rejected, (state, action) => {
            if (action.payload === undefined) state.delError = 'Ошибка, что то пошло не так'
            else state.delError = action.error
            state.delLoading = false;
        })
        // update
        builder.addCase(updateOrder.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(updateOrder.fulfilled, (state, action) => {
            state.loading = false;
            // Обновляем заказ в массиве orders
            state.orders = state.orders.map(order =>
                order.id === action.payload.id ? action.payload : order
            );
        })
        builder.addCase(updateOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default ordersSlice.reducer