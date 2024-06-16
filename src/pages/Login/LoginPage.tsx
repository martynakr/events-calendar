import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Form/Input/Input";
import Form from "../../components/Form/Form";
import Button, { ButtonVariant } from "../../components/Button/Button";
import { LoginData, login } from "../../services/services";
import { useNavigate } from "react-router-dom";

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
