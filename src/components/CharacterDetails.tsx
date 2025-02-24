import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_DETAILS } from "../graphql/queries";
import { GetCharacterDetailsQuery } from "../graphql/generated";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const CharacterDetails = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const { data, loading, error } = useQuery<GetCharacterDetailsQuery>(GET_CHARACTER_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const char = data?.character;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <Box
      className="fixed top-[10%] left-[30%]"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden bg-green-500"
      >
        <div className="p-6">
          <button className="bg-black text-white py-2 px-4 rounded" onClick={onClose} style={{ fontFamily: "Creepster" }}>
            Fermer
          </button>
          <Typography variant="h5" component="h2" className="mb-2 text-black" style={{ fontFamily: "Creepster" }}>
            {char?.name}
          </Typography>
          <img src={char?.image || ""} alt={char?.name || ""} className="w-full rounded-md mb-4" />
          <Typography variant="body1" className="mb-1 text-black">
            Espèce: {char?.species}
          </Typography>
          <Typography variant="body1" className="mb-1 text-black">
            Genre: {char?.gender}
          </Typography>
          <Typography variant="body1" className="mb-1 text-black">
            Statut: {char?.status}
          </Typography>
          <Typography variant="body1" className="mb-1 text-black">
            Origine: {char?.origin?.name}
          </Typography>
          <Typography variant="body1" className="text-black">
            Localisation: {char?.location?.name}
          </Typography>
        </div>
      </motion.div>
    </Box>
  );
};

export default CharacterDetails;
