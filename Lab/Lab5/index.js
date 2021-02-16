const express = require('express')
const app = express()
const cors = require('cors');
const PORT = 8000
 
let tasks = [
    { id: 1, name: 'John', age: '3' },
        { id: 2, name: 'Maew', age: '2' }]
 
app.use(cors())
 
app.get('/', (req,res) => {
   res.json(tasks)
})
 
app.listen(PORT, () => console.log(`listen at ${PORT}`))