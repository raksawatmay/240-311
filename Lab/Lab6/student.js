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
   .get((req, res) => res.json(students))
 
   .post((req, res) => {
       console.log(req.body)
       let newstudent = {}
       newstudent.id = (students.list.length)?students.list[students.list.length - 1].id + 1:1
       newstudent.name = req.body.name
       newstudent.surname = req.body.surname
       newstudent.major = req.body.major
       newstudent.GPA = req.body.GPA
       students = { "list": [...students.list, newstudent] }
       res.json(students)
   })
 
router.route('/students/:student_id')
   .get((req, res) => {
       const student_id = req.params.student_id
       const id = students.list.findIndex(item => +item.id === +student_id)
       res.json(students.list[id])
   })
   .put((req, res) => {
       const student_id = req.params.student_id
       const id = students.list.findIndex(item => +item.id === +student_id)
       students.list[id].name = req.body.name
       students.list[id].surname = req.body.surname
       students.list[id].major = req.body.major
       students.list[id].GPA = req.body.GPA
       res.json(students.list[id])
   })
 
   .delete((req, res) => {
       const student_id = req.params.student_id
       console.log('studentId: ',student_id)
       students.list = students.list.filter(item => +item.id !== +student_id)
       res.json(students.list)
   })
 
app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(80, () => console.log('server is running...'))

