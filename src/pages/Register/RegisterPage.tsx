import { RegisterData, register } from "../../services/auth.ts";
import { FormProvider, useForm } from "react-hook-form";
import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input/Input";
import Button, { ButtonVariant } from "../../components/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "./register-schema";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomePageLayout from "../HomePageLayout/HomePageLayout.tsx";
import { Link } from "react-router-dom";

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
        <HomePageLayout>
            <h2>Register</h2>
            <FormProvider {...methods}>
                <Form onSubmit={onFormSubmit}>
                    <Input
                        id="firstName"
                        labelText="First name"
                        placeholder="First name"
                    />
                    <Input
                        id="lastName"
                        labelText="Last name"
                        placeholder="Last name"
                    />
                    <Input
                        id="email"
                        type="email"
                        labelText="Email"
                        placeholder="example@email.com"
                    />
                    <Input
                        id="password"
                        type="password"
                        labelText="Password"
                        placeholder="Password"
                    />
                    <Input
                        id="passwordConfirm"
                        type="password"
                        labelText="Confirm password"
                        placeholder="Confirm password"
                    />
                    <Button variant={ButtonVariant.PRIMARY} type="submit">
                        Submit
                    </Button>
                </Form>
                <p>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </FormProvider>
        </HomePageLayout>
    );
};

export default RegisterPage;
