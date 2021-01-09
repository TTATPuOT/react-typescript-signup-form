import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import Select from "./index";

export const Primary = () => <Select options={["Option 1", "Option 2"]} value="" />;

export default {
    title: 'Forms/Select'
} as Meta;
