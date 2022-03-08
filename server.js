require('dotenv').config()

const express = require('express');

const Fruit = require('./models/fruits.js')

const app = express();

const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000

//MUST BE FIRST
app.use((req,res,next)=>{
    console.log('I run all da bloodclat routes')
    next()
})
//keep this near the top
app.use(express.urlencoded({extended:false}))




//set up view engine
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.get('/fruits/seed', (req, res)=>{
    Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ], (err, data)=>{
        res.redirect('/fruits');
    })
});

//from render to send back to render and removed later part
app.get('/fruits', (req,res) => {
    Fruit.find({}, (error,allFruits)=>{
   res.render('Index',{
       fruits: allFruits
       })
   }) //{fruits:fruits})
})

//a page that will allow us to create a new fruit 
app.get('/fruits/new', (req,res) =>{
    res.render('New')
})

//form POST
app.post('/fruits/', (req,res) =>{
    if(req.body.readyToEat === 'on'){//if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true //do data cotrection because it needs to either be true of false
    }
    else{
        //if it is not checked req.body.readyToEat
        req.body.readyToEat = false
    }
		Fruit.create(req.body,(error, createdFruit)=>{
		//res.send(createdFruit)
		res.redirect('/fruits')
		})
    //fruits.push(req.body)
    //console.log(fruits)
    //console.log(req.body)
    // res.send('data received cuh')
    //res.redirect('/fruits')//send the user back to /fruits
})

app.get('/fruits/:id', (req,res) =>{
	Fruit.findById(req.params.id, (err,foundFruit)=>{
		res.render('Show', {
		fruit: foundFruit
		})
	})
    //res.render('Show', {//second paramater must be an object
    //fruit: fruits[req.params.indexofFruitsArrray]})
    //There will be a variable avalible inside the ejs file called fruit, it vaule is fruits [req.params.indexOfFruitsArray]
})


//new
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
})

app.listen(PORT, () => {
    console.log('We in the building', PORT)
  })