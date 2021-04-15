import styles from '../styles/Pet.module.css'
import React, { useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
const URL = `http://localhost:3001/api/pets`
const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
 
   const [pet, setPet] = useState('')
   const [type, setType] = useState('')
   const [age, setAge] = useState(0)
   const [weight, setWeight] = useState(0)
   const [price, setPrice] = useState(0)
 
   const { data } = useSWR(URL, fetcher)
   if (!data) return <div>Loading...</div>
 
   const printpets = (pets) => {
       console.log('pets:', pets)
       if (pets && pets.length)
           return (pets.map((pet, index) =>
           <div className={styles.listItem}>
             <p key={index}>
               Price: {(pet) ? pet.price : 0}  <br></br>
               Weight: {(pet) ? pet.weight : 0}  <br></br>
               Age: {(pet) ? pet.age : 0} <br></br>
               Type: {(pet) ? pet.type : '-'} <br></br><br></br>
               <button className={styles.buttonupdate} onClick={() => getpet(pet.id)}>BUY</button>
           </p></div>
           ))
       else {
           return (<h2>No pets</h2>)
       }
   }
 
   const getpet = async (id) => {
       const result = await axios.get(`${URL}/${id}`)
       console.log('pet id: ', result.data)
       setPet(result.data)
   }
 
   return (<div className={styles.container}>
       <h1> PET SHOP </h1>
       <div className={styles.list}>
       {printpets(data)}</div>
   </div>)
}
 
export default SWR1