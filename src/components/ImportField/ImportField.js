import React, { useState } from "react";
import s from './ImportField.module.css';

export default function ImportField({ importMovies }) {
    const [importFile, setImportFile] = useState('');

    const toggleImport = e => {
        setImportFile(e.target.files[0]);
    };

    const handleSubmit = e => {
        e.preventDefault();
        importMovies(importFile);
    };
    return (
        <form onSubmit={handleSubmit} className={s.import_container}>
            <p>Load .txt file to import movies</p>
            <input className={s.import_input} accept=".txt" onChange={toggleImport} type="file" />
            <button disabled={!importFile} className={s.import_button} type='submit'>Import</button>
        </form>
    );
};