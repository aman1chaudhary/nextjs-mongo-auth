import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/router'
import { useUserContext } from '../contexts/UserContext';

const Login = () => {
    const router = useRouter()
    const { setLoginUser } = useUserContext();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const { email, password } = user;
        if (email && password) {
            axios
                .post("/api/login", {
                    email: user.email,
                    password: user.password,
                })
                .then((res) => {
                    alert(res.data.message);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    setLoginUser(res.data.user)
                    router.push('/');
                })
                .catch((err) => {
                    console.log(err);

                });
        } else {
            alert("Invalid input");
        }
    }


    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <div className="main-container">
                <div className="login">
                    <h1>Login</h1>
                    <form>
                        <input type="text" name="email" value={user.email} onChange={handleChange} required placeholder="Enter your Email"></input>
                        <input type="password" name="password" value={user.password} onChange={handleChange} required placeholder="Enter your Password" ></input>
                        <div className="button" onClick={login}>Login</div>

                    </form>
                    <div>or</div>
                    <Link href="/register"><div className="button">Register</div></Link>
                </div>
            </div>

        </div>
    )
}

export default Login