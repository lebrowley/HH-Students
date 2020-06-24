export const ADD_TO_CART = 'ADD_TO_CART',
            REMOVE_ITEM = 'REMOVE_ITEM',
            SUBTRACT_QUANT = 'SUBTRACT_QUANT',
            ADD_QUANT = 'ADD_QUANT',
            CLOSE_CART = 'CLOSE_CART',
            OPEN_CART = 'OPEN_CART'

    
export function addToCart(id) {
    return {
        type: ADD_TO_CART,
        payload: id
    }
}

export function removeItem(id) {
    console.log('deleting from cart')
    // console.log('itemId:', id)
    return {
        type: REMOVE_ITEM,
        payload: id
    }
}

export function addQuant(id) {
    return {
        type: ADD_QUANT,
        payload: id
    }
}

export function subtractQuant(id) {
    return {
        type: SUBTRACT_QUANT,
        payload: id
    }
}

export function closeCart() {
    return {
        type: CLOSE_CART
    }
}

export function openCart() {
    return {
        type: OPEN_CART
    }
}