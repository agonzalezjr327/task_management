import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    tasks: [],
    isLoading: false,
    error: null,
    status: 'All'
}

export const fetchTodo = createAsyncThunk('task/fetchTodo', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        if (!response.ok) {
            throw new Error('Failed to fetch tasks')
        }
        const data = await response.json()
        
        return data.map(task => ({
            id: task.id,
            title: task.title,
            status: task.completed ? 'Completed' : 'To Do',
            description: ''
        }))
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        },
        editTask: (state, action) => {
            console.log(action.payload);
            
            state.tasks = state.tasks.map((task) => task.id === action.payload.id ? action.payload : task)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                
                state.isLoading = false;
                state.tasks = action.payload
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message
            })
    }
})

export const { addTask, deleteTask, editTask } = taskSlice.actions
export default taskSlice.reducer
