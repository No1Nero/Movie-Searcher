import React from "react";
import s from './ConfirmDeleting.module.css';

export default function ConfirmDeleting({ toggleModalConfirm, deleteMovie }) {
    const deleteConfirmed = () => {
        deleteMovie();
        toggleModalConfirm();
    };

    return (
        <div onClick={toggleModalConfirm} className={s.modal}>
            <div onClick={e => e.stopPropagation()} className={s.modal_content}>
                <p>Are you sure you want to delete this movie?</p>
                <div className={s.button_container}>
                    <button className={s.button} onClick={deleteConfirmed}>Yes</button>
                    <button className={s.button} onClick={toggleModalConfirm}>Cancel</button>
                </div>
            </div>
        </div>
    );
};