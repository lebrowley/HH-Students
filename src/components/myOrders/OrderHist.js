import React from 'react'
import HistItems from './HistItems';

function OrderHist(props) {
    const nameArr = props.order.map(order => {
        return order.menu_name
    })
    return (
        <div className='order-hist-component'>
            <div className='order-box'>
                {props.order.map((order, index) => (
                    <HistItems
                        key={order.id}
                        item_name={order.item_name}
                        item_price={order.item_price}
                        item_description={order.item_description}
                        quantity={order.quantity}
                        menu_name={nameArr[index]}
                    />
                ))}

            </div>



        </div>
    )
}

export default OrderHist;
