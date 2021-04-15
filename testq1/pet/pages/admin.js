import styles from '../styles/Pet.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
const URL = `http://localhost:3001/api/pets`
const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
   
   const [pet, setPet] = useState('')
   const [type, setType] = useState('')
   const [age, setAge] = useState(0)
   const [income, setIncome] = useState(0)
   const [weight, setWeight] = useState(0)
   const [price, setPrice] = useState(0)
 
   const { data } = useSWR(URL, fetcher)
//    if (!data) return <div>Loading...</div>
 
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
               <button className={styles.buttonget} onClick={() => getpet(pet.id)}>Get</button>
               <button className={styles.buttondelete}  onClick={() => deletepet(pet.id)}> Delete </button>
               <button className={styles.buttonupdate}  onClick={() => updatepet(pet.id)}>Update</button>
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

   const getIncome = async () => {
    const result = await axios.get(`http://localhost:3001/api/income`)
    setIncome(result.data)
}
 
   const addpet = async (type, age, weight, price) => {
       const result = await axios.post(URL, { type, age, weight, price})
       console.log(result.data)
       mutate(URL)
   }
 
   const deletepet = async (id) => {
       const result = await axios.delete(`${URL}/${id}`)
       console.log(result.data)
       mutate(URL)
   }
    const updatepet= async (id) => {
       const result = await axios.put(`${URL}/${id}`,{
        type, 
        age, 
        weight, 
        price
       })
       console.log('pet id update: ', result.data)
       mutate(URL)
   }
   useEffect(()=>{
    getIncome()
   },[])
   return (<div className={styles.container}>
       <h1> PET SHOP </h1>
       <h2> Income: {income} </h2>
       <div className={styles.formadd}>
        Price:<input type="number" onChange={(e) => setPrice(e.target.value)} />
        Weight:<input type="number" onChange={(e) => setWeight(e.target.value)} />
        Age:<input type="number" onChange={(e) => setAge(e.target.value)} />
        Type:<input type="text" onChange={(e) => setType(e.target.value)}/>
       <button className={styles.buttonadd} onClick={() => addpet(type,age,weight,price)}>Add new pet</button>
       </div>
       <div className={styles.list}>
       {printpets(data)}</div>
       selected pet: {pet.price} {pet.weight} {pet.age} {pet.type}
   </div>)
}
 
export default SWR1