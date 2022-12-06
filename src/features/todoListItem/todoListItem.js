import { useSelector } from 'react-redux';
import { selectAll as getFilters } from '../filters/filtersSlice';

import './todoListItem.scss';

const TodoListItem = ({id, description, status, color, deleteTodo, updateTodo}) => {

    const style = {
        "textDecoration":"line-through",
        "color":"grey"
    };
    const filters = useSelector(getFilters);

    return(
        <li className="todoListItem">
            <div onClick={ () => deleteTodo(id) } className="cross" />
            <div style={ status ? style : null} className="todoListItem__description">{description}</div>
            <select  
                className='todoListItem__colors' 
                name="colors"
                onChange={(e) => {updateTodo(id, {color: e.target.value})}}
                value={color}
                style={{color: color}}>
                    <option key='none' value={null}></option>
                    {filters.map( ({id, text}) => 
                        <option value={text} style={{color: text}} key={id}>{text}</option>
                    )}
            </select>
            <input 
                className="todoListItem__select"
                checked={ status } 
                type="checkbox" 
                onChange={ () => updateTodo(id, {status: !status})}
                />
        </li>
    )
};

export default TodoListItem;