import React, { useReducer, useState } from "react";
import { initialListState, reducer } from "./reducer";

const initialState = {
  productName: "",
  productPrice: ""
};

export default function App() {
  const [productDetail, setProductDetail] = useState(initialState);

  const [state, dispatch] = useReducer(reducer, initialListState);

  const handleChange = (e) => {
    setProductDetail({
      ...productDetail,
      [e.target.name]: [e.target.value]
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const dataupload = {
      id: Math.floor(Math.random() * 1000),
      productName: productDetail.productName,
      productPrice: productDetail.productPrice
    };
    if (productDetail.isEdit) {
      dispatch({
        type: "EDIT_PRODUCT",
        payload: {
          id: productDetail.isEdit,
          productName: productDetail.productName,
          productPrice: productDetail.productPrice
        }
      });
      setProductDetail(initialState);
    } else {
      dispatch({ type: "ADD_PRODUCT", payload: dataupload });
      setProductDetail(initialState);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    }
  };

  const handleEdit = (id) => {
    const findData = state.productList.find((data) => data.id === id);
    setProductDetail({
      productName: findData.productName,
      productPrice: findData.productPrice,
      isEdit: id
    });
  };

  return (
    <>
      <p>{JSON.stringify(state)}</p>
      <form>
        <input
          type="text"
          placeholder="productName"
          name="productName"
          value={productDetail.productName}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="productPrice"
          name="productPrice"
          onChange={handleChange}
          value={productDetail.productPrice}
        />
        <button type="submit" onClick={handleAdd}>
          ADD
        </button>
      </form>
      {state.productList.map((data) => {
        return (
          <div key={data.id}>
            <h1>{data.productName}</h1>
            <h1>{data.productPrice}</h1>
            <button onClick={() => handleEdit(data.id)}>Edit</button>
            <button onClick={() => handleDelete(data.id)}>delete</button>
          </div>
        );
      })}
    </>
  );
}
