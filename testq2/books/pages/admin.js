import styles from '../styles/Admin.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
const URL = `http://localhost:4001/api/books`
const fetcher = url => axios.get(url).then(res => res.data)
const admin = () => {
    const [book, setBook] = useState('')
    const [title, setTitle] = useState('')
    const [pages, setPages] = useState(0)
    const [price, setPrice] = useState(0)
    const [amount, setAmount] = useState(0)
    const [income, setIncome] = useState(0)
 
   const { data } = useSWR(URL, fetcher)
 
   const printbooks = (books) => {
       console.log('books:', books)
       if (books && books.length)
           return (books.map((book, index) =>
           <div className={styles.list}>
           <p key={index}>
              <span>Title: {(book) ? book.title : '-'}  <br></br>
               Pages: {(book) ? book.pages : 0}  <br></br>
               Price: {(book) ? book.price : 0} <br></br>
               Aamount: {(book) ? book.amount : 0} <br></br><br></br>
               <button className={`${styles.deleteButton} ${styles.hover}`}  onClick={() => deletebook(book.id)}>Delete </button>
               <button className={`${styles.updateButton} ${styles.hover}`}  onClick={() => updatebook(book.id)}>Update</button>
           </span></p></div>
           ))
       else {
           return (<h2>No books</h2>)
       }
   }
 
   const getpet = async (id) => {
       const result = await axios.get(`${URL}/${id}`)
       console.log('pet id: ', result.data)
       setPet(result.data)
   }

   const getIncome = async () => {
    const result = await axios.get(`http://localhost:4001/api/income`)
    setIncome(result.data)
}
 
   const addbook = async (title, pages, price, amount) => {
       const result = await axios.post(URL, { title, pages, price, amount})
       console.log(result.data)
       mutate(URL)
   }
 
   const deletebook = async (id) => {
       const result = await axios.delete(`${URL}/${id}`)
       console.log(result.data)
       mutate(URL)
   }
    const updatebook= async (id) => {
       const result = await axios.put(`${URL}/${id}`,{
        title, 
        pages, 
        price, 
        amount
       })
       console.log('pet id update: ', result.data)
       mutate(URL)
   }
   useEffect(()=>{
    getIncome()
   },[])
   return (<div className={styles.Container }>
       <h1> BOOKS </h1>
       <div className={styles.displayContainer }>
       {printbooks(data)}</div>
       <h1> ADD NEW BOOKS </h1>
       <div className={styles.inputDisplay}>
       <div className={styles.label}>
        <p>Title:</p><input type="text" onChange={(e) => setTitle(e.target.value)} /> <br></br>
        <p>Pages:</p><input type="number" onChange={(e) => setPages(e.target.value)} /> <br></br>
        <p>Price:</p><input type="number" onChange={(e) => setPrice(e.target.value)} /> <br></br>
        <p>Aamount:</p><input type="number" onChange={(e) => setAmount(e.target.value)}/> <br></br>
       <button className={`${styles.addButton} ${styles.hover}`} onClick={() => addbook(title,pages,price,amount)}>ADD NEW BOOK</button>
       </div>
       </div>
       
       <h2> Income: {income} </h2>

      
   </div>)
}
 
export default admin