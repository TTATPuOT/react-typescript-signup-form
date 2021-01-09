import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import Loader from "./index";

export const Primary = () => <Loader />;

export default {
    title: 'Forms/Loader',
    decorators: [(Story) => <div style={{ background: "#999" }}><Story/></div>]
} as Meta;
