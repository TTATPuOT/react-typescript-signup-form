import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import Form from "./index";
import {ApolloProvider} from "@apollo/client";
import ApolloClient from "../../ApolloClient";

export const Registration = () => <ApolloProvider client={ApolloClient}><Form /></ApolloProvider>;

export default {
    title: 'Forms'
} as Meta;
