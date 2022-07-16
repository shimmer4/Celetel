import styles from '../styles/Home.module.css'
import Login from '../components/Login'
import React from 'react'
import Router from 'next/router'


export default function Home() {

  React.useEffect(() => {
    Router.push('/login')
  }, [])

  return (
    <p>redirecting...</p>
  )
}
