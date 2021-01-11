import React from 'react';
import "./Radio.sass";

interface InputProps extends React.HTMLAttributes<HTMLInputElement>  {
    options: string[]
    value?: string
    name: string
}

const Radio = (props: InputProps) => {
    const otherProps = {...props};
    delete otherProps.value;

    return <div className="radio">
        {props.options.map(o => <label key={o}>
            <input type="radio" value={o} {...otherProps} defaultChecked={o === props.value} />
            <span>{o}</span>
        </label>)}
    </div>;
}

export default Radio;
