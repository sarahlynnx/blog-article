import React, {useContext} from 'react';
import { getApiUrl } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import './signup.css';

import user_icon from '../Assets/user.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const Signup = () => {
    const { signup } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        try {
            const response = await fetch(getApiUrl('/api/auth/register'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Signup failed: ', errorData.message);
                return;
            }
            const {user, token} = await response.json();
            signup(user);
            localStorage.setItem('token', token); 
            console.log('Signup successful!');
            navigate('/');
        } catch (error) {
            console.error('Signup failed: ', error.message);
            alert('An error occurred while signing up. Please try again later.');

        }
    };

    return (
        <div className='signup-container'>
            <div className='signup-header'>
                <div className='signup-text'>Sign Up</div>
                <div className='signup-underline'></div>
                <Link to={'/login'}>Already a member? Log In</Link>
            </div>
            <form className='signup-inputs' onSubmit={handleSignupSubmit} >
                <div className='signup-input'>
                    <img src={user_icon} alt='user-icon' />
                    <input id='name' type='text' name='name' placeholder='Name' autoComplete='given-name' />
                </div>
                <div className='signup-input'>
                    <img src={email_icon} alt='email-icon' />
                    <input id='email' type='email' name='email' placeholder='Email' autoComplete='email'/>
                </div>
                <div className='signup-input'>
                    <img src={password_icon} alt='password-icon' />
                    <input id='password' type='password' name='password' placeholder='Password' autoComplete='new-password'/>
                </div>
                <div className='signup-submit-container'>
                    <button type='submit' className='submit-btn'>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signup;