import { useHttp } from '../../../hooks/http.hook';
import store from '../../../store';
import {todoRemovedDone, todosMarkDone, selectAll } from '../../todoList/todosSlice';
import { useDispatch } from 'react-redux';

const FilterButtons = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();
    
    const removeDoneHandler = () => {
        const state = selectAll(store.getState());
        const doneIds = state.filter( item => item.status === true).map(item => item.id);
        new Promise( (resolve) => {
            resolve(
                doneIds.forEach( item => {
                    request(`http://localhost:3004/todos/${item}`,'DELETE')
                })
            )
        })
        .then( () => dispatch(todoRemovedDone()))
        .then( () => console.log('Done todos are removed'))
    }

    const markDoneHandler = () => {
        const state = selectAll(store.getState());
        const markedArray = state.map( item => ({...item, status: true}));
        new Promise( (resolve) => {
            resolve(
                markedArray.forEach( item => {
                    request(`http://localhost:3004/todos/${item.id}`,'PATCH', JSON.stringify(item))
                })
            )
        })
        .then( () => dispatch(todosMarkDone()))
        .then( () => console.log('All todos marked as done'))
    }

    return(
        <div className="buttons">
            <button 
                className='filters__button'
                onClick={markDoneHandler}>Mark all done
            </button>
            <button 
                className='filters__button'
                onClick={removeDoneHandler}>Delete done
            </button>
        </div>
    )
}

export default FilterButtons;