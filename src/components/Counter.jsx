import React, { useState } from "react";

function Counter() {
    // Set the initial count state to zero, 0
    const [count, setCount] = useState(1);
    // Create handleIncrement event handler
    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };
    //Create handleDecrement event handler
    const handleDecrement = () => {
        if (count>=2) {
            setCount(prevCount => prevCount - 1);
        }
    };
    const getCount = () => {
        return count;
    };
    return (
        <div>
            <h1>{count}</h1>
            <button type='button' onClick={handleDecrement}>-</button>
            <button type='button' onClick={handleIncrement}>+</button>
        </div>
    );
}

export default Counter;