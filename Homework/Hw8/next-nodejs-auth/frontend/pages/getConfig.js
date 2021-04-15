import Layout from '../components/layout'
import Head from 'next/head'
import config from '../config/config'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'

const GetConfig = () => {
    return (<Layout>
        <Head>
            <title>Get Config</title>
        </Head>
        <div className={styles.container}>
            <Navbar />
            <h2> Get Configuration from ../config/config.js </h2>
            <b>Config: </b> {JSON.stringify(config)}
            <ul>
                <li>npm run dev  (for development mode)</li>
                <li>npm run build; npm run start  (for production mode)</li>
            </ul>
        </div>

    </Layout>)
}

export default GetConfig