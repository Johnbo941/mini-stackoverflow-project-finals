"use client";
import { useAuthStore } from '@/store/Auth';
import React from 'react';

function LoginPage() {
    const {login} = useAuthStore()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {


        //collect data

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password")

        //validation

        if (!email || !password) {
            setError(() => "please fill all fields")
            return
        }


        //handle loading and error 
        setIsLoading(() => true)
        setError(() => "")


        //login => store

        const loginResponse = await login(email.toString(), password.toString())

        if (loginResponse.error) {
            setError(() => loginResponse.error!.message)
        }
        setIsLoading(() => true)


    }
    return (
        <div>LoginPage</div>
    )
}

export default LoginPage