import * as z from "zod";

const schema = z
    .object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Email must be a valid email address"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .regex(/[A-Z]+/, "Password must include a capital letter"),
        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Password confirm must match password",
        path: ["passwordConfirm"],
    });

export default schema;
