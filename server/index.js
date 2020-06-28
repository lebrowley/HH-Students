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
app.post('/auth/register', authCtrl.register)   //Auth.js
app.post('/auth/login', authCtrl.login)         //Auth.js
app.delete('/auth/logout', authCtrl.logout)     //Nav.js
app.get('/auth/user', authCtrl.getUser)         //components after login

//menus
app.get('/api/menus', menuCtrl.getMenus)        //Dash.js
app.get('/api/menu/:menuId', menuCtrl.getMenu)  //Menu.js
app.get('/api/menu', menuCtrl.getMenuItems)     //Nav.js >> cartReducer

//orders
app.get('/api/orders/:userId', orderCtrl.getOrders)  //fired with getMenuItems when Nav component mounts (thus a session should exist)
app.post('/api/orders', orderCtrl.createOrder)  //fired on payment completion

//all of these endpoints now handled in cartActions/cartReducer
// app.put('api/orders/:orderId', orderCtrl.updateCart) 
//change in_cart status between true or false; fired on logout, on payment completion
// app.put('api/orders/:orderId', orderCtrl.updateComplete) 
//change completed_order status between true or false; fired on payment completion
// app.put('api/orders/:orderId', orderCtrl.updateSaved) 
//change saved_order status between true or false; fired on save order button

//other possible edits or endpoints? 
//app.put('api/orders/:orderId', orderCtrl.updateQuantity) //change item quantity (and thus the total)
//and other ways of editing a saved order
//a management endpoint where orders that are not saved and not complete and not in cart are deleted? so the table isn't growing infinitely

//checkout
app.post('/checkout', async(req,res) => {
    // console.log(req.body.token.card)
    //pull the needed info off of the card object to store in db
    res.status(200).send({status: 'success'})
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