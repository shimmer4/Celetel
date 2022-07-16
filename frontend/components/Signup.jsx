import styles from '../styles/Login.module.css'
import Router from 'next/router'
import React from 'react'
import axios from 'axios'



function handleLogin() {
    console.log('redirect to login')
    Router.push('/login')
}

function Signup() {

    const [res, setRes] = React.useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        const cred = {
            "email": event.target.elements[0].value,
            "username": event.target.elements[1].value,
            "password": event.target.elements[2].value,
            "confirm-password": event.target.elements[3].value
        }
        setRes("signing up...")
        console.log(cred)
        const res = await axios.post('http://localhost:8000/signup/', cred)
        console.log(res.data)
        setRes(res.data)
    }

    return (
        <>
            <div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2>Signup</h2>
                    
                    {
                        res == "signup successful" ? (
                            <>
                                <input disabled className={styles.input} type="text" placeholder="email"></input>
                                <input disabled className={styles.input} type="text" placeholder="username"></input>
                                <input disabled className={styles.input} type="password" placeholder="password"></input>
                                <input disabled className={styles.input} type="password" placeholder="confirm password"></input>
                                <button disabled className={styles.button}>SIGN UP</button>
                            </>
                        ) : (
                            <>
                                <input className={styles.input} type="text" placeholder="email"></input>
                                <input className={styles.input} type="text" placeholder="username"></input>
                                <input className={styles.input} type="password" placeholder="password"></input>
                                <input className={styles.input} type="password" placeholder="confirm password"></input>
                                <button className={styles.button}>SIGN UP</button>
                            </>
                        )
                    }
                    {
                        res == "signup successful" ? 
                            <h3 className={styles.noerror}>{res}<br/>please log in</h3>  
                        : <h3 className={styles.error}>{res}</h3>
                    }
                    <p className={styles.hyper} onClick={handleLogin}>Login - already have an account</p>
                </form>
            </div>
        </>
    )
}

export default Signup