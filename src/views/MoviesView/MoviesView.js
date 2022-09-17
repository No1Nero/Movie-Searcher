import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { moviesApi } from "../../services/movies-service";
import MoviesList from "../../components/MoviesList/MoviesList";
import ModalForm from "../../components/ModalForm/ModalForm";
import FullInfo from "../../components/FullInfo/FullInfo";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ImportField from "../../components/ImportField/ImportField";
import s from './MoviesView.module.css';


export default function MoviesView() {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [chosenMovieId, setChosenMovieId] = useState(null);

    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        moviesApi.getAllMovies({ token: token, setState: setMovies });
    }, [token]);

    const toggleModal = () => {
        setShowModal(showModal => !showModal);
    };

    const addMovie = movie => {
        moviesApi.addMovie({ token: token, movie: movie, setState: setMovies });
    };

    const deleteMovie = () => {
        moviesApi.deleteMovie({ token: token, id: chosenMovieId, setState: setMovies });
        setChosenMovieId(null);
    };

    const filterMovies = ({ title, actorName }) => {
        moviesApi.filterMovies({
            token: token,
            actorName: actorName,
            title: title,
            setState: setMovies,
        });
    };

    const importMovies = file => {
        moviesApi.importMovies({ token: token, file: file, setState: setMovies });
    };

    return (
        <div className={s.main}>
            {showModal && <ModalForm addMovie={addMovie} toggleModal={toggleModal} />}
            <div className={s.options_container}>
                <FilterPanel filterMovies={filterMovies} />
                <button className={s.open_modal_button} onClick={toggleModal}>Add movie</button>
                <ImportField importMovies={importMovies} />
            </div>
            <div className={s.content}>
                <MoviesList setChosenMovieId={setChosenMovieId} movies={movies} />
                <FullInfo deleteMovie={deleteMovie} chosenMovieId={chosenMovieId} />
            </div>
        </div>
    );
};