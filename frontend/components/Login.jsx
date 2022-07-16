import styles from '../styles/Login.module.css'
import React from 'react'
import Router from 'next/router'
import axios from 'axios'



function handleSignup() {
    console.log('redirect to signup')
    Router.push('/signup')
}

function handleForgotPass() {
    console.log('redirect to forgot password')
    Router.push('/forgot')
}

function handleUpdatePass() {
    console.log('redirect to update password')
    Router.push('/update')
}


function Login() {

    const [res, setRes] = React.useState("")

    async function handleSubmit(event) {
        setRes("logging in...")

        event.preventDefault()
        const cred = {
            "username": event.target.elements[0].value,
            "password": event.target.elements[1].value
        }
        console.log(cred)
        const res = await axios.post('http://localhost:8000/login/', cred)
        console.log(res.data)
        setRes(res.data)
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>
                {/* <input className={styles.input} type="text" placeholder="username"></input> */}
                {/* <input className={styles.input} type="password" placeholder="password"></input> */}
                {
                    res != "login successful" ? 
                        (
                            <>
                                <input className={styles.input} type="text" placeholder="username"></input>
                                <input className={styles.input} type="password" placeholder="password"></input>
                                <p className={styles.hyper} onClick={handleForgotPass}>Forgot Password</p>
                                <button className={styles.button}>LOG IN</button>
                                <h3 className={styles.error}>{res}</h3> 
                            </>
                        )
                    : (
                        <>
                            <input disabled className={styles.input} type="text" placeholder="username"></input>
                            <input disabled className={styles.input} type="password" placeholder="password"></input>
                            <p className={styles.hyper} onClick={handleUpdatePass}>Update Password</p>
                            <button disabled className={styles.button}>LOG IN</button>
                            <h3 className={styles.noerror}>{res}</h3>
                        </>
                    )
                }
                <p className={styles.hyper} onClick={handleSignup}>Signup - create a new account</p>
            </form>
        </>
    )
}

export default Login