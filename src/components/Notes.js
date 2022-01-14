import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <Addnote />
      <div className="row my-3">
        <h2 className="text-center ">
          <strong> Your Notes </strong>
        </h2>
        {notes.map((notes) => {
          return <Noteitem key={notes._id} note={notes} />;
        })}
      </div>
    </>
  );
};

export default Notes;
