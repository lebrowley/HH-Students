export const SAVE_ORDER = 'SAVE_ORDER',
            COMPLETE_ORDER = 'COMPLETE_ORDER', 
            CLEAR_ADDED_ITEMS = 'CLEAR_ADDED_ITEMS'

    
export function saveOrder() {
    //this action will handle toggling saved_order to true
    //it also needs to make a post to the db to save items that may still be in the cart AND saved as an order
    return {
    type: SAVE_ORDER
    }
}

export function completeOrder() {
    //this action will handle toggling the in_cart value to false on all items
    //and toggling the complete_order to true on all items
    return {
        type: COMPLETE_ORDER
    }
}

export function clearAdded() {
    //will clear the addedItems array on state (after an order has been completed)
    //and reset total to 0
    return {
        type: CLEAR_ADDED_ITEMS
    }
}