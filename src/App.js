import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";

const AuthView = lazy(() => import('./views/AuthView/AuthView'));
const MoviesView = lazy(() => import('./views/MoviesView/MoviesView'));

export default function App() {
  const token = useSelector(state => state.auth.token);

  return (
    <div>
      <Header />
      <Suspense>
        <Routes>
          <Route path="/" element={token ? <Navigate to='movies' /> : <AuthView />} />
          <Route path="movies" element={token ? <MoviesView /> : <Navigate to='/' />} />
        </Routes>
      </Suspense>
    </div>
  );
}
