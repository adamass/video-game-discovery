import React from "react";
import useGeneres from "../hooks/useGeneres";

const GenreList = () => {
  const { generes } = useGeneres();

  return (
    <ul>
      {generes.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
};

export default GenreList;
