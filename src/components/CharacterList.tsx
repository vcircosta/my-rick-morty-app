import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import { GetCharactersQuery } from "../graphql/generated";


const CharacterList = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<GetCharactersQuery>(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h1>Personnages</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {data?.characters?.results?.map((char) => (
          <div key={char?.id} onClick={() => onSelect(char?.id || "")} style={{ cursor: "pointer" }}>
            <img src={char?.image || ""} alt={char?.name || ""} width={100} />
            <p>{char?.name}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setPage((p) => p + 1)}>Page Suivante</button>
    </div>
  );
};

export default CharacterList;
