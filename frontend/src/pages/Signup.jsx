import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import { FaLock, FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSignUpUserMutation } from '../store/auth';
import { LuLoader2 } from 'react-icons/lu';

const Signup = () => {
    const navigate = useNavigate()
    const [signUpUser, { isLoading, data, error }] = useSignUpUserMutation()


    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Name is Too Short!')
            .max(50, 'Name is Too Long!')
            .required('Name is Required'),
        password: Yup.string()
            .min(4, 'password is too short!')
            .max(50, 'password is too long!')
            .required('password is Required'),
        email: Yup.string()
            .email('Invalid email')
            .required(' Email is Required'),
    });


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: values => handleSb(values),
    });

    const handleSb = async (data) => {
        try {
            await signUpUser(data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (data?.success) {
            navigate('/verfiy-email')
        }
    }, [data])




    return (
        <form onSubmit={formik.handleSubmit} className=' text-white max-w-md p-5 pb-20 w-full  rounded-lg bg-glass bg-gray-800 bg-opacity-50 flex justify-center items-center flex-col'>
            <h1 className=' text-green-500 text-3xl font-semibold  mb-5'>Create Account</h1>



            <Input
                icon={FaUser}
                placeholder='Full Name'
                id="name"
                name="name"
                type="text"

                onChange={formik.handleChange}
                value={formik.values.name}
                msg={formik.errors.name}
            />







            <Input
                icon={IoMail}
                placeholder='Email'
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                msg={formik.errors.email}
            />







            <Input
                icon={FaLock}
                placeholder='Password'
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                msg={formik.errors.password}
            />


            {error && <p className=" font-normal text-red-500">
                {error?.data?.message}                </p>}



            <button type="submit" disabled={isLoading} className=' flex items-center justify-center w-full p-3 text-white bg-gradient-to-r from-emerald-600 to-emerald-400 hover:opacity-85 rounded-xl font-semibold'>
                {isLoading ? <LuLoader2 className=' animate-spin text-4xl' /> : 'Submit'}
            </button>

            <div className='mt-5 bg-gray-800/80 rounded-b-lg w-full p-5 absolute bottom-0 flex items-center justify-center'>
                Already have an account ? <h3 onClick={() => navigate('/signin')} className=' self-start   hover:underline text-green-500 cursor-pointer ml-2'>  Sign in</h3>
            </div>

        </form>
    )
}

export default Signup