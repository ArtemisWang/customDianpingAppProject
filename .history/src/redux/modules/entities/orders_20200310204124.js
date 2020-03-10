import createReducer from "../../../utils/createReducer"

export const schema = {
  name: 'orders',
  id: 'id',
} 

export const USED_TYPE = 1; // 已消费
export const TO_PAY_TYPE = 2; //待付款
export const AVAILABLE_TYPE = 3; //可使用
export const REFUND_TYPE = 4; //退款

export const types = {
  //删除订单
  DELETE_ORDER: "ORDERS/DELETE_ORDER"
}

export const actions = {
  //删除订单
  deleteOrder: (orderId) => ({
    type: types.DELETE_ORDER,
    orderId
  })
}


const normalReducer = createReducer(schema.name)

const reducer = (state = {}, action) => {
  if(action.type === types.DELETE_ORDER) {
    const {[action.orderId]: deleteOrder, ...restOrders} = state;
    return restOrders;
  } else {
    return normalReducer(state, action)
  }
}

export default reducer;

// selectors
export const getOrderById = (state, id) => {
  return state.entities.orders[id]
}
