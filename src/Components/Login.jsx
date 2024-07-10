import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth.js';
import { login as authLogin } from '../Store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Login() {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { register, handleSubmit } = useForm();
    let [ error, setError ] = useState('');

    let login = async (data) => {
        setError('');
        try {
            let session = await authService.login(data);
            if (session) {
                let userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        }
        catch (e) {
            setError(e.message);
        }
    }

    return (
        <div
            className=' flex items-center justify-center w-full '
        >
            <div className=''>
                <div className=''>
                    <Logo width='100%' />
                </div>
            </div>
            <h2
                className='text-center text-2xl'
            >
                Sign In to your account
            </h2>
            <p>
                Don&apos;t have an acconut?&nbsp;
                <Link to='/signup'
                    className='text-primary hover:underline'
                >
                    Sign up
                </Link>
            </p>
            {error && <p className='text-red-600 text-center'>{error}
            </p>}
            <form onSubmit={handleSubmit(login)}
                className='mt-8'
            >
                <div className='space-y-5'>
                    <Input
                        label='Email'
                        placeholder='Enter your Email'
                        type='email'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) => /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) ||
                                    'Email addres must be a valid address',
                            }
                        })}
                    />
                    <Input
                        label='Password'
                        placeholder='Enter your Password'
                        type='password'
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <Button
                        type='submit'
                        className='w-full'
                    >
                        Sing In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login