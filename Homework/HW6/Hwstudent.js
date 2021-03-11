let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());
 
// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);
 
let students = {
   list: [
       { "id": 5935512019, "name": "Siriluck","surname": "Raksawat","major": "COE" ,"GPA": 2.89 },
       { "id": 5935512052, "name": "Benjamas","surname": "Kaewsiri","major": "COE" ,"GPA": 2.00 }]
       
   }
 
router.route('/students')
   .get((req, res) => {
       res.json(students.list)})
 
   .post((req, res) => {
       console.log("Show student =",req.body)
       let id = (students.list.length)?students.list[students.list.length - 1].id + 1:1
       let name = req.body.name
       let surname = req.body.surname
       let major = req.body.major
       let GPA = req.body.GPA
       students = { list: [...students.list, { id, name, surname, major, GPA }] }
       console.log("student list =", students.list)
       res.json(students.list)
   })
 
router.route('/students/:student_id')
   .get((req, res) => {
       const student_id = req.params.student_id
       const id = students.list.findIndex(item => +item.id === +student_id)
       if(id < 0){
        console.log('Not Found!');
        res.status(404).send('Not Found!')
        }
        else{
        res.json(students.list[id]) 
        }
   })
   .put((req, res) => {   
    const student_id = req.params.student_id
    const id = students.list.findIndex(item => +item.id === +student_id)
    if(id < 0){
        console.log('Not Found!');
        res.status(404).send('Not Found!')
    }
    else{
        students.list[id].name = req.body.name
        students.list[id].surname = req.body.surname
        students.list[id].major = req.body.major
        students.list[id].GPA = req.body.GPA
        res.json(students.list[id])  
    }
    
})
.delete((req, res) => {
    const student_id = req.params.student_id
    const id = students.list = students.list.filter(item => +item.id !== +student_id)
    if(id < 0){
        console.log('Not Found!');
        res.status(404).send('Not Found!')
    }
    else{
       console.log('studentId: ',student_id)
       res.json(students.list)  
    }  
})
 
app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, () => console.log('server is running...'))

