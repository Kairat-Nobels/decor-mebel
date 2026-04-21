import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoriesApi } from "../../api/api";
import { toast } from "react-toastify";

// Получить все новости
export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(categoriesApi);
      if (response.status === 200) {
        return await response.json();
      } else {
        throw Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Создать новость
export const createCategories = createAsyncThunk(
  "createCategories",
  async (news, { rejectWithValue }) => {
    try {
      const response = await fetch(categoriesApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news)
      });
      if (response.status === 201) {
        return await response.json();
      } else {
        throw Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Обновить новость
export const updateCategories = createAsyncThunk(
  "updateCategories",
  async ({ id, news }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${categoriesApi}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news)
      });
      if (response.status === 200) {
        return await response.json();
      } else {
        throw Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Удалить новость
export const deleteCategories = createAsyncThunk(
  "deleteCategories",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${categoriesApi}/${id}`, {
        method: "DELETE"
      });
      if (response.status === 200) {
        return id;
      } else {
        throw Error(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    success: null,
    delLoading: false,
    delError: null,
    delMessage: null,
  },
  reducers: {
    clearNewsMessages(state) {
      state.error = null;
      state.success = null;
      state.delError = null;
      state.delMessage = null;
    }
  },
  extraReducers: builder => {
    // Получение новостей
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Создание новости
    builder.addCase(createCategories.pending, (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(createCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Категория успешно добавлена";
      state.categories.unshift(action.payload);
      toast.success("Категория успешно добавлена");
    });
    builder.addCase(createCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error("Ошибка при добавлении категории");
    });

    // Обновление новости
    builder.addCase(updateCategories.pending, (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(updateCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Категория успешно обновлена";
      state.categories = state.categories.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
      toast.success("Категория успешно обновлена");
    });
    builder.addCase(updateCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error("Ошибка при обновлении категории");
    });

    // Удаление новости
    builder.addCase(deleteCategories.pending, (state) => {
      state.delLoading = true;
      state.delError = null;
      state.delMessage = null;
    });
    builder.addCase(deleteCategories.fulfilled, (state, action) => {
      state.delLoading = false;
      state.delMessage = "Категория успешно удалена";
      state.categories = state.categories.filter(item => item.id !== action.payload);
      toast.success("Категория успешно удалена");
    });
    builder.addCase(deleteCategories.rejected, (state, action) => {
      state.delLoading = false;
      state.delError = action.payload || "Ошибка при удалении";
      toast.error(state.delError);
    });
  }
});

export const { clearNewsMessages } = categoriesSlice.actions;
export default categoriesSlice.reducer;