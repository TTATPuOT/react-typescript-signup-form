import React from 'react';
import "./Loader.sass";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Loader = (props: LoaderProps) => <div {...props} className="loader" />;

export default Loader;
