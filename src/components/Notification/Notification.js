import React, { useEffect, useState } from "react";
import s from './Notification.module.css';

export default function Notification({ requestStatus, notificationMessage, clearNotifyFields }) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (requestStatus) {
            setMessage(notificationMessage);
        } else {
            const name = Object.values(notificationMessage)[0];
            switch (name) {
                case 'TOO_HIGH':
                    setMessage('Error! Invalid year');
                    break;

                case 'NOT_UNIQUE':
                    setMessage('Error! Not unique title');
                    break;

                case 'NOT_POSITIVE_INTEGER':
                    setMessage('Error! Downloaded file is incorrect');
                    break;

                default:
                    return;
            };
        }

        return () => {
            setTimeout(() => {
                clearNotifyFields();
            }, 3000);
        };

    }, [requestStatus, notificationMessage, clearNotifyFields]);

    return (
        <div className={s.container}>
            {message}
            <p className={requestStatus ? s.success_bar : s.error_bar} />
        </div>
    );
};