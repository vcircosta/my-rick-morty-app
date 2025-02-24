import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_DETAILS } from "../graphql/queries";
import { GetCharacterDetailsQuery } from "../graphql/generated";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const MotionCard = motion(Card);

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #3DDC84 30%, #2196F3 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(61, 220, 132, .3)',
  color: 'white',
  padding: '0 30px',
  '&:hover': {
    background: 'linear-gradient(45deg, #2196F3 30%, #3DDC84 90%)',
    boxShadow: `0 3px 5px 2px rgba(33, 203, 243, .3)`,
  },
}));

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
      sx={{
        position: "fixed",
        top: "10%",
        left: "30%",
      }}
    >
      <MotionCard
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: 400,
          margin: "auto",
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          background: 'linear-gradient(135deg, #e0f7fa, #b2ebf2)',
        }}
      >
        <CardContent>
          <StyledButton onClick={onClose} variant="contained" style={{ marginBottom: "16px" }}>
            Fermer
          </StyledButton>
          <Typography variant="h5" component="h2" gutterBottom>
            {char?.name}
          </Typography>
          <img src={char?.image || ""} alt={char?.name || ""} width="100%" style={{ borderRadius: "8px", marginBottom: "16px" }} />
          <Typography variant="body1" gutterBottom>
            Espèce: {char?.species}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Genre: {char?.gender}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Statut: {char?.status}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Origine: {char?.origin?.name}
          </Typography>
          <Typography variant="body1">
            Localisation: {char?.location?.name}
          </Typography>
        </CardContent>
      </MotionCard>
    </Box>
  );
};

export default CharacterDetails;
