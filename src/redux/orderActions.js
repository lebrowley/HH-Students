export const SAVE_ORDER = 'SAVE_ORDER',
            COMPLETE_ORDER = 'COMPLETE_ORDER', 
            //RE_ORDER = 'RE_ORDER',
            UN_SAVE = 'UN_SAVE',
            CLEAR_ADDED_ITEMS = 'CLEAR_ADDED_ITEMS'

    
export function saveOrder() {
    return {
    type: SAVE_ORDER
    }
}

export function completeOrder() {
    return {
        type: COMPLETE_ORDER
    }
}

// export function reOrder(id){
//     return{
//         type: RE_ORDER,
//         payload: id
//     }
// }

export function unSave(id) {
    return {
        type: UN_SAVE,
        payload: id
    }
}

export function clearAdded() {
    return {
        type: CLEAR_ADDED_ITEMS
    }
}