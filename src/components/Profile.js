import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {getUser} from '../redux/authReducer';

function Profile(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formOpen, setForm] = useState(false)

    function handleClick(e) {
        e.preventDefault()

        axios.put(`/auth/user/${props.auth.user.userId}`, { email, password })
            .then(res => {
                props.getUser()
                alert('success')  //toastify
                setForm(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='profile-component'>
            <div className='text'>
                <h1>My Profile</h1>
                <h4>make changes to your account</h4>
            </div>

            <div className='buttons'>
                <button id='change' onClick={() => setForm(true)}>change email and password</button>
                <button id='delete'>delete account</button>
            </div>

            {formOpen ? <div className='auth-box change'>
                <form className='auth-form'>
                    <input
                        type='text'
                        name='email'
                        placeholder='email'
                        defaultValue={props.auth.user.email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type='password'
                        name='password'
                        placeholder='new password'
                        onChange={(e) => setPassword(e.target.value)} />

                    <div className='form-buttons'>
                        <button id='register' type='submit' onClick={(e) => handleClick(e)}>save changes</button>
                    </div>
                </form>
            </div>
                : null}

        </div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getUser})(Profile);


