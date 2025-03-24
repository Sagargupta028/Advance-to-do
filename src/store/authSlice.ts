
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

// Mock user credentials
const MOCK_USERS = [
  { username: 'user', password: 'password' },
  { username: 'admin', password: 'admin123' }
];

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Simulating an API call for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Check credentials against mock users
      const user = MOCK_USERS.find(
        (user) => user.username === username && user.password === password
      );
      
      if (!user) {
        return rejectWithValue('Invalid username or password');
      }
      
      return username;
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      toast.success('Logged out successfully');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        toast.success(`Welcome back, ${action.payload}!`);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
