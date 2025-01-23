"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import { RegisterSchema } from '@/validation/schemas.jsx'

const initialValues = {
    firstName :"",
    lastName : "",
    email:"",
    password:"",
    password_confirmation:""
}
const Register = () => {
   const {values, errors, handleChange, handleSubmit} =  useFormik({
        initialValues,
        validationSchema: RegisterSchema,
        onSubmit : async(values)=>{
            console.log(values);
        }
    });
    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold mb-6 text-center'> Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName"
                            className='block font-medium mb-2'>
                            First Name</label>
                        <input type="text"
                            name="firstName"
                            id="firstName" 
                            value={values.firstName}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus-ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                            placeholder="Enter your First Name" />
                        {errors.firstName && <div className="text-sm text-red-500 px-2">{errors.firstName}</div>}    
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName"
                            className='block font-medium mb-2'>
                            Last Name</label>
                        <input type="text"
                            name="lastName"
                            id="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus-ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                            placeholder="Enter your Last Name" />
                     {errors.lastName && <div className="text-sm text-red-500 px-2">{errors.lastName}</div>} 
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email"
                            className='block font-medium mb-2'>
                            Email</label>
                        <input type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus-ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                            placeholder="Enter your Email" />
                             {errors.email && <div className="text-sm text-red-500 px-2">{errors.email}</div>} 
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password"
                            className='block font-medium mb-2'>
                            Password</label>
                        <input type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus-ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                            placeholder="Enter your Password" /> {errors.password && <div className="text-sm text-red-500 px-2">{errors.password}</div>} 
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password-confirmation"
                            className='block font-medium mb-2'>
                            Confirm Password</label>
                        <input type="password"
                            name="password-confirmation"
                            id="password-confirmation"
                            value={values.password_confirmation}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus-ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                            placeholder="Confirm your Password " />
                             {errors.password_confirmation && <div className="text-sm text-red-500 px-2">{errors.password_confirmation}</div>} 
                    </div>
                    <button type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 disabled:bg-gray-400">
                        Register</button>
                </form>
                <p className="text-sm text-gray-600 p-1">
                    Already an User ?
                    <Link href="./login"
                        className="text-indigo-500 hover:text-indigo-600 transition duration-300 ease-in-out">
                        Login</Link></p>
            </div>

        </div>
    )
}

export default Register;