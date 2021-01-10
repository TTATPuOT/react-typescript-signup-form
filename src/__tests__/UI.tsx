import React from 'react';
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react';
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import Loader from "../components/Loader";
import Radio from "../components/Radio";
import Select from "../components/Select";

let documentBody: RenderResult;

export default describe('UI Components', () => {
    afterEach(() => cleanup());

    describe('Button', () => {
        it('Base button in document', () => {
            documentBody = render(<Button>Button</Button>);
            const button = documentBody.getByText('Button');

            expect(button).toBeInTheDocument();
            expect(button.nodeName).toBe('BUTTON');
            expect(button).toHaveClass('button');
        });

        it('Disabled', () => {
            documentBody = render(<Button disabled>Button</Button>);
            const button = documentBody.getByText('Button');

            expect(button).not.toBeEnabled();
        });

        it('Type submit', () => {
            documentBody = render(<Button type="submit">Button</Button>);
            const button = documentBody.getByText('Button');

            expect(button).toHaveAttribute('type', 'submit');
        });
    });

    describe('Checkbox', () => {
        it('Base checkbox in document', () => {
            documentBody = render(<Checkbox data-testid="checkbox">Checkbox</Checkbox>);
            const checkbox = documentBody.getByTestId("checkbox").parentElement;

            expect(checkbox).toBeInTheDocument();
            // @ts-ignore
            expect(checkbox.nodeName).toBe('LABEL');
            expect(checkbox).toHaveClass('checkbox');
        });
    });

    describe('Input', () => {
        it('Base input in document', () => {
            documentBody = render(<Input value="value" type="text" onChange={() => {}} />);
            const input = documentBody.getByDisplayValue('value');

            expect(input).toBeInTheDocument();
            expect(input.nodeName).toBe('INPUT');
            expect(input).toHaveClass('input');
        });

        it('Type email', () => {
            documentBody = render(<Input value="value" type="email" onChange={() => {}} />);
            const input = documentBody.getByDisplayValue('value');

            expect(input).toHaveAttribute("type", "email");
        });

        it('Type password', () => {
            documentBody = render(<Input value="value" type="password" onChange={() => {}} />);
            const input = documentBody.getByDisplayValue('value');

            expect(input).toHaveAttribute("type", "password");
        });
    });

    describe('Loader', () => {
        it('Base loader in document', () => {
            documentBody = render(<Loader data-testid="loader" />);
            const loader = documentBody.getByTestId("loader");

            expect(loader).toBeInTheDocument();
            expect(loader.nodeName).toBe('DIV');
            expect(loader).toHaveClass('loader');
        });
    });

    describe('Radio', () => {
        it('Base radio in document', () => {
            documentBody = render(<div data-testid="radio"><Radio options={["Option 1", "Option 2"]} name="radio" /></div>);
            const radio = documentBody.getByTestId("radio").children[0];

            expect(radio).toBeInTheDocument();
            expect(radio.nodeName).toBe('DIV');
            expect(radio).toHaveClass('radio');
        });
    });

    describe('Select', () => {
        it('Base select in document', () => {
            documentBody = render(<div data-testid="select"><Select options={["Option 1", "Option 2"]} value="Option 1" /></div>);
            const select = documentBody.getByTestId("select").children[0];

            expect(select).toBeInTheDocument();
            expect(select.nodeName).toBe('DIV');
            expect(select).toHaveClass('select');
            expect(select).toHaveClass('closed');
        });

        it('Select click', () => {
            documentBody = render(<div data-testid="select"><Select options={["Option 1", "Option 2"]} value="value" /></div>);
            const select = documentBody.getByTestId("select").children[0];

            fireEvent.click(documentBody.getByDisplayValue("value"));

            expect(select).toHaveClass('opened');
            expect(documentBody.getByText("Option 1")).toBeInTheDocument();
            expect(documentBody.getByText("Option 2")).toBeInTheDocument();
        });
    });
})
