module.exports = {
    getOrders: async (req, res) => {
        const dbInstance = req.app.get('db')
        const {userId} = req.params

        const orderId= await dbInstance.query(`select distinct order_id from order_info where user_id = ${userId}`)
     
        dbInstance.get_orders(userId)
        .then(orders => {
            const newOrders= orderId.map(orderId => {
                return orders.filter(element => element.order_id === orderId.order_id)
                
            })
            res.status(200).send(newOrders)
        })  
        .catch(err => res.status(500).send(err))
    

        

        //remember async keyword; 
        // const orders = await dbInstance.get_orders([userId])

        //do i need to do an array method of some kind to pull out the info needed from the array and put it into the object in the way I want it to be sent to the front??
        //what would be the appropriate array method? 
        // req.session.orders = {
        //     order_id: orders.order_id,  //this won't work because orders is an array
        //     item_id: orders.[0].item_id //and this won't work because there will be more than item returned from the db

        //     //item_id with the join statement now, item_id appears twice; will this be a problem? how to 'fix' this or is this happening because that is the foreign key these tables are joined on? 
        //     //item_name    
        //     //item_price 
        //     //item_description
        //     // quantity: Int,
        //     // total: Int,
        //     // saved_order: Bool,
        //     // in_cart: Bool,
        //     // completed_order: Bool
        // }

        // res.status(200).send(req.session.orders)

        // return res.status(200).send(orders)
        //try/catch block for error handling? 
    }, 

    createOrder: async (req, res) => {
        const dbInstance = req.app.get('db')
        const {user_id, addedItems, total, saved_order, completed_order} = req.body
        console.log(req.body)

        const order = await dbInstance.create_order([user_id, saved_order, completed_order, total])
        const order_id = order[0].order_id
        console.log(order_id)

        const addItems = addedItems.map(item => {
            return {order_id, item_id: item.item_id, quantity: item.quantity, in_cart: item.in_cart}
        })

        await dbInstance.order_items_join.insert(addItems)
      
        //try/catch block for error handling
        // .then(() => res.sendStatus(200))
        // .catch(err => res.status(500).send(err))
        res.sendStatus(200)
    }
}
