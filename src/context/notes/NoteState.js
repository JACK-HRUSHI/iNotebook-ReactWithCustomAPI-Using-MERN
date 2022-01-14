import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [
    {
      _id: "61ded9fbc2a2bdcf47266474",
      user: "61dec89cfb475dab811c548d",
      title: "My title",
      description: "Please wakeup early",
      tag: "Personal",
      date: "2022-01-12T13:39:07.649Z",
      __v: 0,
    },
    {
      _id: "61ded9fbc2a2bdcf472662476",
      user: "61dec89cfb475dab811c548d",
      title: "My title",
      description: "Please wakeup early",
      tag: "Personal",
      date: "2022-01-12T13:39:07.826Z",
      __v: 0,
    },
    {
      _id: "61ded9fb5c2a2bdcf47266476",
      user: "61dec89cfb475dab811c548d",
      title: "My title",
      description: "Please wakeup early",
      tag: "Personal",
      date: "2022-01-12T13:39:07.826Z",
      __v: 0,
    },
    {
      _id: "61ded9fbc2a2bd4cf47266476",
      user: "61dec89cfb475dab811c548d",
      title: "My title",
      description: "Please wakeup early",
      tag: "Personal",
      date: "2022-01-12T13:39:07.826Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = async (title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZWM4OWNmYjQ3NWRhYjgxMWM1NDhkIn0sImlhdCI6MTY0MTk5MDk5MX0.flmc6MdGjqC3A5R8QpuJxN0kaOfFQ2jIiVCUjzZW-AY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json();

    //Logic to add Note

    console.log("Adding a new note");
    const note = {
      _id: "61ded9f4bc2a2bd4cf47266476",
      user: "61dec89cfb475dab811c548d",
      title: title,
      description: description,
      tag: tag,
      date: "2022-01-12T13:39:07.826Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = (id) => {
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkZWM4OWNmYjQ3NWRhYjgxMWM1NDhkIn0sImlhdCI6MTY0MTk5MDk5MX0.flmc6MdGjqC3A5R8QpuJxN0kaOfFQ2jIiVCUjzZW-AY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    //Logic to edit Note

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <>
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
