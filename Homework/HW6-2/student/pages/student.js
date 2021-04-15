import React, { useState } from 'react'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
const URL = `http://localhost/api/students`
const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
 
   const [student, setstudent] = useState('')
   const [name, setName] = useState('')
   const [surname, setSurname] = useState('')
   const [major, setMajor] = useState('')
   const [GPA, setGPA] = useState(0)
 
   const { data } = useSWR(URL, fetcher)
   if (!data) return <div>Loading...</div>
 
   const printstudents = (students) => {
       console.log('students:', students)
       if (students && students.length)
           return (students.map((student, index) =>
           (<li key={index}>
               Name: {(student) ? student.name : '-'}  SurName: {(student) ? student.surname : '-'} Major: {(student) ? student.major : '-'} GPA: {(student) ? student.GPA : 0}
               <button onClick={() => deletestudent(student.id)}> Delete </button>
               <button onClick={() => getstudent(student.id)}>Get</button>
               <button onClick={() => updatestudent(student.id)}>Update</button>
           </li>)
           ))
       else {
           return (<h2>No students</h2>)
       }
   }
 
   const getstudent = async (id) => {
       const result = await axios.get(`${URL}/${id}`)
       console.log('student id: ', result.data)
       setstudent(result.data)
   }
 
   const addstudent = async (name, surname, major, GPA) => {
       const result = await axios.post(URL, { name, surname, major, GPA })
       console.log(result.data)
       mutate(URL)
   }
 
   const deletestudent = async (id) => {
       const result = await axios.delete(`${URL}/${id}`)
       console.log(result.data)
       mutate(URL)
   }
    const updatestudent = async (id) => {
       const result = await axios.put(`${URL}/${id}`,{
           name,
           surname, 
           major,
           GPA
       })
       console.log('student id update: ', result.data)
       mutate(URL)
   }
 
   return (<div>
       <h1> student </h1>
       <ul>{printstudents(data.list)}</ul>
 
       selected student: {student.name} {student.surname} {student.major} {student.GPA}
       <h2>Add student</h2>
          Name:<input type="text" onChange={(e) => setName(e.target.value)} /><br/>
          SurName:<input type="text" onChange={(e) => setSurname(e.target.value)} /><br/>
          Major:<input type="text" onChange={(e) => setMajor(e.target.value)} /><br/>
          GPA:<input type="number" onChange={(e) => setGPA(e.target.value)}/> <br />
       <button onClick={() => addstudent(name, surname, major, GPA)}>Add new student</button>
 
   </div>)
}
 
export default SWR1