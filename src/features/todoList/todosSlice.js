import { createSlice, createEntityAdapter, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const todosAdapter = createEntityAdapter()
const initialState = todosAdapter.getInitialState({
    todosStatus: 'idle'
});

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    () => {
        const {request} = useHttp();
        return request('http://localhost:3004/todos');
    }

)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoCreated: (state, action) => todosAdapter.addOne(state, action.payload),
        todoRemoved: (state, action) => todosAdapter.removeOne(state, action.payload),
        todoRemovedDone: (state) => {
            const completedIds = Object.values(state.entities)
                                .filter((todo) => todo.status)
                                .map((todo) => todo.id)
            todosAdapter.removeMany(state, completedIds);
        },
        todosMarkDone: (state) => {
            const makredArray = Object.values(state.entities)
                                .map( item => ({...item, status: true}));
            todosAdapter.setAll(state, makredArray)
        },
        todoUpdated: (state, action) => todosAdapter.updateOne(state, action.payload)
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {state.todosStatus = 'loading'})
               .addCase(fetchTodos.fulfilled, (state, action) => {
                    state.todosStatus = 'idle';
                    todosAdapter.setAll(state, action.payload);
               })
               .addCase(fetchTodos.rejected, (state) => {state.todosStatus = 'error'})
    }
})

const {actions, reducer} = todosSlice;

export default reducer;

export const {selectAll} = todosAdapter.getSelectors(state => state.todos);

export const activeTodos = createSelector(
    state => state.filters,
    selectAll,
    (filter, todos) => {
        let displayedTodos;

        if(filter.activeFilter === "all") {
            displayedTodos = todos
        } else {
            displayedTodos =  todos.filter( item => item.status === filter.activeFilter)
        }

        
        (function() {
            let result = []
            const colors = Object.keys(filter.colorFilters);
            colors.forEach( key => {
                if( filter.colorFilters[key] === true) {
                    const newTodos = displayedTodos.filter( item => 
                        item.color === key
                    )
                    result.push(...newTodos);
                }
            })
            return Object.values(filter.colorFilters).filter( item => item === true).length > 0 ? displayedTodos = result : displayedTodos;
        }());

        return displayedTodos
    }
);

export const {
    todoCreated,
    todoRemoved,
    todoUpdated,
    todoRemovedDone,
    todosMarkDone
} = actions;
