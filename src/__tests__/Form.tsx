import React from 'react';
import { render, RenderResult, cleanup, fireEvent, act, waitFor } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import Form from "../components/Form";
import {SIGN_UP} from "../components/Form/mutations";
import * as Data from "../Data";
import {GraphQLError} from "graphql";

let documentBody: RenderResult;

export default describe('Signup form', () => {
    afterEach(() => cleanup());

    const setup = (props: {} = {}): HTMLElement => {
        const mocks = [
            {
                request: {
                    query: SIGN_UP,
                    variables: {
                        user: {
                            email: "test@test.ru",
                            password: "123456",
                            name: "success",
                            gender: "MALE",
                            country: Data.countries[0]
                        }
                    },
                },
                result: { data: { signup: true } },
            },
            {
                request: {
                    query: SIGN_UP,
                    variables: {
                        user: {
                            email: "test@test.ru",
                            password: "123456",
                            name: "fail",
                            gender: "MALE",
                            country: Data.countries[0]
                        }
                    },
                },
                result: {
                    errors: [new GraphQLError("Any error")],
                },
            },
        ];

        documentBody = render(<MockedProvider mocks={mocks}><Form data-testid="form" {...props} /></MockedProvider>);

        return documentBody.getByTestId('form');
    }

    const setData = async (form: HTMLElement, name: string, email: string) => {
        const setValue = async (name: string, value: string) => {
            act(() => {
                // @ts-ignore
                fireEvent.change(form.querySelector(`input[name="${name}"]`), { target: { value } });
            });
            await waitFor(() => expect(documentBody.getByDisplayValue(value)).toBeInTheDocument());
        }

        await setValue("name", name);
        await setValue("email", email);
        await setValue("password", "123456");

        // @ts-ignore
        act(() => { fireEvent.click(form.querySelector('input[name="gender"]').parentElement) });
        await waitFor(() => expect(documentBody.getByDisplayValue("Male")).toBeChecked());
        // @ts-ignore
        act(() => { fireEvent.click(form.querySelector('input[name="accept"]').parentElement) });
        // @ts-ignore
        act(() => { fireEvent.click(form.querySelector('input[name="country"]')) });

        await waitFor(() => expect(documentBody.getByText(Data.countries[0])).toBeInTheDocument())

        // @ts-ignore
        act(() => { fireEvent.click(documentBody.getByText(Data.countries[0])) });
        await waitFor(() => expect(documentBody.getByDisplayValue(Data.countries[0])).toBeInTheDocument());

        act(() => {
            // @ts-ignore
            fireEvent.click(form.querySelector('button'))
        });
    }

    it('Base form in document', () => {
        const form = setup();

        expect(form).toBeInTheDocument();
        expect(form.nodeName).toBe('FORM');
        expect(form).toHaveClass('register-form');
    });

    it('Form success request', async () => {
        const onDone = jest.fn();
        const form = setup({ onDone });

        await setData(form, "success", "test@test.ru");

        await waitFor(() => expect(onDone).toHaveBeenCalledTimes(1))
    });

    it('Form error request', async () => {
        const onFail = jest.fn();
        const form = setup({ onFail });

        await setData(form, "fail", "test@test.ru");

        await waitFor(() => expect(onFail).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(documentBody.getByText("Any error")).toBeInTheDocument())
        await waitFor(() => expect(documentBody.getByText("Any error")).toHaveClass("error"))
    });
})
