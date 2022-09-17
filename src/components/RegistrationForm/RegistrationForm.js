import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from '../../redux/auth/auth-operations';
import s from './RegistrationForm.module.css';

export default function RegistrationForm({ changeAuthType }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const handleRegistration = user => {
        dispatch(authOperations.register(user));
    };

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;

            case 'name':
                setName(value);
                break;

            case 'password':
                setPassword(value);
                break;

            case 'confirmPassword':
                setConfirmPassword(value);
                break;

            default:
                return;
        };
    };

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            email: email,
            name: name,
            password: password,
            confirmPassword: confirmPassword,
        };
        handleRegistration(user);
        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <form onSubmit={handleSubmit} className={s.container}>
            <div className={s.content}>
                <h2 className={s.header}>Registration</h2>
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
                        name='name'
                        value={name}
                        type='text'
                        placeholder='Enter name'
                    />
                    <input
                        className={s.input}
                        onChange={handleChange}
                        name='password'
                        value={password}
                        type='password'
                        placeholder='Enter password'
                    />
                    <input
                        className={s.input}
                        onChange={handleChange}
                        name='confirmPassword'
                        value={confirmPassword}
                        type='password'
                        placeholder='Confirm password'
                    />
                </div>
                <div className={s.button_container}>
                    <p onClick={changeAuthType} className={s.sign_in_text}>Sign in</p>
                    <button
                        disabled={password !== confirmPassword || !email || !name || !password}
                        className={s.sign_up_button}
                        type='submit'>
                        Sign up
                    </button>
                </div>
            </div>
        </form>
    );
};