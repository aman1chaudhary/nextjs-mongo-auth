import Link from "next/link";
import React, { useState } from "react";
import axios from "axios"; // Make sure to import axios
import { useRouter } from 'next/router'
import Head from 'next/head'
const Register = () => {
    const router = useRouter()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const register = () => {
        const { name, email, password } = user;
        if (name && email && password) {
            axios
                .post("/api/register", {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                })
                .then((res) => {
                    alert(res.data.message);
                    router.push('/login');
                })
                .catch((err) => {
                    console.log(err);

                });
        } else {
            alert("Invalid input");
        }
    };

    return (
        <div>
            <Head>
                <title>Register</title>
            </Head>
            <div className="main-container">
                <div className="register">
                    <h1>Register</h1>
                    <form>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                            placeholder="Your Name"
                        />
                        <input
                            type="text"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            placeholder="Your Email"
                        />
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            placeholder="Your Password"
                        />
                        <div className="button" onClick={register}>Register</div>
                    </form>

                    <div>or</div>
                    <Link href="/login">
                        <div className="button">Login</div>
                    </Link>

                </div>
            </div>

        </div>

    );
};

export default Register;
