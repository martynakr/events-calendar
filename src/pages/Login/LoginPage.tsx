import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Form/Input/Input";
import Form from "../../components/Form/Form";
import Button, { ButtonVariant } from "../../components/Button/Button";
import { LoginData, login } from "../../services/services";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const LoginPage = () => {
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const methods = useForm();
    const { setError } = methods;

    const onFormSubmit = async (data: LoginData) => {
        try {
            await login(data);
            //setToken(token.token);
            navigate("/calendar");
        } catch (e) {
            setError("password", {
                message: "Something went wrong, try again",
            });
        }
    };
    return (
        <div>
            <FormProvider {...methods}>
                <Form onSubmit={onFormSubmit}>
                    <Input id="email" type="email" labelText="Email" />
                    <Input id="password" type="password" labelText="Password" />
                    <Button variant={ButtonVariant.PRIMARY} type="submit">
                        Submit
                    </Button>
                </Form>
            </FormProvider>
        </div>
    );
};

export default LoginPage;
