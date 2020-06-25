import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../redux/authReducer';


class Auth extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {
        e.preventDefault()

        const { email, password } = this.state

        axios.post('/auth/register', { email, password })
            .then(res => {
                this.props.loginUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(err => alert('Could not register'))
    }

    login = (e) => {
        e.preventDefault()
        const { email, password } = this.state

        axios.post('/auth/login', { email, password })
            .then(res => {
                this.props.loginUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(err => alert('Could not login'))
    }

    render() {
        return (
            <div className='auth-page'>
                <h1>Hungry Hungry Students</h1>
                <div className='info-bubbles-container'>
                    <div className='info-bubble'>Order and pay online</div>
                    <div className='info-bubble'>Find food trucks on campus</div>
                    <div className='info-bubble'>Quickly reorder favorites</div>
                </div>

                <div className='auth-box'>
                    <h3>Login</h3>

                    <form className='auth-form'>
                        <input
                            type='text'
                            name='email'
                            placeholder='email'
                            onChange={e => this.handleChange(e)} />
                        <input
                            type='password'
                            name='password'
                            placeholder='password'
                            onChange={e => this.handleChange(e)} />

                        <div className='form-buttons'>
                            <button id='register' type='submit' onClick={this.login}>I'm Hungry!</button>

                            <button id='login' type='submit' onClick={this.register}>Sign up</button>
                        </div>
                    </form>

                </div>

                <h2>Tell me more</h2>
            </div>

        )

    }
}

const mapStateToProps = reduxState => reduxState
const mapDispatchToProps = { loginUser }
export default connect(mapStateToProps, mapDispatchToProps)(Auth);



