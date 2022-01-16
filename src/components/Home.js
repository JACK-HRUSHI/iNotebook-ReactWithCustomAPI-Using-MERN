import React from "react";
// import Addnote from "./Addnote";
import Notes from "./Notes";

export const Home = (props) => {
  const { showAlert } = props; // De-structuring
  return (
    <>
      <Notes showAlert={showAlert} />
    </>
  );
};

export default Home;
