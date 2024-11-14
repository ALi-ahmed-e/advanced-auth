import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import { FaLock, FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate()

    const SignupSchema = Yup.object().shape({
        Name: Yup.string()
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
            Name: '',
            email: '',
            password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });




    return (
        <form onSubmit={formik.handleSubmit} className=' text-white max-w-md p-5 pb-20 w-full  rounded-lg bg-glass bg-gray-800 bg-opacity-50 flex justify-center items-center flex-col'>
            <h1 className=' text-green-500 text-3xl font-semibold  mb-5'>Create Account</h1>



            <Input
                icon={FaUser}
                placeholder='Full Name'
                id="Name"
                name="Name"
                type="text"

                onChange={formik.handleChange}
                value={formik.values.Name}
                msg={formik.errors.Name}
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





            <button type="submit" className=' w-full p-3 mt-8 text-white bg-gradient-to-r from-emerald-600 to-emerald-400 hover:opacity-85 rounded-xl font-semibold'>Submit</button>


            <div className='mt-5 bg-gray-800/80 rounded-b-lg w-full p-5 absolute bottom-0 flex items-center justify-center'>
                Already have an account ? <h3  onClick={()=>navigate('/signin')} className=' self-start   hover:underline text-green-500 cursor-pointer ml-2'>  Sign in</h3>
            </div>

        </form>
    )
}

export default Signup