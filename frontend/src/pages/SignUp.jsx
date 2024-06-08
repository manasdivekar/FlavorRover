import React from 'react';
// import Delete from '@material-ui/icons/Delete'
import { BASE_URL } from '../url';
import { useCart , useDispatchCart } from '../components/ContextReducer'
import { Delete } from '@mui/icons-material';

const Cart = () => {

const data = useCart();
const dispatch = useDispatchCart();
if (data.length === 0){
    return(
        <div>
            <div className="m-5 w-100 text-center fs-2">Your cart  is Empty !!</div>
        </div>
    )
}

// handling the check out functionality

const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch(`${BASE_URL}/api/orderData`, {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

let totalPrice = data.reduce((total , food) => total + food.price , 0)

  return (
    <div>
        <div className="container m-auto m-4 table-responsive table-responsive-sm table-responsive-md table-responsive-lg">
            <table className='table table-hover'>
                <thead className="text-success fs-3">
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food,index) =>(
                        <tr>
                            <th scope='row'>{index+1}</th>
                            <td> {food.name} </td>
                            <td> {food.qty} </td>
                            <td> {food.size} </td>
                            <td> {food.price} </td>
                            <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div><h1>Total Price: {totalPrice}/-</h1></div>

            <div>
                <button className="btn bg-success m-4" onClick={handleCheckOut}>Check Out</button> 
            </div>

        </div>
    </div>
  )
}

export default Cart