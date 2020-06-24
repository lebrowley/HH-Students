import React from 'react';
import { connect } from 'react-redux';
import { removeItem, addQuant, subtractQuant } from '../../redux/cartActions';

function CartItems(props) {
    const { itemId, itemName, itemPrice, itemDesc } = props
    return (
        <div className='menuItems-component'>

            <div className='items-bubble'>

                <div className='item-pn'>
                    <span>${itemPrice} -- {itemName}</span>
                </div>

                <p>{itemDesc}</p>
            
            </div>

            <div className='quant-remove'>
                <button onClick={() => props.subtractQuant(itemId)}>-</button>
                <p>{props.cart.addedItems[0].quantity}</p> 
                <button onClick={() => props.addQuant(itemId)}>+</button>
                <button onClick={() => props.removeItem(itemId)}>remove</button>
            </div>

        </div>

    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { removeItem, addQuant, subtractQuant })(CartItems);

