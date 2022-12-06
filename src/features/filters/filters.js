import { selectAll as getTodos } from '../todoList/todosSlice';
import { activeFilterChanged } from './filtersSlice';
import { useDispatch, useSelector } from 'react-redux';

import './filters.scss';

import ColoredFilters from './coloredFilters/coloredFilters';
import FilterButtons from './buttons/filterButtons';

const Filters = () => {

    const filters = [
        {
            text: 'All',
            action: "all"
        },
        {
            text: 'Checked',
            action: true
        },
        {
            text: 'Unchecked',
            action: false
        }
    ]

    const dispatch = useDispatch();
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const unmarkedTodos = useSelector(getTodos).filter(item => item.status === false).length;

    return(
        <div className="sidebar">
            <div className="filters">
                {filters.map( ({text, action}) => 
                    <div 
                        className={`filters__item ${activeFilter === action ? "active" : ""}`}
                        key={text}
                        onClick={() => dispatch(activeFilterChanged(action))}
                        >{text}</div>
                )}
            </div>
            <FilterButtons />
            <div className="filters__left">
                <h3>Remaining todos</h3>
                { unmarkedTodos > 0 ? <p>{unmarkedTodos} items left</p> : <p>All done</p>}
            </div>
            <ColoredFilters />
        </div>
    )
}

export default Filters;