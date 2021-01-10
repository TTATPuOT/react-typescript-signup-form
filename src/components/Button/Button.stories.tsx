import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import Button from "./index";
import {ButtonProps} from "./Button";

/*const ButtonPrimary = (disabled: boolean) => <Button disabled={disabled}>Button</Button>;
export const Primary = ButtonPrimary.bind({
    disabled: false
});*/

export default {
    title: 'Forms/Buttons',
    argTypes: {
        disabled: {
            name: "Is button disabled",
            control: {
                type: 'boolean',
            },
        },
    },
} as Meta;

export const Primary: Story<ButtonProps> = ({ disabled }) =>
    <Button disabled={disabled}>Button</Button>;
