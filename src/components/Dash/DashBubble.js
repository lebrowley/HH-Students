import React from 'react';
import {Link} from 'react-router-dom';

function Bubble(props) {
    const { menuId, menuName } = props
    return (
        <div className='food-truck-bubble'>
            <Link id='link' to={`/menu/${menuId}`}>{menuName}</Link>
        </div>
    )
}

export default Bubble;