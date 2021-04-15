let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

app.use('/api', bodyParser.json(), router);   
app.use('/api', bodyParser.urlencoded({ extended: false }), router);
let pets = {
    list: [
       { id: 1, type: 'cat', age: 1, weight: 5, price: 2000 },
       { id: 2, type: 'dog', age: 1, weight: 10, price: 3000 }
    ]
 }

router.route('/pets')
   .get((req, res) => res.json(pets.list))
 
   .post((req, res) => {
       console.log(req.body)
       let newpet = {}
       newpet.id = (pets.list.length)?pets.list[pets.list.length - 1].id + 1:1
       newpet.type= req.body.type
       newpet.age = req.body.age
       newpet.weight = req.body.weight
       newpet.price= req.body.price
       pets = { "list": [...pets.list, newpet] }
       res.json(pets.list)
   })

 
router.route('/pets/:petId')
   
   .get((req, res) => {
       const petId = req.params.petId
       const id = pets.list.findIndex(item => +item.id === +petId)
       res.json(pets.list[id])
   })
   .put((req, res) => {
       const petId = req.params.petId
       const id = pets.list.findIndex(item => +item.id === +petId)
       pets.list[id].type = req.body.type
       pets.list[id].age = req.body.age
       pets.list[id].weight = req.body.weight
       pets.list[id].price= req.body.price
       res.json(pets.list[id])
   })
 
   .delete((req, res) => {
       const petId = req.params.petId
       console.log('petId: ',petId)
       pets.list = pets.list.filter(item => +item.id !== +petId)
       res.json(pets.list)
   }) 

   let income = 25000
   router.route('/income')
   .get((req,res) => {
    res.json(income)
   })
router.route('/purchase/:petId')
    .get((req, res) => {
       const petId = req.params.petId
       const id = pets.list.findIndex(item => +item.id === +petId)
       if(id < 0){
        console.log('error: "Pet not found"');
        res.status(404).send('error: "Pet not found"')
       }
       else{
            res.json(pets.list[id])
       }
      
    })
    .post((req,res) => {
        console.log(req.body)
        const petId = req.params.petId
        const id = pets.list.findIndex(item => +item.id === +petId)
        if(id < 0){
            console.log('error: "Pet not found"');
            res.status(404).send('error: "Pet not found"')
        }
        else{
            const income = req.body.price
            res.json(income)  
            const petId = req.params.petId
            pets.list = pets.list.filter(item => +item.id !== +petId)
            res.json(pets.list)
        }
    })
 
app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(3001, () => console.log('server is running...'))