import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import Button from "./index";

export const Primary = () => <Button>Button</Button>;
export const Disabled = () => <Button disabled>Button</Button>;

export default {
    title: 'Forms/Button'
} as Meta;
