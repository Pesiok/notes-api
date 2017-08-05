import React from 'react';

export default props => {
    return (
        <label> {props.name}
            <input 
                type={props.type}
                value={props.value}
                onChange={event => props.handler(event, props.valueSrc)}
            />
        </label>
    );
}