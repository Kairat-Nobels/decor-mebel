import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { servicesApi } from "../../api/api";

// GET
export const getService = createAsyncThunk(
    "getService",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(servicesApi);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// CREATE
export const createService = createAsyncThunk(
    "createService",
    async (newService, { rejectWithValue }) => {
        try {
            const response = await fetch(servicesApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newService),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// UPDATE
export const updateService = createAsyncThunk(
    "updateService",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${servicesApi}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// DELETE
export const deleteService = createAsyncThunk(
    "deleteService",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${servicesApi}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const servicesSlice = createSlice({
    name: "servicesSlice",
    initialState: {
        services: [],
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            // GET
            .addCase(getService.pending, state => {
                state.loading = true;
            })
            .addCase(getService.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(getService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error("Ошибка при загрузке ❌");
            })

            // CREATE
            .addCase(createService.fulfilled, (state, action) => {
                state.services.push(action.payload);
                toast.success("Успешно добавлено");
            })
            .addCase(createService.rejected, (state, action) => {
                toast.error("Ошибка при добавлении");
            })

            // UPDATE
            .addCase(updateService.fulfilled, (state, action) => {
                const index = state.services.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.services[index] = action.payload;
                }
                toast.success("Успешно обновлено");
            })
            .addCase(updateService.rejected, (state, action) => {
                toast.error("Ошибка при обновлении");
            })

            // DELETE
            .addCase(deleteService.fulfilled, (state, action) => {
                state.services = state.services.filter(s => s.id !== action.payload);
                toast.success("Успешно удалено");
            })
            .addCase(deleteService.rejected, (state, action) => {
                toast.error("Ошибка при удалении");
            });
    },
});

export default servicesSlice.reducer;
