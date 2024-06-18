import { RegisterData, register } from "../../services/auth.ts";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import Button, { ButtonVariant } from "../../components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "./register-schema";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const methods = useForm({ resolver: zodResolver(registerSchema) });

    const {
        formState: { isSubmitSuccessful },
        setError,
    } = methods;

    const onFormSubmit = async (data: RegisterData) => {
        try {
            await register(data);
        } catch (e) {
            setError("Registration", {
                message: "Something went wrong, try again",
            });
        }
    };
    useEffect(() => {
        if (isSubmitSuccessful) navigate("/calendar");
    }, [isSubmitSuccessful]);

    return (
        <div>
            <h1>Register</h1>
            <p>Create an account and never miss an event!</p>
            <FormProvider {...methods}>
                <Form onSubmit={onFormSubmit}>
                    <Input id="firstName" labelText="First name" />
                    <Input id="lastName" labelText="Last name" />
                    <Input id="email" type="email" labelText="Email" />
                    <Input id="password" type="password" labelText="Password" />
                    <Input
                        id="passwordConfirm"
                        type="password"
                        labelText="Confirm password"
                    />
                    <Button variant={ButtonVariant.PRIMARY} type="submit">
                        Submit
                    </Button>
                </Form>
            </FormProvider>
        </div>
    );
};

export default RegisterPage;
