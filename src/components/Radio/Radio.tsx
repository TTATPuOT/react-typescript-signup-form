import React from 'react';
import "./Radio.sass";

interface InputProps extends React.HTMLAttributes<HTMLInputElement>  {
    options: string[]
    value?: string
    name: string
}

const Input = (props: InputProps) => {
    return <div className="radio">
        {props.options.map(o => <label key={o}>
            <input type="radio" value={o} {...props} />
            <span>{o}</span>
        </label>)}
    </div>;
}

export default Input;
