import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import axios from 'axios';
// import { getUser } from '../redux/reducer';

class Orders extends Component {
    constructor() {
        super()

        this.state = {
            currentOrder: [],
            savedOrder: []
        }

    }

    // componentDidMount() {
    //     // this.props.getUser()
    //    this.getCurrentOrders()
    //    this.getSavedOrders()
    // }

  //getCurrentOrder
  //getSavedOrders

    render() {
        return (
            <div className='dashboard-component'>

                <h1>My Orders Component</h1>

            </div>
        )
    }
}

// const mapStateToProps = reduxState => reduxState
// // const mapDispatchToProps = { getUser }
// export default connect(mapStateToProps)(Dashboard);

export default Orders;