import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext  = createContext();
const CartDispatchContext = createContext();

const reducer = (state,action) => {
    switch (action.type) {
        case "ADD":
            return [...state, {id : action.id , name : action.name , price : action.price , qty:action.qty, size : action.size, img : action.img}]
            break;
            case "REMOVE":
                let newArr = [...state]
                newArr.splice(action.index, 1)
                return newArr;
            case "DROP":
                let empArray = []
                return empArray;
            case "UPDATE":
                let arr = [...state]
                arr.find((food, index) => {
                    if (food.id === action.id) {
                        console.log(food.qty, parseInt(action.qty), action.price + food.price)
                        arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                    }
                    return arr
                })
                return arr
    
        default:
            console.log("Error in Reducer")
            
    }
}

export const CartProvider =({children}) => {

    const[state,dispatch] = useReducer(reducer , [])

    return (
<CartDispatchContext.Provider value={dispatch}>
    <CartStateContext.Provider value={state}>
        {children}
    </CartStateContext.Provider>
</CartDispatchContext.Provider>
    )

}


// export the context to other pages

export const useCart = () => {
   return  useContext(CartStateContext);
}
export const useDispatchCart = () => {
    return useContext(CartDispatchContext);
}