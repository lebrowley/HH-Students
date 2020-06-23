import axios from 'axios';

const initialState = {
    menu: [],
    addedItems: [],
    cartOpen: false
}

const GET_MENU_ITEMS = 'GET_MENU_ITEMS',
      ADD_TO_CART = 'ADD_TO_CART',
      REMOVE_ITEM = 'REMOVE_ITEM',
      SUBTRACT_QUANT = 'SUBTRACT_QUANT',
      ADD_QUANT = 'ADD_QUANT',
      CLOSE_CART = 'CLOSE_CART',
      OPEN_CART = 'OPEN_CART'

export function getMenuItems() {
    const menuItems = axios.get('/api/menu')
    return {
        type: GET_MENU_ITEMS,
        payload: menuItems
    }
}
    
export function addToCart(id) {
    console.log('adding to cart')
    return {
        type: ADD_TO_CART,
        payload: id
    }
}

export function removeItem(id) {
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
    console.log('closing cart')
    return {
        type: CLOSE_CART
    }
}

export function openCart() {
    console.log('opening cart')
    return {
        type: OPEN_CART
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_TO_CART:
            return {...state, addedItems: action.payload, cartOpen: true}  //.push to addedItems array? 
        case CLOSE_CART: 
            return {...state, cartOpen: false}
        case OPEN_CART:
            return {...state, cartOPen: true}
        default: 
            return state
    }
}

// export default function (state = initialState, action) {
//     switch (action.type) {
//         case LOGIN_USER:
//             return { ...state, user: action.payload, isLoggedIn: true }
//         case LOGOUT_USER:
//             return { ...state, ...action.payload }
//         case GET_USER + '_PENDING':
//             return state   
//         case GET_USER + '_FULFILLED':
//             return {...state, user: action.payload.data, isLoggedIn: true} 
//         case GET_USER + '_REJECTED':
//             return initialState
//         default:
//             return state
//     }
// }
