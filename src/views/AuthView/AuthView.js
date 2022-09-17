import React, { useState } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import AuthorizationForm from '../../components/AuthorizationForm/AuthorizationForm';
import s from './AuthView.module.css';

export default function AuthView() {
    const [authShow, setAuthShow] = useState(true);

    const changeAuthType = () => {
        setAuthShow(authShow => !authShow);
    };

    return (
        <div className={s.container}>
            {authShow ?
                <RegistrationForm changeAuthType={changeAuthType} /> :
                <AuthorizationForm changeAuthType={changeAuthType} />
            }

        </div>
    );
}
