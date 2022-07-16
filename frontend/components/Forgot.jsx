import styles from '../styles/Login.module.css'
import Router from 'next/router'
import React from 'react'
import axios from 'axios'

function Forgot() {

    const [res, setRes] = React.useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        const cred = {
            "email": event.target.elements[0].value,
        }
        console.log(cred)
        setRes("sending mail...")
        const res = await axios.post('http://localhost:8000/forgot/', cred)
        console.log(res.data)
        setRes(res.data)
    }

    
    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Forgot Password</h2>
                {
                    res.startsWith("mail sent at :") ? (
                        <>
                            <input disabled className={styles.input} type="text" placeholder="enter email or username"></input>
                            <button disabled className={styles.button}>RECOVER</button>
                            <h3 className={styles.noerror}>{res}</h3>  
                        </>
                    )
                    : (
                        <>
                            <input className={styles.input} type="text" placeholder="enter email or username"></input>
                            <button className={styles.button}>RECOVER</button>
                            <h3 className={styles.error}>{res}</h3>
                        </>
                    )
                }
            </form>
        </>
    )
}

export default Forgot