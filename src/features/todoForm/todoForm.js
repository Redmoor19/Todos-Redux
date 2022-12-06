import { useState } from 'react';
import uniqid from 'uniqid';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { todoCreated } from '../todoList/todosSlice';

import './todoForm.scss';

const TodoForm = () => {
    
    const [text, setText] = useState('');
    const {request} = useHttp();
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setText(e.target.value);
    }
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const data = {
                id: uniqid(),
                description: text,
                status: false
            }
            request('http://localhost:3004/todos','POST', JSON.stringify(data))
                .then( () => dispatch(todoCreated(data)))
                .then( () => console.log("Created"))
                .catch( error => console.log(error));
            setText('');
        }
    }

    return(
        <div className="form">
            <input
                className="form__input"
                type='text'
                value={text}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
                placeholder={text ? null : 'Enter the thing to do...'}
            />
        </div>
    )
}

export default TodoForm;