import React from 'react';
import PropTypes from 'prop-types';
import './tower.css';

const Tower = props => {

    const listItems = props.stack.map((size) => 
        <li key={size} className={`ring-${size}`}>{size}</li>
    );

    return (
        <div className="tower">
            <ul>{listItems}</ul>
        </div>
    );
};

Tower.propTypes = {
    stack: PropTypes.array.isRequired
};

export default Tower;