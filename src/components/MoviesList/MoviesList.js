import React from 'react';
import s from './MoviesList.module.css';

export default function MoviesList({ movies, setChosenMovieId, setCurrentPage, currentPage, maxMovies }) {
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
            <div className={s.button_container}>
                <button className={s.button} disabled={currentPage === 0} onClick={() => setCurrentPage(page => page - 1)}>←</button>
                <button className={s.button} disabled={currentPage === Math.ceil(maxMovies / 10) - 1 || maxMovies === 0} onClick={() => setCurrentPage(page => page + 1)}>→</button>
            </div>
        </ul>
    );
};
