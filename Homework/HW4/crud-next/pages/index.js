import { useState } from 'react'
import styles from '../styles/CRUD.module.css'
 
const index = ( {avatar_url, login}) => {
    const [cats, setCats] = useState([
        { id: 1, name: 'John', age: '3' },
        { id: 2, name: 'Maew', age: '2' }
    ])
    
    const [age, setAge] = useState('')

    const [name, setName] = useState('')
 
    const [idEdit, setIdEdit] = useState(0)


    const renderCats = () => {
        if (cats !== null)
            return cats.map((cat, index) => (
                <li key={index} className={styles.listItem}>
                    {index+1}) Cat Name: &nbsp;
                    {(idEdit !== cat.id) ? 
                        cat.name :
                        (<input
                            className={styles.text}
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => (setName(e.target.value))}
                        />)
                    }
                    <br></br> &nbsp; &nbsp; Cat Age:  &nbsp;
                    {(idEdit !== cat.id) ?
                        cat.age : 
                        (<input
                            className={styles.text}
                            type="text"
                            name="age"
                            value={age}
                            onChange={(e) => (setAge(e.target.value))}
                        />)
                    }
                    <div className={styles.buttonContainer}>
                        <button
                            className={`${styles.button} ${styles.btnEdit}`}
                            onClick={() => editCat(cat.id)}>
                            Update
                        </button>
                        <button
                            className={`${styles.button} ${styles.btnDelete}`}
                            onClick={() => deleteCat(cat.id)}>
                            Delete
                        </button>
                    </div>
                </li>))
    }
    const editCat = (id) => {
        setIdEdit(id)
        let t = cats.find((cat) => +cat.id === +id)
        setName(t.name)
        setAge(t.age)
        if (+idEdit === +id) { //Press Edit again
            let newCats = cats.map((cat, index) => {
                if (+cat.id === +id){
                    cats[index].name = name
                    cats[index].age = age
                }
                return cat
            })
            setCats(newCats)
            setIdEdit(0)
        }
    }
  
    const deleteCat = (id) => {
        console.log('delete id: ', id)
        let newCats = cats.filter((cat) => cat.id !== +id)
        setCats(newCats)
    }
  
    const addCat = () => {
        console.log("Add!")
        const id = cats[cats.length - 1].id + 1;
         if(cats.length<10 && name !== ''){  
            setCats([...cats, { id, name, age }])
            
        }
    }
  
    return (
        <div className={styles.container}>
             <h1 className={styles.title}>CRUD Cats </h1>
             <h1 onClick={() => alert('click')}><img src={avatar_url} width="80" /> github name: <span>{login} </span> </h1>
             <br></br>
  
            <div className="addContainer">
                <input
                    className={styles.text}
                    placeholder="Enter cat name"
                    type="text"
                    name="addName"
                    onChange={(e) => (setName(e.target.value))}/>
                <br></br>
                <input
                    className={styles.text}
                    placeholder="Enter cat age"
                    type="text"
                    name="addAge"
                    onChange={(e) => (setAge(e.target.value))}/>
                <button
                    className={`${styles.button} ${styles.btnAdd}`}
                    onClick={() => addCat(name)}>Create</button>
            </div>
            <ul className={styles.list}>
                {renderCats()}
            </ul>
        </div>
    )
 }
 
 index.getInitialProps = async (ctx) => {
     const res = await fetch('https://api.github.com/users/mayraksawt')
     const json = await res.json()
     return { login: json.login, avatar_url: json.avatar_url }
 }
  
 export default index