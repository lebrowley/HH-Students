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
