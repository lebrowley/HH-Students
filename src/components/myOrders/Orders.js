import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../redux/authReducer';

class Orders extends Component {
    constructor() {
        super()

        this.state = {
            currentOrder: [],
            savedOrder: []
        }

    }

    componentDidMount() {
        this.props.getUser()
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

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getUser})(Orders);
