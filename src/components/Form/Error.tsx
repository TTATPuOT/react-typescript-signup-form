import React from 'react';
import {ErrorType} from "./Form";

type ErrorProps = {
    errors: ErrorType[]
    name: string
}

function Error(props: ErrorProps) {
    const error = props.errors.find(e => e.name === props.name);

    if (error) return <div className="error">{error.text}</div>;
    else return null;
}

export default Error;
