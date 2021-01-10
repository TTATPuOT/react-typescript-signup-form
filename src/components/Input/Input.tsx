import React from 'react';
import "./Input.sass";

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    value: string
    type: string
    name?: string
}

const Input = (props: InputProps) => <input className="input" {...props} />;

export default Input;
