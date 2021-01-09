import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {ApolloProvider} from "@apollo/client";
import ApolloClient from "./ApolloClient";

import "@fontsource/roboto";
import "./index.sass";

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={ApolloClient}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
