import styles from '../styles/Login.module.css'
import Router from 'next/router'
import React from 'react'
import axios from 'axios'

function Update() {

    const [res, setRes] = React.useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        const cred = {
            "username": event.target.elements[0].value,
            "old_password": event.target.elements[1].value,
            "new_password": event.target.elements[2].value
        }
        console.log(cred)
        setRes("updating password...")
        const res = await axios.post('http://localhost:8000/update/', cred)
        setRes(res.data)
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Update Password</h2>
                {
                    res == "password updated" ? (
                        <>
                            <input disabled className={styles.input} type="text" placeholder="enter username"></input>
                            <input disabled className={styles.input} type="password" placeholder="old password"></input>
                            <input disabled className={styles.input} type="password" placeholder="new password"></input>
                            <button disabled className={styles.button}>UPDATE</button>
                            <h3 className={styles.noerror}>{res}</h3>  
                        </>
                    )
                    : (
                        <>
                            <input className={styles.input} type="text" placeholder="enter username or email"></input>
                            <input className={styles.input} type="password" placeholder="old password"></input>
                            <input className={styles.input} type="password" placeholder="new password"></input>
                            <button className={styles.button}>UPDATE</button>
                            <h3 className={styles.error}>{res}</h3>
                        </>
                    )
                }
            </form>
        </>
    )
}

export default Update