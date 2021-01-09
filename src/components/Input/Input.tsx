import React from 'react';
import "./Input.sass";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    value: string
    type: string
    name?: string
}

const Input = (props: InputProps) => <input className="input" {...props} />;

export default Input;
