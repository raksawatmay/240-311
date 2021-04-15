import styles from '../styles/Index.module.css'
import React, { useState } from 'react'
import axios from 'axios'
import useSWR, {  } from 'swr'
const URL = `http://localhost:4001/api/books`
const fetcher = url => axios.get(url).then(res => res.data)
const index = () => {
 
   const [book, setBook] = useState('')
   const [title, setTitle] = useState('')
   const [pages, setPages] = useState(0)
   const [price, setPrice] = useState(0)
   const [amount, setAmount] = useState(0)
 
   const { data } = useSWR(URL, fetcher)
   if (!data) return <div>Loading...</div>
 
   const printbooks = (books) => {
       console.log('books:', books)
       if (books && books.length)
           return (books.map((book, index) =>
           <div className={styles.list}>
             <p key={index}>
              Title: {(book) ? book.title : '-'}  <br></br>
              Pages: {(book) ? book.pages : 0}  <br></br>
              Price: {(book) ? book.price : 0} <br></br>
              Aamount: {(book) ? book.amount : 0} <br></br><br></br>
               <button className={`${styles.buyButton} ${styles.hover}`} onClick={() => getbook(book.id)}>BUY</button>
           </p></div>
           ))
       else {
           return (<h2>No books</h2>)
       }
   }
 
   const getbook = async (id) => {
       const result = await axios.get(`${URL}/${id}`)
       console.log('book id: ', result.data)
       setBook(result.data)
   }
 
   return (<div>
       <h1> BOOKS SHOP </h1>
       <div className={styles.displayContainer}>
       {printbooks(data)}</div>
   </div>)
}
 
export default index