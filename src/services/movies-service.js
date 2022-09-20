import axios from "axios";

const getAllMovies = ({ token, setState, page, setMax }) => {
    axios.get(`${process.env.REACT_APP_API_URL}/movies?sort=title&limit=10&offset=${page * 10}`, {
        headers: {
            "Authorization": token,
        }
    }).then(response => {
        setState(response.data.data);
        setMax(response.data.meta.total);
    });
};

const addMovie = ({ token, movie, setState, setStatus, setNotification, page, setMax }) => {
    axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/movies`,
        headers: {
            'Authorization': token,
        },
        data: movie
    }).then(response => {
        if (response.data.status === 1) {
            getAllMovies({ token: token, setState: setState, page: page, setMax: setMax });
            setStatus(response.data.status);
            setNotification('Movie added!');
        } else {
            setStatus(response.data.status);
            setNotification(response.data.error.fields);
        }
    });
};

const getMovieInfo = ({ token, id, setState }) => {
    axios.get(`${process.env.REACT_APP_API_URL}/movies/${id}`, {
        headers: {
            "Authorization": token,
        }
    }).then(response => setState(response.data.data));
};

const deleteMovie = ({ token, id, setState, page, setMax, setStatus, setNotification }) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`, {
        headers: {
            "Authorization": token,
        }
    }).then(response => {
        if (response.data.status === 1) {
            getAllMovies({ token: token, setState: setState, page: page, setMax: setMax });
            setStatus(response.data.status);
            setNotification('Movie deleted!');
        }
    });
};

const filterMovies = ({ token, title, actorName, setState, page, setMax }) => {
    const tempTitle = title ? `&title=${title}` : '';
    const tempActorName = actorName ? `&actor=${actorName}` : '';
    axios.get(`${process.env.REACT_APP_API_URL}/movies?sort=title&limit=10&offset=${page * 10}${tempTitle}${tempActorName}`, {
        headers: {
            "Authorization": token,
        }
    }).then(response => {
        setState(response.data.data);
        setMax(response.data.meta.total);
    });
};

const importMovies = ({ token, file, setState, setStatus, setNotification, page, setMax }) => {
    const formData = new FormData();
    formData.append("movies", file);
    axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/movies/import`,
        headers: {
            'Authorization': token,
            "Content-Type": "multipart/form-data",
        },
        data: formData
    }).then(response => {
        if (response.data.status === 1) {
            getAllMovies({ token: token, setState: setState, page: page, setMax: setMax });
            setStatus(response.data.status);
            setNotification(`Imported ${response.data.meta.imported} movies!`);
        } else {
            setStatus(response.data.status);
            setNotification(response.data.error.fields);
        }
    }
    );
};

export const moviesApi = {
    getAllMovies,
    addMovie,
    getMovieInfo,
    deleteMovie,
    filterMovies,
    importMovies,
}