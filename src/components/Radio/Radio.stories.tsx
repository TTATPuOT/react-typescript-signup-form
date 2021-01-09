import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import Radio from "./index";

export const Primary = () => <Radio options={["Option 1", "Option 2"]} name="radio" />;

export default {
    title: 'Forms/Radio'
} as Meta;
