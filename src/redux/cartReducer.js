import axios from 'axios';
import { ADD_TO_CART, REMOVE_ITEM, SUBTRACT_QUANT, ADD_QUANT, CLOSE_CART, OPEN_CART } from './cartActions';
import { SAVE_ORDER, COMPLETE_ORDER, CLEAR_ADDED_ITEMS } from './orderActions';

const initialState = {
    menu: [],
    addedItems: [], //in_cart
    total: 0,
    saved_order: false, 
    completed_order: false,
    orders: [],
    cartOpen: false
}

const GET_MENU_ITEMS = 'GET_MENU_ITEMS'
const GET_ORDERS = 'GET_ORDERS'
const CLEAR_CART_STATE = 'CLEAR_CART_STATE'

export function getMenuItems() {
    const menuItems = axios.get('/api/menu')

    return {
        type: GET_MENU_ITEMS,
        payload: menuItems
    }
}

export function getOrders(userId) {
    const cartItems = axios.get(`/api/orders/${userId}`)

    return {
        type: GET_ORDERS,
        payload: cartItems
    }
}

export function clearCartState() {
    return {
        type: CLEAR_CART_STATE
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

        case GET_ORDERS + '_PENDING':
            return state
        case GET_ORDERS + '_FULFILLED':
            return { ...state, orders: action.payload.data }
        case GET_ORDERS + '_REJECTED':
            return initialState

        case CLOSE_CART:
            return { ...state, cartOpen: false }
        case OPEN_CART:
            return { ...state, cartOpen: true }

        case ADD_TO_CART:
            let addedItem = state.menu.find(item => item.item_id === action.payload)
            let existingItem = state.addedItems.find(item => action.payload === item.item_id)

            if (existingItem) {
                addedItem.quantity += 1
                addedItem.in_cart = true
                return { ...state, total: state.total + addedItem.item_price, cartOpen: true }
            }
            else {
                addedItem.quantity = 1
                addedItem.in_cart = true
                let newTotal = state.total + addedItem.item_price
                return { ...state, addedItems: [...state.addedItems, addedItem], total: newTotal, cartOpen: true }
            }

        case REMOVE_ITEM:
            let itemToRemove = state.addedItems.find(item => action.payload === item.item_id)
            let newItems = state.addedItems.filter(item => action.payload !== item.item_id)

            let removeTotal = state.total - (itemToRemove.item_price * itemToRemove.quantity)
            return { ...state, addedItems: newItems, total: removeTotal }

        case ADD_QUANT:
            let add = state.menu.find(item => item.item_id === action.payload)
            add.quantity += 1
            let addTotal = state.total + add.item_price
            return { ...state, total: addTotal }

        case SUBTRACT_QUANT:
            let subtract = state.menu.find(item => item.item_id === action.payload)

            if (subtract.quantity === 1) {
                let newItems = state.addedItems.filter(item => item.item_id !== action.payload)
                let subtractTotal = state.total - subtract.item_price
                return { ...state, addedItems: newItems, total: subtractTotal }
            }
            else {
                subtract.quantity -= 1
                let subtractTotal = state.total - subtract.item_price
                return { ...state, total: subtractTotal }
            }

        case SAVE_ORDER:
            return{...state, saved_order: true}

        case COMPLETE_ORDER:
            let completeItems = state.addedItems
            completeItems.forEach(item => {
                if(item.in_cart) {
                    item.in_cart = false
                } else if(!item.in_cart) {
                    item.in_cart = true
                }
            })
            return {...state, addedItems: completeItems, completed_order: true}

        case CLEAR_ADDED_ITEMS:
            return {...state, addedItems: [], total: 0, saved_order: false, completed_order: false}

        case CLEAR_CART_STATE:
            return initialState

        default:
            return state
    }
}



