import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {logoutUser} from '../redux/authReducer';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

function Nav(props) {
    const logout = () => {
        axios.delete('/auth/logout')
                .then(() => {
                    props.logoutUser()  
                    props.history.push('/') 
                }) 
                .catch(err => console.log(err))
      }
    return (
        <div className="sidenav">
            <h3>Hungry Hungry Students</h3>

            <div className='nav-links'>
                <Link to='/dashboard'><p>Food Trucks</p></Link>
                <p>My Orders</p>

                <button onClick={() => logout()}>Logout</button>

            </div>

        </div>
    );
}

const mapStateToProps = reduxState => reduxState
const mapDispatchToProps = {logoutUser}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));