import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { moviesApi } from "../../services/movies-service";
import MoviesList from "../../components/MoviesList/MoviesList";
import ModalForm from "../../components/ModalForm/ModalForm";
import FullInfo from "../../components/FullInfo/FullInfo";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ImportField from "../../components/ImportField/ImportField";
import Notification from "../../components/Notification/Notification";
import s from './MoviesView.module.css';

export default function MoviesView() {
    const [movies, setMovies] = useState([]);
    const [requestStatus, setRequestStatus] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [chosenMovieId, setChosenMovieId] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxMovies, setMaxMovies] = useState(0);

    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        moviesApi.getAllMovies({
            token: token,
            setState: setMovies,
            page: currentPage,
            setMax: setMaxMovies
        });
    }, [token, currentPage]);

    useEffect(() => {
        if (notificationMessage) {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        }
    }, [notificationMessage]);

    const toggleModal = () => {
        setShowModal(showModal => !showModal);
    };

    const addMovie = movie => {
        moviesApi.addMovie({
            token: token,
            movie: movie,
            setState: setMovies,
            setStatus: setRequestStatus,
            setNotification: setNotificationMessage,
            page: currentPage,
            setMax: setMaxMovies,
        });
    };

    const deleteMovie = () => {
        moviesApi.deleteMovie({
            token: token,
            id: chosenMovieId,
            setState: setMovies,
            page: currentPage,
            setMax: setMaxMovies,
            setStatus: setRequestStatus,
            setNotification: setNotificationMessage,
        });
        setChosenMovieId(null);
    };

    const filterMovies = ({ title, actorName }) => {
        setCurrentPage(0);
        moviesApi.filterMovies({
            token: token,
            actorName: actorName,
            title: title,
            setState: setMovies,
            page: currentPage,
            setMax: setMaxMovies
        });
    };

    const importMovies = file => {
        moviesApi.importMovies({
            token: token,
            file: file,
            setState: setMovies,
            setStatus: setRequestStatus,
            setNotification: setNotificationMessage,
            page: currentPage,
            setMax: setMaxMovies
        });
    };

    const clearNotifyFields = () => {
        setRequestStatus(null);
        setNotificationMessage('');
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
                <MoviesList maxMovies={maxMovies} currentPage={currentPage} setCurrentPage={setCurrentPage} setChosenMovieId={setChosenMovieId} movies={movies} />
                <FullInfo deleteMovie={deleteMovie} chosenMovieId={chosenMovieId} />
            </div>
            {showNotification &&
                <Notification clearNotifyFields={clearNotifyFields} requestStatus={requestStatus} notificationMessage={notificationMessage} />
            }
        </div>
    );
};
