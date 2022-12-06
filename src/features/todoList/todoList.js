import { useEffect } from "react";
import { fetchTodos, activeTodos, todoRemoved, todoUpdated } from "./todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import useStatus from "../../hooks/useStatus";
import TodoListItem from "../todoListItem/todoListItem";

import './todosList.scss';

const TodoList = () => {
    
    const {todosStatus} = useSelector(state => state.todos);
    const {status} = useStatus();
    const todos = useSelector(activeTodos);
    const {request} = useHttp();


    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(fetchTodos());
        // eslint-disable-next-line
    }, [])

    const deleteTodo = (id) => {
        request(`http://localhost:3004/todos/${id}`,'DELETE')
            .then( () => dispatch(todoRemoved(id)))
            .then( () => console.log('Removed'))
            .catch( error => console.log(error))
    }

    const updateTodo = (id, data) => {
        request(`http://localhost:3004/todos/${id}`,'PATCH', JSON.stringify(data))
            .then( () => dispatch(todoUpdated({
                id: id, 
                changes: {
                    ...data
                }
            })))
            .then( () => console.log('Updated'))
            .catch( error => console.log(error))
    }

    const display = () => {
        if(todos.length > 0) {
            return todos.map( ({id, description, status, color}) => {
                return <TodoListItem
                        key={id}
                        id={id}
                        description={description}
                        status={status}
                        color={color}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}/>
            })
        } else {
            return <h2 className="empty">You have nothing to do???</h2>
        }
    }

    return(
        <ul className="todosList">
            {status(todosStatus, display())}
        </ul>
    )
}

export default TodoList;