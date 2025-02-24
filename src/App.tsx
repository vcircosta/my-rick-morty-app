import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionContainer = motion(Container);

const App = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <ApolloProvider client={client}>
      <MotionContainer className="pt-5">
        <Typography fontFamily="Creepster" className="text-green-400" variant="h4" component="h1" gutterBottom>
          Personnages rick & morty
        </Typography>
        <CharacterList onSelect={(id) => setSelectedId(id)} />
        {selectedId && <CharacterDetails id={selectedId} onClose={() => setSelectedId(null)} />}
      </MotionContainer>
    </ApolloProvider>
  );
};

export default App;
