import React, { useState } from "react";
import s from './FilterPanel.module.css';

export default function FilterPanel({ filterMovies }) {
    const [filterTitle, setFilterTitle] = useState('');
    const [filterActorName, setFilterActorName] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'filterTitle':
                setFilterTitle(value);
                break;

            case 'filterActorName':
                setFilterActorName(value);
                break;

            default:
                return;
        };
    };

    const handleSubmit = e => {
        e.preventDefault();
        filterMovies({ title: filterTitle, actorName: filterActorName });
    };
    return (
        <form onSubmit={handleSubmit} className={s.container}>
            <input
                className={s.input}
                onChange={handleChange}
                placeholder="Enter movie title"
                value={filterTitle}
                name="filterTitle"
                type="text"
            />
            <input
                className={s.input}
                onChange={handleChange}
                placeholder="Enter actor`s name"
                value={filterActorName}
                name="filterActorName"
                type="text"
            />
            <button className={s.search_button} type="submit">Search</button>
        </form>
    );
};