import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();
const initialState = filtersAdapter.getInitialState({
    activeFilter: 'all',
    colorFilters: {},
    filterStatus: 'idle'
});

export const fetchFilters = createAsyncThunk( 
    'filters/fetchFilters',
    () => {
    const {request} = useHttp();
    return request('http://localhost:3004/filters')
});

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
        colorsChange: (state, action) => {
            state.colorFilters = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchFilters.pending, state => {state.filterStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                filtersAdapter.setAll(state, action.payload);
                
                let colorFilters = {};
                action.payload.forEach( item => {
                    colorFilters = {
                        ...colorFilters,
                        [item.text]: item.status
                    }
                })
                state.colorFilters = colorFilters;
                state.filterStatus = 'idle'
            })
            .addCase(fetchFilters.rejected, state => {state.filterStatus = 'error'})
    }
})


const {reducer, actions} = filtersSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export const {
    activeFilterChanged,
    colorsChange
} = actions;

