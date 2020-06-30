import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Bubble from './DashBubble';

function Dash(props) {
    const [menus, setMenus] = useState([])

    useEffect(() => {
        getMenus()
    })

    function getMenus() {
        axios.get('/api/menus')
            .then(res => {
                setMenus(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='dashboard-component'>
                <div className='header-text'>
                    <h1>Feeling Hungry Hungry?</h1>
                    <h4>Check out our current food truck options</h4>
                </div>


                <div className="food-trucks-container">
                    {menus.map(menu => (
                        <Bubble
                            key={menu.menu_id}
                            menuId={menu.menu_id}
                            menuName={menu.menu_name} />
                    ))}
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Dash);

