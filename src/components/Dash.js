import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
// import { getUser } from '../redux/reducer';

class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            menus: []
        }
    }

    // componentDidMount() {
    //     this.props.getUser()
    // }


    render() {
        return (
            <div className='dashboard-component'>
                
                <h1>Feeling Hungry Hungry?</h1>
                <h4>Check out our current food truck options</h4>

                <div className="food-trucks-container">
                    <div className='food-truck-bubble'>food truck name</div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState
// const mapDispatchToProps = { getUser }
export default connect(mapStateToProps)(Dashboard);