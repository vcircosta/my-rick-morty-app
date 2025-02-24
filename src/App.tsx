import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterDetails";

const App = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Rick & Morty Characters</h1>
        <CharacterList onSelect={(id) => setSelectedId(id)} />
        {selectedId && <CharacterDetails id={selectedId} onClose={() => setSelectedId(null)} />}
      </div>
    </ApolloProvider>
  );
};

export default App;
