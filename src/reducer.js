export const initialListState = {
  productList: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const addPro = [...state.productList, action.payload];
      return {
        ...state,
        productList: addPro
      };
      break;
    case "DELETE_PRODUCT":
      const filDel = state.productList.filter(
        (data) => data.id !== action.payload
      );
      return {
        productList: filDel
      };
      break;
    case "EDIT_PRODUCT":
      console.log(action.payload);
      const newData = state.productList.map((data) => {
        if (data.id === action.payload.id) {
          return {
            ...data,
            productName: action.payload.productName,
            productPrice: action.payload.productPrice
          };
        }
        return data;
      });
      return {
        productList: newData
      };
      break;
    default:
      return state;
  }
};
