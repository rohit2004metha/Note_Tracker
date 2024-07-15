import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import './AddNote.css'; // Replace with your CSS file path

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: '', description: '', tag: '' });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' });
        props.showAlert('Added Successfully', 'success');
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control custom-input animated-input"
                        id="title"
                        name="title"
                        aria-describedby="emailHelp"
                        value={note.title}
                        onChange={onChange}
                        placeholder="Minimum length is 5"
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control custom-input animated-input"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                        placeholder="Minimum length is 5"
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                        Tag
                    </label>
                    <input
                        type="text"
                        className="form-control custom-input animated-input"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                        required
                    />
                </div>

                <button
                    disabled={note.title.length < 5 || note.description.length < 5}
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                >
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNote;
