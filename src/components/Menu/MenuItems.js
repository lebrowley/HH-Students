import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/cartActions';

function MenuItems(props) {
    const { itemId, itemName, itemPrice, itemDesc, addToCart } = props
    return (
        <div className='menuItems-component'>

            <div className='items-bubble'>

                <div className='item-pn'>
                    <span>${itemPrice} -- {itemName}</span>
                </div>

                <p>{itemDesc}</p>
                <button onClick={() => addToCart(itemId)}>add to cart</button>
            </div>

        </div>

    )
}

export default connect(null, { addToCart })(MenuItems);

