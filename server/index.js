require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      cors = require('cors'),
      massive = require('massive'),
      app = express(),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authControl'),
      menuCtrl = require('./controllers/menuControl')

//Top-level Middleware
app.use(express.json())
app.use(cors())
app.use(session({
    resave: false, 
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7 * 6}, //6 months? 
    secret: SESSION_SECRET
}))

//Endpoints
//authentication
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

//menus
app.get('/api/menus', menuCtrl.getMenus)
app.get('/api/menu/:menuId', menuCtrl.getMenu)
app.get('/api/menu', menuCtrl.getMenuItems)

//orders

//checkout
app.post('/checkout', async(req,res) => {
    console.log(req.body.token.card)
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