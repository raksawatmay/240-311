import { useState } from 'react'
import styles from '../styles/todo.module.css'
 
const Todo = ( {avatar_url, login}) => {
 
   const [tasks, setTasks] = useState([
       { id: 1, name: 'Write Program' },
       { id: 2, name: 'Do homework' }])
 
   const [name, setName] = useState('')
 
   const [idEdit, setIdEdit] = useState(0)
 
   const renderTasks = () => {
       if (tasks !== null)
           return tasks.map((task, index) => (
               <li key={index} className={styles.listItem}>
                   {index+1})
                   {(idEdit !== task.id) ?
                       task.name :
                       (<input
                           className={styles.text}
                           type="text"
                           name="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                       />)
                   }
                   <div className={styles.buttonContainer}>
                       <button
                           className={`${styles.button} ${styles.btnEdit}`}
                           onClick={() => editTask(task.id)}>
                           Edit
                       </button>
                       <button
                           className={`${styles.button} ${styles.btnDelete}`}
                           onClick={() => deleteTask(task.id)}>
                           Delete
                       </button>
                   </div>
               </li>))
   }
 
   const editTask = (id) => {
       setIdEdit(id)
       let t = tasks.find((task) => +task.id === +id)
       setName(t.name)
       if (+idEdit === +id) { //Press Edit again
           let newTasks = tasks.map((task, index) => {
               if (+task.id === +id)
                   tasks[index].name = name
               return task
           })
           setTasks(newTasks)
           setIdEdit(0)
       }
   }
 
   const deleteTask = (id) => {
       console.log('delete id: ', id)
       let newTasks = tasks.filter((task) => task.id !== +id)
       setTasks(newTasks)
   }
 
   const addTask = () => {
       console.log("Add!")
       const id = tasks[tasks.length - 1].id + 1;
        if(tasks.length<10 && name !== ''){  
           setTasks([...tasks, { id, name }])
           
       }
   }
 
   return (
       <div className={styles.container}>
            <h1 onClick={() => alert('click')}><img src={avatar_url} width="80" /> Todo  for <span>{login} </span></h1>
            <h1 className={styles.title}>Todo</h1>
 
           <div className="addContainer">
               <input
                   className={styles.text}
                   type="text"
                   name="addTask"
                   onChange={(e) => (setName(e.target.value))}
               />
               <button
                   className={`${styles.button} ${styles.btnAdd}`}
                   onClick={() => addTask(name)}>Add</button>
           </div>
           <ul className={styles.list}>
               {renderTasks()}
           </ul>
       </div>
   )
}

Todo.getInitialProps = async (ctx) => {
    const res = await fetch('https://api.github.com/users/mayraksawt')
    const json = await res.json()
    return { login: json.login, avatar_url: json.avatar_url }
}
 
export default Todo