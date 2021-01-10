import React from 'react';
import "./Button.sass";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    type?: "button"|"submit"|"reset"
    disabled?: boolean
}

const Button = (props: ButtonProps) => <button className="button" {...props}>
    {props.children ?? ""}
</button>;

export default Button;
