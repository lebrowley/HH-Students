import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../redux/authReducer';

export class Profile extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            formOpen: false
        }
    }
    
    componentDidMount() {
        this.props.getUser()
    }

    openForm = () => {
        this.setState({ formOpen: true })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (e) => {
        e.preventDefault()
        const {email, password} = this.state

        axios.put(`/auth/user/${this.props.auth.user.userId}`, {email, password})
        .then(res => {
            this.props.getUser()
            alert('success')  //toastify
            this.setState({formOpen: false})
        }) 
        .catch(err => console.log(err))
     }

    render() {
        return (
            <div className='profile-component'>
                <div className='text'>
                    <h1>My Profile</h1>
                    <h4>make changes to your account</h4>
                </div>

                <div className='buttons'>
                    <button className="bubble" onClick={this.openForm}>change email and password</button>
                    <button className="bubble">delete account</button>
                </div>

                {this.state.formOpen ? <div className='auth-box change'>
                    <form className='auth-form'>
                        <input
                            type='text'
                            name='email'
                            placeholder='email'
                            defaultValue={this.props.auth.user.email}
                            onChange={e => this.handleChange(e)} />
                        <input
                            type='password'
                            name='password'
                            placeholder='new password'
                            onChange={e => this.handleChange(e)} />

                        <div className='form-buttons'>
                            <button id='register' type='submit' onClick={this.handleClick}>save changes</button>
                        </div>
                    </form>
                </div>
                    : null}


            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {getUser})(Profile);


