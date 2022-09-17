import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from '../../redux/auth/auth-operations';
import s from './AuthorizationForm.module.css';

export default function AuthorizationForm({ changeAuthType }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleAuthorization = user => {
        dispatch(authOperations.login(user));
    };

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;

            case 'password':
                setPassword(value);
                break;

            default:
                return;
        };
    };

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
        };
        handleAuthorization(user);
        setEmail('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit} className={s.container}>
            <div className={s.content}>
                <h2 className={s.header}>Authorization</h2>
                <div className={s.input_wrapper}>
                    <input
                        className={s.input}
                        onChange={handleChange}
                        name='email'
                        value={email}
                        type='text'
                        placeholder='Enter email'
                    />
                    <input
                        className={s.input}
                        onChange={handleChange}
                        name='password'
                        value={password}
                        type='password'
                        placeholder='Enter password'
                    />
                </div>
                <div className={s.button_container}>
                    <p onClick={changeAuthType} className={s.sign_up_text}>Sign up</p>
                    <button
                        disabled={!email || !password}
                        className={s.sign_in_button}
                        type='submit'>
                        Sign in
                    </button>
                </div>
            </div>

        </form>
    );
};