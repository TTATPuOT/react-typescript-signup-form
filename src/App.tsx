import React from "react";
import Form from "./components/Form";

function App() {
  return <Form onDone={(token: string) => alert(token)} />;
}

export default App;
