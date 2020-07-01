import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div className='component'>
            <h1>What is Hungry Hungry Students?</h1>
            <div className='info-bubbles-container about'>
                <div className='items-bubble'>

                    <span className='head'>Find food trucks on campus</span>

                    <p className='info'>See which food trucks are available on campus and view their current menus.</p>
                </div>

                <div className='items-bubble'>

                    <span className='head'>Order and pay online</span>

                    <p className='info'>Add items to your cart and checkout online.</p>
                </div>

                <div className='items-bubble'>

                    <span className='head'>Quickly reorder favorites</span>

                    <p className='info'>You can save your favorite orders for a faster checkout.</p>
                </div>
            </div>

            <Link to='/'><button>Go Back</button></Link>

        </div>
    )
}

export default About;
