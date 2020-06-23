import axios from 'axios';
import {ADD_TO_CART, REMOVE_ITEM, SUBTRACT_QUANT, ADD_QUANT, CLOSE_CART, OPEN_CART} from './cartActions';

const initialState = {
    menu: [],
    addedItems: [],
    total: 0,
    cartOpen: false
}

const GET_MENU_ITEMS = 'GET_MENU_ITEMS'

export function getMenuItems() {
    const menuItems = axios.get('/api/menu')
    
    return {
        type: GET_MENU_ITEMS,
        payload: menuItems
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MENU_ITEMS + '_PENDING':
            return state
        case GET_MENU_ITEMS + '_FULFILLED':
            return {...state, menu: action.payload.data}
        case GET_MENU_ITEMS + '_REJECTED':
            return initialState
        case CLOSE_CART: 
            return {...state, cartOpen: false}
        case OPEN_CART:
            return {...state, cartOpen: true}
        case ADD_TO_CART:
            return {...state, addedItems: action.payload, cartOpen: true}  //.push to addedItems array? 
        default: 
            return state
    }
}




// export default function(state = initialState, action) {
//     if(action.type === ADD_TO_CART){
//         let addedItem = state.menu.find(menu => menu.id === action.id)

//         let existing_item = state.addedItems.find(menu => action.id === menu.id)
//         if(existing_item){
//             addedItem.quantity += 1
//             return {...state, total: state.total + addedItem.price}
//         }
//     }else {
//         addedItem.quantity = 1; 
//         let newTotal = state.total + addedItem.price
//         return {...state, addedItems: [...state.addedItems, addedItem], total: newTotal}
//     }

//     if(action.type === ADD_QUANT){
//         let addedItem = state.menu.find(menu => menu.id === action.id)
//         addedItem.quantity =+ 1
//         let newTotal = state.total + addedItem.price
//         return {...state, total: newTotal}
//     }

//     if(action.type === SUBTRACT_QUANT){
//         let addedItem = state.menu.find(menu => menu.id === action.id)
//         if(addedItem.quantity === 1){
//             let new_items = state.addedItems.filter(menu => menu.id !== action.id)
//             let newTotal = state.total - addedItem.price
//             return {...state, addedItems: new_items, total: newTotal}
//         }
//     }else {
//         addedItem.quantity -= 1
//         let newTotal = state.total - addedItem.price
//         return {...state, total: newTotal}
//     }

// }

