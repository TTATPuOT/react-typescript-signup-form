import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import Input from "../Input";
import Select from "../Select";
import Radio from "../Radio/Radio";
import Checkbox from "../Checkbox";
import Button from "../Button";
import * as Data from "../../Data";
import {useMutation} from "@apollo/client";
import {AuthPayloadType, CREATE_USER, CreateUserInput} from "./mutations";
import Error from "./Error";
import Loader from "../Loader";

import "./Form.sass";

const schema = yup.object().shape({
    fullName: yup.string().required().matches(/^[A-z ]*$/gm, "Please enter a valid name"),
    email: yup.string().email("Please enter a valid email address").required(),
    password: yup.string().required().min(6, "Password must contain at least 6 symbols"),
    country: yup.string().required().oneOf(Data.countries),
    gander: yup.string().required().oneOf(["Male", "Female"]),
    accept: yup.boolean().required().oneOf([true], "You must accept the policies")
});

type FormData = {
    fullName?: string
    email?: string
    password?: string
    country?: string
    gender?: string
    accept?: boolean
};

export type ErrorType = {
    name: string
    text: string
};

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {}

const Form = (props: FormProps) => {
    const [data, setData] = useState<FormData>({  });
    const [valid, setValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<ErrorType[]>([]);

    const [ createUser ] = useMutation<{createUser: AuthPayloadType}, {user: CreateUserInput}>(CREATE_USER);

    const handleChange = (name: string, value: string|boolean) => {
        const newData = Object.assign({}, data, { [name]: value });
        setData(newData);
    };

    const handleInputChange = ({ target, currentTarget }: React.FormEvent<HTMLInputElement|HTMLSelectElement>) => {
        const { name, type, value } = currentTarget;

        let newValue: string|boolean = value;

        if (type === "checkbox") {
            // @ts-ignore
            newValue = !!target.checked;
        }

        return handleChange(name, newValue);
    };

    const mutateCreateUser = () => {
        if (data.email && data.password && data.fullName && data.country) {
            setLoading(true);
            createUser({ variables: {
                    user: {
                        email: data.email,
                        password: data.password,
                        fullName: data.fullName,
                        country: data.country,
                    }
                } })
                .then(response => {
                    alert(`Регистрация завершена, токен: ${response.data?.createUser.token}`);
                    setLoading(false);
                })
                .catch(e => {
                    setErrors([{
                        name: "email",
                        text: e.message
                    }]);
                    setLoading(false);
                });
        }
    }

    useEffect(() => {
        schema
            .validate(data, { abortEarly: false })
            .then(() => {
                setValid(true);
                setErrors([]);
            })
            .catch(e => {
                const array: ErrorType[] = [];

                if (e.inner.length) {
                    for (const error of e.inner) {
                        //@ts-ignore
                        if (data[error.path] !== undefined) {
                            array.push({
                                name: error.path,
                                text: error.message
                            });
                        }
                    }
                }

                setErrors(array);
            });
    }, [data]);

    return <form className="register-form" {...props}>
        <h1>Create a new account</h1>

        <div className="row">
            <Input
                value={data.fullName ?? ""}
                onChange={handleInputChange}
                name="fullName"
                type="text"
                placeholder="Enter your name"
            />
            <Error errors={errors} name="fullName" />
        </div>
        <div className="row">
            <Input
                value={data.email ?? ""}
                onChange={handleInputChange}
                name="email"
                type="email"
                placeholder="Email"
            />
            <Error errors={errors} name="email" />
        </div>
        <div className="row">
            <Input
                value={data.password ?? ""}
                onChange={handleInputChange}
                name="password"
                type="password"
                placeholder="Password"
            />
            <Error errors={errors} name="password" />
        </div>
        <div className="row">
            <Select
                value={data.country ?? ""}
                handleChange={(value: string) => handleChange("country", value)}
                placeholder="Select country"
                options={Data.countries}
            />
            <Error errors={errors} name="country" />
        </div>
        <div className="row row-radio">
            <Radio
                options={["Male", "Female"]}
                name="gander"
                onChange={(e) => handleInputChange(e)}
            />
            <Error errors={errors} name="gender" />
        </div>
        <div className="row row-checkbox">
            <Checkbox
                onChange={(e) => handleInputChange(e)}
                name="accept"
            >
                Accept <a href="#terms">terms</a> and <a href="#conditions">conditions</a>
            </Checkbox>
            <Error errors={errors} name="accept" />
        </div>
        <div className="row row-button">
            <Button type="button" disabled={!valid || loading} onClick={mutateCreateUser}>
                {loading ? <Loader /> : "Sign up"}
            </Button>
        </div>
    </form>;
}

export default Form;
