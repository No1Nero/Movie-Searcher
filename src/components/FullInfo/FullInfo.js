import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { moviesApi } from "../../services/movies-service";
import s from './FullInfo.module.css';

export default function FullInfo({ chosenMovieId, deleteMovie }) {
    const [fullInfo, setFullInfo] = useState({});

    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        chosenMovieId && moviesApi.getMovieInfo({
            id: chosenMovieId,
            token: token,
            setState: setFullInfo,
        });
    }, [chosenMovieId, token]);

    return (
        <div className={s.main}>
            <div className={s.container}>
                {chosenMovieId && fullInfo ?
                    <div className={s.wrapper}>
                        <h2 className={s.header}>Movie full info</h2>
                        <div className={s.content}>
                            <p className={s.info_label}>Title:
                                <span className={s.info_field_title}>{fullInfo.title}</span>
                            </p>
                            <p className={s.info_label}>Year:
                                <span className={s.info_field}>{fullInfo.year}</span>
                            </p>
                            <p className={s.info_label}>Format:
                                <span className={s.info_field}>{fullInfo.format}</span>
                            </p>
                            <div className={s.actor_container}>
                                <p className={s.info_label}>Actors:</p>
                                <div className={s.info_field}>
                                    {fullInfo.actors && fullInfo.actors.map(({ id, name }) => (
                                        <span className={s.actor_field} key={id}>{name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={s.button_container}>
                            <button onClick={deleteMovie} className={s.delete_button}>Delete movie</button>
                        </div>
                    </div> :
                    <div className={s.no_film}>
                        No selected film yet
                    </div>
                }
            </div>
        </div>
    );
};