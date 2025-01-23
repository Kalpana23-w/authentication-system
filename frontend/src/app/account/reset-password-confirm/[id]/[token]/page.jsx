"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { ResetPasswordConfirmSchema } from '@/validation/schemas.jsx'

const initialValues = {
    password:"",
    password_confirmation:""
}

const ResetPasswordConfirm = () =>{
    const {id, token} = useParams();
    const {values, errors, handleChange, handleSubmit} = useFormik ({
        initialValues,
        validationSchema : ResetPasswordConfirmSchema,
        onSubmit : async(values) =>{
            const data = {...values, id,token}
            console.log(data)
        }
    })
    return (
        <div className='flex items-center justify-center h-max bg-gray-100 pt-12'>
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-6 text-center'> Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="password"
                        className='block font-medium mb-2'>
                        New Password</label>
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
                        New Confirm Password</label>
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
                    Reset Password</button>
            </form>
        </div>

    </div>
    )
}

export default ResetPasswordConfirm;