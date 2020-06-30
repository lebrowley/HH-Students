import React from 'react'

function SavedItems(props) {
    const {item_name, item_price, item_description, quantity, menu_name} = props
    return (
        <div className='item-quantity'>
            <div className='menu-name-container'><p>{menu_name}</p></div>
            
            <div className='items-bubble'>

                <div className='item-pn'>
                    <span>${item_price} -- {item_name}</span>
                </div>

                <p>{item_description}</p>

            </div>

            <button id='quant-display'>{quantity}</button>
            
        </div>
    )
}

export default SavedItems;