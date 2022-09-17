import axios from "axios";

const getAllMovies = ({ token, setState }) => {
    axios.get(`${process.env.REACT_APP_API_URL}/movies?sort=title`, {
        headers: {
            "Authorization": token,
        }
    }).then(response => setState(response.data.data));
};

const addMovie = ({ token, movie, setState }) => {
    axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/movies`,
        headers: {
            'Authorization': token,
        },
        data: movie
    }).then(response1 => {
        if (response1.data.status === 1) {
            getAllMovies({ token: token, setState: setState });
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

const deleteMovie = ({ token, id, setState }) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`, {
        headers: {
            "Authorization": token,
        }
    }).then(response1 => {
        if (response1.data.status === 1) {
            getAllMovies({ token: token, setState: setState });
        }
    });
};

const filterMovies = ({ token, title, actorName, setState }) => {
    const tempTitle = title ? `&title=${title}` : '';
    const tempactorName = actorName ? `&actor=${actorName}` : '';
    axios.get(`${process.env.REACT_APP_API_URL}/movies?sort=title${tempTitle}${tempactorName}`, {
        headers: {
            "Authorization": token,
        }
    }).then(response => setState(response.data.data));
};

const importMovies = ({ token, file, setState }) => {
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
            getAllMovies({ token: token, setState: setState });
        }
    });
};

export const moviesApi = {
    getAllMovies,
    addMovie,
    getMovieInfo,
    deleteMovie,
    filterMovies,
    importMovies,
}