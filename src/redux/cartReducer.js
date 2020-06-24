import axios from 'axios';
import { ADD_TO_CART, REMOVE_ITEM, SUBTRACT_QUANT, ADD_QUANT, CLOSE_CART, OPEN_CART } from './cartActions';

const initialState = {
    menu: [],
    addedItems: [],
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

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MENU_ITEMS + '_PENDING':
            return state
        case GET_MENU_ITEMS + '_FULFILLED':
            return { ...state, menu: action.payload.data }
        case GET_MENU_ITEMS + '_REJECTED':
            return initialState
        case CLOSE_CART:
            return { ...state, cartOpen: false }
        case OPEN_CART:
            return { ...state, cartOpen: true }
        case ADD_TO_CART:
            let newItem = { ...state.menu[action.payload - 1] }
            newItem.quantity = 1 
            //to check if the item already exists, use .find .findIndex or .indexOf method
            //if the item already exists in addedItems, increment quantity and return the item
            //if it doesn't not already exist, add to cart as above, inserting quantity property
            return { ...state, addedItems: [...state.addedItems, newItem], cartOpen: true }
        case REMOVE_ITEM:
            let newState = state.addedItems.filter(item => {
                if(item.item_id !== action.payload) {
                    return item    //newState then becomes an array with all of the items that DON'T match the payload
                }
            })
            return {...state, addedItems: newState}
        case ADD_QUANT:
            //map over state.addedItems; find item with matching id; reassign item.quantity ++
            let add = state.addedItems.map(item => {
                if (item.item_id === action.payload) {
                    item.quantity++
                }
                return item  //map has to have a return in order for add to be an array
            })
            return { ...state, addedItems: add }
        case SUBTRACT_QUANT:
            let subtract = state.addedItems.map(item => {
                if(item.item_id === action.payload) {
                    item.quantity--
                }
                return item
            })
            return {...state, addedItems: subtract}
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

