import React from 'react';
import s from './MoviesList.module.css';

export default function MoviesList({ movies, setChosenMovieId }) {
    return (
        <ul>
            {movies.map(({ id, title, year, format }) => (
                <li onClick={() => setChosenMovieId(id)} className={s.movie_item} key={id}>
                    <div className={s.container}>
                        <h3 className={s.title}>{title}</h3>
                        <span className={s.year}>{year}</span>
                    </div>
                    <p className={s.format}>{format}</p>
                </li>
            ))}
        </ul>
    );
};
