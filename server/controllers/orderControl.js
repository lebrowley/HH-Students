module.exports = {
    getOrders: (req, res) => {
        const dbInstance = req.app.get('db')
        const {userId} = req.params

        dbInstance.get_orders(userId)
        .then(orders => res.status(200).send(orders))  
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
        //addedItems is an array with everything about the specific items in it
        //extract all the item_ids, quantities, in_cart >> make a new table (order_items_join) to hold these; reference the order_id (serial on order_info)
        
        //to make multiple insertions into the order_items_table, create a function that would recursively call on the sql query file until it reaches the end of the array with all of the items; during this process, the order_id will have to be kept constant so that each item is identified with the right order
        const addItems = (addedItems, extracted=[], index=0, order_id) => {
            //filter through the arr (addedItems) and only return the item_id, quantity and in_cart for each item
            //push these modified objects to the extracted array until its length and addedItems length are equal
            //if they are equal move on to the next part

            //loop through the extracted array and set the item_id, quant and in_cart equal to variables
            //send these variables along with the order_id to dbInstance.create_order_items([order_id, item_id, quantity, in_cart])
            //when that is done, check to see if we're at the end of extracted array
            //if not, do the loop again and execute create_order_items again addItems()- this is where it is recursive? 
            //if it is (meets the base case) then end the function and continue on with createOrder by sending the OK status
        }


        //try/catch block for error handling
        // .then(() => res.sendStatus(200))
        // .catch(err => res.status(500).send(err))
        res.sendStatus(200)
    }, 

    updateCart: (req, res) => {},
    updateComplete: (req, res) => {},
    updateSaved: (req, res) => {}
}
