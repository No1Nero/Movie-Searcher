import React, { useState } from "react";
import s from './ModalForm.module.css';

const formats = ['VHS', 'DVD', 'Blu-Ray'];

export default function ModalForm({ toggleModal, addMovie }) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [format, setFormat] = useState('');
    const [actorList, setActorList] = useState([{ actor: "" }]);

    const addActorInput = () => {
        setActorList(list => [...list, { actor: "" }]);
    };

    const removeActorInput = (index, e) => {
        e.preventDefault();
        const list = [...actorList];
        list.splice(index, 1);
        setActorList(list);
    };

    const changeActorInput = (e, index) => {
        const { name, value } = e.target;
        const list = [...actorList];
        list[index][name] = value.replace(/[!'"№;%:?*}{()_@#$^&+=<>1234567890/|{},]/, '');
        setActorList(list);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setTitle(value.replace(/[!'"№;%:?*}{()_@#$^&+=<>/|{},]/, ''));
                break;

            case 'year':
                setYear(value);
                break;

            case 'format':
                setFormat(value);
                break;

            default:
                return;
        };
    };

    const handleSubmit = e => {
        e.preventDefault();
        const movieObject = {
            title: title,
            year: year,
            format: format,
            actors: actorList.map(actor => actor.actor)
        };
        addMovie(movieObject);
        toggleModal();
    };

    return (
        <div onClick={toggleModal} className={s.modal}>
            <form onSubmit={handleSubmit} onClick={e => e.stopPropagation()} className={s.modal_content}>
                <p className={s.header}>Add movie</p>
                <input
                    placeholder="Enter title"
                    className={s.input}
                    onChange={handleChange}
                    value={title}
                    name="title"
                    type='text'
                />
                <input
                    placeholder="Enter year"
                    className={s.input}
                    onChange={handleChange}
                    value={year}
                    name="year"
                    type="number"
                />
                <select className={s.select} onChange={handleChange} placeholder="Choose format" value={format} name='format'>
                    <option></option>
                    {formats.map((form, index) => (
                        <option key={index}>{form}</option>
                    ))}
                </select>
                <div className={s.actor_container}>
                    <p className={s.actor_header}>Actors</p>
                    {actorList.map((oneActor, index) => (
                        <div key={index}>
                            <div className={s.one_field_container}>
                                <input
                                    placeholder="Enter actor`s name"
                                    className={s.one_actor_input}
                                    onChange={(e) => changeActorInput(e, index)}
                                    value={oneActor.actor}
                                    name="actor"
                                    type='text'
                                />
                                {actorList.length > 1 &&
                                    <button className={s.delete_actor_button} onClick={(e) => removeActorInput(index, e)}>X</button>
                                }
                            </div>
                            {actorList.length - 1 === index &&
                                <button className={s.add_actor_button} onClick={addActorInput}>Add more actor</button>
                            }
                        </div>
                    ))}
                </div>
                <div className={s.submit_button_container}>
                    <button
                        disabled={title.trim() === '' || !year || !format || !actorList}
                        className={s.submit_button}
                        type="submit">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};