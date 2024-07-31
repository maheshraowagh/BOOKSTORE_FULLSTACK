import {z} from 'zod'

// Creating an object Schema
const signupSchema=  z.object({
     
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be of 3 character"})
    .max(20,{message:"Name must not more than 20 char"}),


    email:z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3, { message: "Email must be at least 3 chars." })
    .max(255, { message: "Email must not be more than 255 chars" }),

    password:z
    .string({required_error:"Password is required"})
    .trim()
    .min(6, { message: "Password must be at least 6 chars." })
    .max(30, { message: "Password must not be more than 30 chars" }),

    address:z
    .string({required_error:"Address is required"})
    .trim()
    .min(3,{message:"Address must be of 3 char"})
    .max(30,{message:"Address must not be more than 30 chars"})
})

// Login schema

const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 chars." })
        .max(255, { message: "Email must not be more than 255 chars" }),

    password: z.string({ required_error: "Password is required" })
        .trim()
        .min(7, { message: "Password must be at least 7 chars" })
        .max(25, { message: "Password must not be more than 25 chars" }),
});

export { signupSchema, loginSchema };
