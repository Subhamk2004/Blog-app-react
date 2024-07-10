import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'

import { login } from '../Store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { register, handleSubmit } = useForm()
    let [error, setError] = useState('')

    let create = async (data) => {
        setError('')
        try {
            let userData = await authService.createAccount(data)
            if (userData) {
                let userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full bg-gray-100 rounded-xl p-10 border border-black`}>
                <div>
                    <span>
                        <Logo width='100%' />
                    </span>
                </div>
                <h2
                    className='text-center text-2xl'
                >
                    Sign up to create account
                </h2>
                <p>
                    Already have an acconut?&nbsp;
                    <Link to='/login'
                        className='text-primary hover:underline'
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-danger'>{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label='Name'
                            placeholder='Enter your Name'
                            {...register('name', { required: true })}
                        />
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
                            Create account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup