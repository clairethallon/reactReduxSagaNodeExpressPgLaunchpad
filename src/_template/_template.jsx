import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function _template(props) {


    const getInventory = () => {
        console.log('getting inventory');
        // dispatch for saga
        dispatch({ type: 'GET_THINGS' });
    }

    const postInventory = (event) => {
        console.log('posting inventory');
        // dispatch for saga
        dispatch({ type: 'POST_THINGS', payload: event.target.value });
    }


    const dispatch = useDispatch();
    // const [ name, setName ] = useState( null );
    // const reducer = useSelector( store => store.reducer );
    const reducerName = useSelector(store => store.reducerName);
    const reducerPostName = useSelector(store => store.reducerPostName);
    return (
        <div>
            <h1>_template</h1>
            <p>{JSON.stringify(props)}</p>
            <p>{JSON.stringify(reducerName)}</p>
            <p>{JSON.stringify(reducerPostName)}</p>
            <button onClick={getInventory}>saga get</button>
            <input type="text" placeholder="name" onChange={(event) => postInventory(event)}></input>
            <button onClick={postInventory}>clear input</button>

        </div>
    )
}

export default _template;