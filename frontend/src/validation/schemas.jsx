import * as Yup from 'yup'

export const RegisterSchema = Yup.object({
    firstName : Yup.string().required("First Name is mandatory"),
    lastName : Yup.string().required("Last Name is mandatory"),
    email : Yup.string().required("Email is mandatory").email("Invalid Email"),
    password : Yup.string().required("Password is mandatory"),
    password_confirmation : Yup.string().required("Confirm Password is mandatory").oneOf([Yup.ref("password"), null], "Confirm Password does not match")
})

export const LoginSchema = Yup.object({
    email : Yup.string().required("Email is mandatory").email("Invalid Email"),
    password : Yup.string().required("Password is mandatory"),
})

export const ResetPasswordLinkSchema = Yup.object({
    email : Yup.string().required("Email is mandatory").email("Invalid Email"),
})

export const ResetPasswordConfirmSchema = Yup.object({
    password : Yup.string().required("Password is mandatory"),
    password_confirmation : Yup.string().required("Confirm Password is mandatory").oneOf([Yup.ref("password"), null], "Confirm Password does not match")
})

export const VerifyEmailSchema = Yup.object({
    email : Yup.string().required("Email is mandatory").email("Invalid Email"),
    otp : Yup.string().required("Otp is mandatory")
})