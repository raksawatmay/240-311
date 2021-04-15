let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

app.use('/api', bodyParser.json(), router);   
app.use('/api', bodyParser.urlencoded({ extended: false }), router);
let books = {
    array: [
        { id: 1, title: 'Harry Potter', pages: 120, price: 200, amount: 20},
        { id: 2, title: 'Bitcoin 101', pages: 100, price: 120, amount: 35 }
    ]
}

router.route('/books')
   .get((req, res) => res.json(books.array))
 
   .post((req, res) => {
       console.log(req.body)
       let newbook = {}
       newbook.id = (books.array.length)?books.array[books.array.length - 1].id + 1:1
       newbook.title= req.body.title
       newbook.pages = req.body.pages
       newbook.price = req.body.price
       newbook.amount= req.body.amount
       books = { "array": [...books.array, newbook] }
       res.json(books.array)
   })

 
router.route('/books/:bookId')
   
   .get((req, res) => {
       const bookId = req.params.bookId
       const id = books.array.findIndex(item => +item.id === +bookId)
       res.json(books.array[id])
   })
   .put((req, res) => {
       const bookId = req.params.bookId
       const id = books.array.findIndex(item => +item.id === +bookId)
       books.array[id].title = req.body.title
       books.array[id].pages = req.body.pages
       books.array[id].price = req.body.price
       books.array[id].amount= req.body.amount
       res.json(books.array[id])
   })
 
   .delete((req, res) => {
       const bookId = req.params.bookId
       console.log('bookId: ',bookId)
       books.array = books.array.filter(item => +item.id !== +bookId)
       res.json(books.array)
   }) 

   let income = 0
   router.route('/income')
   .get((req,res) => {
    res.json(income)
   })
router.route('/purchase/:bookId')
    .get((req, res) => {
       const bookId = req.params.bookId
       const id = books.array.findIndex(item => +item.id === +bookId)
       if(id < 0){
        console.log(' error: "Book not found" ');
        res.status(404).send('error: "Book not found"')
       }
       else{
            res.json(books.array[id])
       }
      
    })
    .post((req,res) => {
        console.log(req.body)
        const bookId = req.params.bookId
        const id = books.array.findIndex(item => +item.id === +bookId)
        if(id < 0){
            console.log('error: "Book not found"');
            res.status(404).send('error: "Book not found"')
        }
        else if(!(id < 0) && req.body.amount === 0){
            console.log('error: "The book is out of stock"');
            res.status(404).send('error: "The book is out of stock"')
        }
        else if(!(id < 0) && req.body.amount > 0){ 
            const income = req.body.price
            res.json(income)  
            const bookId = req.params.bookId
            const id = books.array.findIndex(item => +item.id === +bookId)
            books.array[id].title = req.body.title
            books.array[id].pages = req.body.pages
            books.array[id].price = req.body.price
            books.array[id].amount= req.body.amount-1
            res.json(books.array[id])
        }
    })
 
app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(4001, () => console.log('server is running...'))