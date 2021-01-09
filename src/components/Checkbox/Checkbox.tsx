import React from 'react';
import "./Checkbox.sass";

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode
    name?: string
}

const Checkbox = (props: CheckboxProps) => {
    const passProps = { ...props };
    delete passProps.children;

    return <label className="checkbox">
        <input type="checkbox" {...passProps} />
        <span>{props.children}</span>
    </label>
};

export default Checkbox;
