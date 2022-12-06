import { useSelector, useDispatch } from 'react-redux';
import { selectAll as getFilters, fetchFilters, colorsChange } from '../filtersSlice';
import { useHttp } from '../../../hooks/http.hook';
import { useEffect } from 'react';

import './coloredFilters.scss';

const ColoredFilters = () => {

    const dispatch = useDispatch();
    const filters = useSelector(getFilters);
    const colored = useSelector(state => state.filters.colorFilters);
    const {request} = useHttp();

    useEffect( () => {
        dispatch(fetchFilters());
        //eslint-disable-next-line
    },[])

    const changeHandler = (e, id, text, status) => {
        const newColors = {
            ...colored,
            [e.target.name]: !colored[e.target.name]
        };
        
        request(`http://localhost:3004/filters/${id}`,"PATCH", JSON.stringify({"text":text, "status": !status}))
            .then( () => dispatch(colorsChange(newColors)))
            .then( () => console.log('Colors changed'))
            .catch( err => console.log(err));
    }

    return (
        <ul className='colored'>
            {filters.map( ({id, text, status}) => 
                <li key={id} className='colored__item'>
                    <input
                        value={colored[text] ? 'on' : 'off'}
                        checked={colored[text]}
                        type="checkbox" 
                        name={text}
                        onChange={(e) => changeHandler(e, id, text, status)}/>
                    <label style={{color: text}} htmlFor={text}>{text}</label>
                </li>    
            )}
        </ul>
    )
}

export default ColoredFilters;