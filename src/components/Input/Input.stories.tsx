import React, {useState} from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import Input from "./index";
import {InputProps} from "./Input";

export default {
    title: 'Forms/Inputs',
    argTypes: {
        type: {
            name: "Input type",
            defaultValue: "text",
            control: {
                type: "select",
                options: [ "text", "email", "password" ],
            },
        },
    },
} as Meta;

export const Primary: Story<InputProps> = ({ type }) => {
    const [value, setValue] = useState<string>("");

    return <Input
        value={value}
        type={type}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
    />;
};
