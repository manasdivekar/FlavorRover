import React, { useEffect, useRef, useState } from "react";

import {useCart,useDispatchCart} from './ContextReducer'

export default function Card(props) {
  const data = useCart()
  const dispatch = useDispatchCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOption = Object.keys(options);

  const [qty,setQty]=useState(1);
  const [size,setSize] = useState("")

  const handleCart = async() =>{
    let food = []
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;

        break;
      }
    }

    if (  food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    await dispatch({type:"ADD",id:props.foodItems._id,name:props.foodItems.name, price: finalPrice , qty : qty , size: size });
    console.log(data)
  
  };

  const finalPrice = qty* parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div
        className="card mt-4"
        style={{ width: " 15rem", maxHeight: "450px" }}
      >
        <img
          src={props.foodItems.img}
          className="card-img-top"
          alt="..."
          style={{ height: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          {/* <p className="card-text">{props.description} </p> */}
          <div className="container w-100">
            <select className="m-2 h-100  bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">RS{finalPrice}/-</div>
          </div>
        </div>
        <hr />
        <button className="btn btn-success justify-center m-2" onClick={handleCart}>Add to Cart</button>
      </div>
    </div>
  );
}


