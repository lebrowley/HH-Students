import React from 'react';

function MenuItems(props) {
    const { itemName, itemPrice, itemDesc } = props
    return (
        <div className='menuItems-component'>
            <div className='items-bubble'>
                <div className='item-np'>
                    <span>${itemPrice} -- {itemName}</span>
                </div>

                <p>{itemDesc}</p>
            </div>

        </div>

    )
}

export default MenuItems;

