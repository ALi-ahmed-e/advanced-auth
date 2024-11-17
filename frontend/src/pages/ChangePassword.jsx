import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaLock } from "react-icons/fa";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '../components/Input';
import { useResetPasswordMutation } from '../store/auth';


const ChangePassword = () => {
    const { token } = useParams()
    const [ResetPassword, { data, error, isLoading }] = useResetPasswordMutation()
    const navigate = useNavigate()



    const PasswordSchema = Yup.object().shape({
        password: Yup.string()
            .min(4, 'password is too short!')
            .max(50, 'password is too long!')
            .required('password is Required'),
    });



    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: PasswordSchema,
        onSubmit: values => handleSb(values),
    });


    const handleSb = async (data) => {
        try {
            await ResetPassword({ password: data.password, token })

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (data?.success) {
            setTimeout(() => {
                navigate('/signin')
            }, 4000)
        }
    }, [data])

    return (

        <>
            {
                data?.success ? <div className='text-white text-center'>Password Changed Successfully</div> :
                    <form onSubmit={formik.handleSubmit} className=' text-white max-w-md p-5 pb-5 w-full  rounded-lg bg-glass bg-gray-800 bg-opacity-50 flex justify-center items-center flex-col'>
                        <h1 className=' text-green-500 text-3xl font-semibold  mb-5'>Enter the new password</h1>








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


                        {error && <p className=" font-normal mb-5 text-red-500">
                            {error?.data?.message}                </p>}



                        <button type="submit" className=' w-full p-3 text-white bg-gradient-to-r from-emerald-600 to-emerald-400 hover:opacity-85 rounded-xl font-semibold'>Submit</button>


                    </form>

            }
        </>

    )
}

export default ChangePassword