require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      cors = require('cors'),
      massive = require('massive'),
      app = express(),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authControl'),
      menuCtrl = require('./controllers/menuControl'),
      orderCtrl = require('./controllers/orderControl')

const path = require('path')

app.use(express.static(__dirname + '/../build'));

//Top-level Middleware
app.use(express.json())
app.use(cors())
app.use(session({
    resave: false, 
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7 * 4 * 6}, 
    secret: SESSION_SECRET
}))

//Endpoints
//authentication
app.post('/auth/register', authCtrl.register)           //Auth.js
app.post('/auth/login', authCtrl.login)                 //Auth.js
app.delete('/auth/logout', authCtrl.logout)             //Nav.js
app.get('/auth/user', authCtrl.getUser)                 //components after login
app.put('/auth/user/:userId', authCtrl.updateUser)      //Profile.js


//menus
app.get('/api/menus', menuCtrl.getMenus)                //Dash.js
app.get('/api/menu/:menuId', menuCtrl.getMenu)          //Menu.js
app.get('/api/menu', menuCtrl.getMenuItems)             //Nav.js >> cartReducer

//orders
app.get('/api/orders/:userId', orderCtrl.getOrders)     //Nav.js, Orders.js >> cartReducer
app.post('/api/orders', orderCtrl.createOrder)          //Cart.js     

//checkout                                              //Cart.js, Saved.js
app.post('/checkout', async(req,res) => {
    console.log(req.body.token.card)
    //pull the needed info off of the card object to store in db
    res.status(200).send({status: 'success'})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

//DB and Server connection
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB connected')
    app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))
})
.catch(err => console.log(err))