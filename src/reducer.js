const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE_ITEM") {
    const newItem = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: newItem };
  }
  if (action.type === "INCREASE") {
    const increaseArr = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { ...state, cart: increaseArr };
  }
  if (action.type === "DECREASE") {
    const decreaseArr = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount - 1 };
      }
      return item
    }).filter((filterItem) => filterItem.amount !== 0)
    return { ...state, cart: decreaseArr };
  }
  if(action.type === "GET_TOTALS"){
    let {total,amount} = state.cart.reduce((cartTotal,cartItem)=> {
        const {price,amount} = cartItem
        cartTotal.total += price * amount
          cartTotal.amount += amount
        return cartTotal
    },{
        total: 0,
        amount : 0
    })
    total = parseFloat(total.toFixed(2));
         return {...state, total,amount}
  }
  if(action.type === "LOADING"){
    return {...state, loading : true}
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state,cart: action.payload, loading: false};
  }
  return state;
};

export default reducer;
