import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import Input from "./index";

export const Primary = () => <Input value="" type="text" />;
export const Email = () => <Input value="" type="email" />;
export const Password = () => <Input value="" type="password" />;

export default {
    title: 'Forms/Input'
} as Meta;
