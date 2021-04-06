import './App.css';
import React from 'react';

import DisplayCarriersView from "./components/DisplayCarriersView";
import {Container} from "./globalStyles";

function App() {
  return (
   <Container>
      <DisplayCarriersView
      />
   </Container>
  );
}

export default App;
