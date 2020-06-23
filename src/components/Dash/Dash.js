import React, { Component } from 'react';
// import { connect } from 'react-redux';
import axios from 'axios';
// import { getUser } from '../redux/reducer';
import Bubble from './DashBubble';

class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            menus: []
        }

        this.getMenus = this.getMenus.bind(this)
    }

    componentDidMount() {
        // this.props.getUser()
        this.getMenus()
    }

    getMenus() {
        axios.get('/api/menus')
            .then(res => {
                this.setState({ menus: res.data })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className='dashboard-component'>
                <div className='header-text'>
                    <h1>Feeling Hungry Hungry?</h1>
                    <h4>Check out our current food truck options</h4>
                </div>


                <div className="food-trucks-container">
                    {this.state.menus.map(menu => (
                        <Bubble
                            key={menu.menu_id}
                            menuId={menu.menu_id}
                            menuName={menu.menu_name} />
                    ))}
                </div>

            </div>
        )
    }
}

// const mapStateToProps = reduxState => reduxState
// // const mapDispatchToProps = { getUser }
// export default connect(mapStateToProps)(Dashboard);

export default Dashboard;