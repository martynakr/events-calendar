import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Form/Input/Input";
import Form from "../../components/Form/Form";
import Button, { ButtonVariant } from "../../components/Button/Button";
import { LoginData, login } from "../../services/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import HomePageLayout from "../HomePageLayout/HomePageLayout.tsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const methods = useForm();
    const { setError } = methods;

    const onFormSubmit = async (data: LoginData) => {
        try {
            await login(data);
            navigate("/calendar");
        } catch (e) {
            setError("password", {
                message: "Something went wrong, try again",
            });
        }
    };
    return (
        <HomePageLayout>
            <h2>Log in</h2>
            <FormProvider {...methods}>
                <Form onSubmit={onFormSubmit}>
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
                    <Button variant={ButtonVariant.PRIMARY} type="submit">
                        Submit
                    </Button>
                </Form>
            </FormProvider>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </HomePageLayout>
    );
};

export default LoginPage;
