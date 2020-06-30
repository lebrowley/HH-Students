import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OrderHist from './OrderHist';

function History(props) {

    return (
        <div className='history-component'>
            <h1>Order History</h1>
            <Link to='/saved'><button>Back to saved</button></Link>
            <div className='content'>
                <div className='container'>
                    {props.cart.orders.map(order => (
                        <OrderHist
                            key={order.id}
                            order={order}

                        />
                    ))}
                </div>
            </div>

            
        </div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(History);
