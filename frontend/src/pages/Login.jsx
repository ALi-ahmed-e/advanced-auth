import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import { FaLock, FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()

    const SigninSchema = Yup.object().shape({
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
            email: '',
            password: '',
        },
        validationSchema: SigninSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });




    return (
        <form onSubmit={formik.handleSubmit} className=' text-white max-w-md p-5 pb-20 w-full  rounded-lg bg-glass bg-gray-800 bg-opacity-50 flex justify-center items-center flex-col'>
            <h1 className=' text-green-500 text-3xl font-semibold  mb-5'>Sign In</h1>





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



            <h3  onClick={()=>navigate('/forgot-password')}  className=' self-start  mb-5 hover:underline text-white cursor-pointer'>Forgot password ?</h3>



            <button type="submit" className=' w-full p-3 text-white bg-gradient-to-r from-emerald-600 to-emerald-400 hover:opacity-85 rounded-xl font-semibold'>Submit</button>


            <div className='mt-5 bg-gray-800/80 rounded-b-lg w-full p-5 absolute bottom-0 flex items-center justify-center'>
                don't have an account ? <h3 onClick={()=>navigate('/signup')} className=' self-start   hover:underline text-green-500 cursor-pointer ml-2'>  Sign Up</h3>
            </div>

        </form>
    )
}

export default Login