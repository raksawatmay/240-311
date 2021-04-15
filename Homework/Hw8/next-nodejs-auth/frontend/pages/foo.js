import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const Foo1 = ({ token }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        fooUser()
    }, [])

    const fooUser = async () => {
        try {
            
            const users = await axios.get(`${config.URL}/foo`, {
                headers: { Authorization: `Bearer ${token}` }
            })
           
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
 
    return (
        <Layout>
            <Head>
                <title>User foo</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <h1>User foo</h1>
                <div>
                    <b>Token:</b> {token.substring(0, 15)}... <br /><br />
                    This route is protected by token, user is required to login first.
                    <br/>
                    Otherwise, it will be redirect to Login page
                    <br/><br/>
                    {JSON.stringify(user)}
                </div>
            </div>
        </Layout>
    )
}

export default withAuth(Foo1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
