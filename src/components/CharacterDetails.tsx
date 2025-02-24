import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_DETAILS } from "../graphql/queries";
import { GetCharacterDetailsQuery } from "../graphql/generated";

const CharacterDetails = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const { data, loading, error } = useQuery<GetCharacterDetailsQuery>(GET_CHARACTER_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const char = data?.character;

  return (
    <div style={{ position: "fixed", top: "10%", left: "30%", background: "white", padding: "20px" }}>
      <button onClick={onClose}>Fermer</button>
      <h2>{char?.name}</h2>
      <img src={char?.image || ""} alt={char?.name || ""} width={200} />
      <p>Espèce: {char?.species}</p>
      <p>Genre: {char?.gender}</p>
      <p>Statut: {char?.status}</p>
      <p>Origine: {char?.origin?.name}</p>
      <p>Localisation: {char?.location?.name}</p>
    </div>
  );
};

export default CharacterDetails;
