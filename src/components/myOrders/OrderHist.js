import React from 'react'

function OrderHist(props) { 
    const {item_name, item_price, item_description} = props
    return ( 
        <div className='order-hist-component'>
            <div className='items-bubble'>

                <div className='item-pn'>
                    <span>${item_price} -- {item_name}</span>
                </div>

                <p>{item_description}</p>

            </div>

        </div>
    )
}

export default OrderHist;
