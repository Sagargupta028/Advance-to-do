
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { fetchQuotes, fetchWeather } from '../utils/api';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: number;
  quote?: string;
  isOutdoor?: boolean;
  weather?: {
    temp: number;
    condition: string;
    icon: string;
    city: string;
  };
}

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
};

// Get saved tasks from localStorage
const getSavedTasks = (): Task[] => {
  try {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage', error);
    return [];
  }
};

// Async thunk to add a task with a motivational quote
export const addTaskWithQuote = createAsyncThunk(
  'tasks/addTaskWithQuote',
  async ({ 
    title, 
    priority, 
    isOutdoor = false,
    city = 'London'
  }: { 
    title: string; 
    priority: TaskPriority;
    isOutdoor?: boolean;
    city?: string;
  }, { rejectWithValue }) => {
    try {
      const quote = await fetchQuotes();
      
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        priority,
        completed: false,
        createdAt: Date.now(),
        quote: quote,
        isOutdoor
      };
      
      // If it's an outdoor task, fetch weather data
      if (isOutdoor) {
        try {
          const weatherData = await fetchWeather(city);
          newTask.weather = {
            temp: weatherData.main.temp,
            condition: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
            city: weatherData.name
          };
        } catch (weatherError) {
          console.error('Weather data could not be fetched', weatherError);
          // We still create the task, even if weather data fails
        }
      }
      
      return newTask;
    } catch (error) {
      // If fetching quote fails, still create the task but without a quote
      console.error('Failed to fetch quote', error);
      
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        priority,
        completed: false,
        createdAt: Date.now(),
        isOutdoor
      };
      
      // If it's an outdoor task, fetch weather data
      if (isOutdoor) {
        try {
          const weatherData = await fetchWeather(city);
          newTask.weather = {
            temp: weatherData.main.temp,
            condition: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
            city: weatherData.name
          };
        } catch (weatherError) {
          console.error('Weather data could not be fetched', weatherError);
          // We still create the task, even if weather data fails
        }
      }
      
      return newTask;
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    ...initialState,
    tasks: getSavedTasks(),
  },
  reducers: {
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
      toast.success('Task deleted');
    },
    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        toast.success(task.completed ? 'Task completed' : 'Task marked as incomplete');
      }
    },
    updateTaskPriority: (state, action: PayloadAction<{ id: string; priority: TaskPriority }>) => {
      const { id, priority } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.priority = priority;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        toast.success('Task priority updated');
      }
    },
    clearAllTasks: (state) => {
      state.tasks = [];
      localStorage.removeItem('tasks');
      toast.success('All tasks cleared');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskWithQuote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTaskWithQuote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.unshift(action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        toast.success('Task added successfully');
      })
      .addCase(addTaskWithQuote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to add task';
        toast.error('Failed to add task');
      });
  },
});

export const { deleteTask, toggleTaskComplete, updateTaskPriority, clearAllTasks } = taskSlice.actions;
export default taskSlice.reducer;
