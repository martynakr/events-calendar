import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/Form/Input/Input";
import Form from "../../components/Form/Form";
import Button, { ButtonVariant } from "../../components/Button/Button";
import { LoginData, login } from "../../services/auth.ts";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import calendarImage from "../../assets/calendar.png";

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
        <main className={styles.LoginPage}>
            <div
                className={`${styles.LoginPage_Section} ${styles.LoginPage_Calendar}`}
            >
                <h1>Events Calendar</h1>
                <p>Always be on top of your schedule</p>
                <img
                    src={calendarImage}
                    alt="calendar page"
                    className={styles.LoginPage_Calendar_Image}
                />
            </div>
            <div className={styles.LoginPage_Section}>
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
                            placeholder="password"
                        />
                        <Button variant={ButtonVariant.PRIMARY} type="submit">
                            Submit
                        </Button>
                    </Form>
                </FormProvider>
                <p>
                    Don't have an account? <a href="">Register</a>
                </p>
            </div>
        </main>
    );
};

export default LoginPage;
